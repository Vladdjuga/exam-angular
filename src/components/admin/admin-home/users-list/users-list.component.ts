import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

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
    this.service.getAllFriends().subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        this.friend_list = res.data
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
  ban(username:string){
    this.service.ban(username).subscribe((res: ResultDto) => {
      if (res.isSuccess) {
        this.notify.notify('success',res.message);
      }
    })
  }
}
