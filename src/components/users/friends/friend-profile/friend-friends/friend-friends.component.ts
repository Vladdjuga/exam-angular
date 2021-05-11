import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-friend-friends',
  templateUrl: './friend-friends.component.html',
  styleUrls: ['./friend-friends.component.css']
})
export class FriendFriendsComponent implements OnInit {

  friend_list: Array<FriendDto> = [];
  mine_profile = new ProfileDto();
  friend:string='';

  constructor(private service: AccountService,private notifier:NotifierService,private router:Router,private route:ActivatedRoute) { 
    service.onChanged.subscribe((res)=>this.ngOnInit());
  }

  ngOnInit() {
    this.friend = this.route.snapshot.paramMap.get('friend') as string;

    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.mine_profile=res.data[0];
      }
    })

    this.service.getFriendsUsername(this.friend).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        //this.service.onChanged.emit(true);
        this.friend_list = res.data
      }
    })
  }
  addChat(friend:string){
    this.service.addChat(localStorage.getItem('token') as string,friend).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        this.notifier.notify('success',res.message);
        this.router.navigate(['chat']);
      }
    })
  }
  redirectProfileFriend(friend:string){
    this.router.navigate(["friend-profile/"+friend])
  }

}
