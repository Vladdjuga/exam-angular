import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { PostDto } from 'src/models/postDto';
import { AccountService } from 'src/services/account.service';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Array<PostDto>=[];

  constructor(private service:PostService,private notify:NotifierService,public datepipe: DatePipe) { 
    // service.onChanged.subscribe((res)=>this.ngOnInit());
  }
  getCorrectDate(date:Date){
    return this.datepipe.transform(new Date(date),'hh:mm yyyy-MM-dd');
  }

  ngOnInit() {
      this.service.getNewest(localStorage.getItem("token") as string).subscribe((res)=>{
        console.log(res)
        if(res.isSuccess){
          this.posts=res.data;
        }
      })
  }

}
