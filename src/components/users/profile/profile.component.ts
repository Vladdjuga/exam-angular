import { Component, OnInit } from '@angular/core';
import { ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:ProfileDto=new ProfileDto();

  constructor(private service:AccountService) { 

  }

  ngOnInit() {
    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.profile=res.data[0];
      }
    })
  }

}
