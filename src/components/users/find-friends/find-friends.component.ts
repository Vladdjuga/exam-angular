import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { InviteDto } from 'src/models/inviteDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {

  friends_string: string = '';
  friends = new FormControl('', [Validators.maxLength(50), Validators.minLength(0)]);
  friend_list: Array<FriendDto> = [];
  profile = new ProfileDto();

  constructor(private service: AccountService,private notify:NotifierService,private router:Router) { }

  ngOnInit() {
    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        this.profile = res.data[0];
      }
    })
  }
  changedText() {
    this.service.getStringFriends(localStorage.getItem('token') as string,this.friends_string).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        this.friend_list = res.data
      }
    })
  }
  follow(friend: string) {
    let invite = new InviteDto();
    invite.friend1 = new FriendDto();
    invite.friend1.username=this.profile.username;
    invite.friend2 =  new FriendDto();
    invite.friend2.username=friend;
    this.service.invite(invite).subscribe((res: ResultDto) => {
      if (res.isSuccess) {
        this.notify.notify('success',res.message);
      }
      else{
        this.notify.notify('error',res.message);
      }
    });
  }
  addChat(friend:string){
    this.service.addChat(localStorage.getItem('token') as string,friend).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        this.notify.notify('success',res.message);
        this.router.navigate(['chat']);
      }
    })
  }

}
