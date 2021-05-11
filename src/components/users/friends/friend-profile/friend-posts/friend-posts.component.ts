import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { PostDto } from 'src/models/postDto';
import { AccountService } from 'src/services/account.service';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-friend-posts',
  templateUrl: './friend-posts.component.html',
  styleUrls: ['./friend-posts.component.css']
})
export class FriendPostsComponent implements OnInit {

  posts:Array<PostDto>=[];
  profile = new ProfileDto();
  friend:string='';

  constructor(private service: PostService,private acc_serv: AccountService, private notifier: NotifierService,public datepipe: DatePipe,private router:Router,private route:ActivatedRoute) { 
    service.onChanged.subscribe(()=>this.ngOnInit());
  }
  getCorrectDate(date:Date){
    return this.datepipe.transform(new Date(date),'hh:mm yyyy-MM-dd');
  }

  ngOnInit() {
    this.friend = this.route.snapshot.paramMap.get('friend') as string;

    this.service.getUsername(this.friend).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.posts=res.data.reverse()
      }
    })
  }
}
