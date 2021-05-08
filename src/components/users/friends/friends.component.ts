import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FriendDto, ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friend_list: Array<FriendDto> = [];
  @Input() profile = new ProfileDto();
  
  constructor(private service: AccountService,private notify:NotifierService) { 
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

}
