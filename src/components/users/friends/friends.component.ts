import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friend_list: Array<FriendDto> = [];
  @Input() profile = new ProfileDto();
  
  constructor(private service: AccountService,private notifier:NotifierService,private router:Router) { 
    service.onChanged.subscribe((res)=>this.ngOnInit());
  }

  ngOnInit() {
    this.service.getFriends(localStorage.getItem('token') as string).subscribe((res: ResultCollectionDto) => {
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

}
