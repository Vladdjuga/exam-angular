import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { InviteDto } from 'src/models/inviteDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:ProfileDto=new ProfileDto();
  invites:Array<FriendDto>=[];
  formDoc: FormGroup = new FormGroup({}, [], []);
  files_: any;
  id:string="";
  path:string="";
  formData: FormData = new FormData();

  constructor(private service:AccountService,private notify:NotifierService) { 
    const token = localStorage.getItem("token")
    if (token != null) {
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.id != null) {
        this.id=decodedJwtData.id;
      }
      this.path="Images\\";
    }
    service.onChanged.subscribe((res)=>this.ngOnInit());
  }
  uploadPhoto(files: FileList, id: string) {
    if (files.item && files.item(0)) {
      this.formData.append('file', files.item(0) as File);
      this.service.uploadPhoto(id, this.formData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.ngOnInit();
        }
      })
    }
  }
  
  changePic() {
      this.profile.image=this.files_[0].name;
        this.uploadPhoto(this.files_, this.id);
  }

  ngOnInit() {
    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.profile=res.data[0];
      }
    })
    this.service.getInvites(localStorage.getItem("token") as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.invites=res.data
      }
    })
  }
  photoChange(files: FileList) {
    this.files_ = files;
  }
  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }
  accept(friend:string){
    let invite = new InviteDto();
    invite.friend2 = new FriendDto();
    invite.friend2.username=this.profile.username;
    invite.friend1 = new FriendDto();
    invite.friend1.username=friend;
    this.service.accept(invite).subscribe((res:ResultDto)=>{
      if (res.isSuccess) {
        this.notify.notify('success',res.message);
        this.service.onChanged.emit(true);
      }
      else{
        this.notify.notify('error',res.message);
      }
    })
  }

}
