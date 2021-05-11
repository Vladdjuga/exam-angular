import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileDto } from 'src/models/accountDtos';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {

  friend:string='';
  profile:ProfileDto=new ProfileDto();
  
  constructor(private service: AccountService,private notifier:NotifierService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.friend = this.route.snapshot.paramMap.get('friend') as string;
    this.service.getProfileUsername(this.friend).subscribe((res)=>{
      if(res.isSuccess){
        this.profile=res.data[0];
      }
    })
  }

}
