import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ResultDto } from 'src/models/apiResults/apiResultDto';
import { PostDto } from 'src/models/postDto';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPost = new PostDto();
  files_: any;
  file: File = new File([], '');
  formData: FormData = new FormData();

  constructor(private service: PostService, private notifier: NotifierService) { }

  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }
  photoChange(files: FileList) {
    this.files_ = files;
  }
  post() {
    if (this.files_ != null) {
      this.addPost.image = this.files_[0].name;
    }
    this.service.addPost(this.addPost, localStorage.getItem('token') as string).subscribe((res: ResultDto) => {
      if (res.isSuccess) {
        this.notifier.notify('success', "Posted!")
        if (this.files_ != null) {
          this.uploadPhoto(this.files_, res.message);
        }
        else{
          this.service.onChanged.emit(true);
        }
        this.addPost=new PostDto();
        this.files_=null;
      }
      else {
        this.notifier.notify('error', res.message)
      }
    });
  }
  uploadPhoto(files: FileList, id: string) {
    if (files.item && files.item(0)) {
      this.formData.append('file', files.item(0) as File);
      this.service.uploadPhoto(id, this.formData).subscribe((res: any) => {
        //console.log(res)
        if (res.isSuccess) {
          this.service.onChanged.emit(true);
        }
      })
    }
  }
  ngOnInit() {
  }

}
