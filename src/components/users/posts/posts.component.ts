import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { PostDto } from 'src/models/postDto';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:Array<PostDto>=[];
  @Input() profile = new ProfileDto();

  constructor(private service: PostService, private notifier: NotifierService,public datepipe: DatePipe) { 
    service.onChanged.subscribe(()=>this.ngOnInit());
  }
  getCorrectDate(date:Date){
    return this.datepipe.transform(new Date(date),'hh:mm yyyy-MM-dd');
  }

  ngOnInit() {
    this.service.get(localStorage.getItem('token') as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.posts=res.data.reverse()
      }
    })
  }
  remove(id:number){
    this.service.remove(id).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        this.notifier.notify('success',res.message);
        this.service.onChanged.emit(true);
      }
    })
  }

}
