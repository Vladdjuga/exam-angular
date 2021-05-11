import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { PostDto } from 'src/models/postDto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  onChanged = new EventEmitter<boolean>();
  headers: HttpHeaders = new HttpHeaders();

  get(token:string):Observable<ResultCollectionDto>{
    return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Post/getuserposts/"+token);
  }
  getUsername(username:string):Observable<ResultCollectionDto>{
    return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Post/getfriendsposts/"+username);
  }
  getNewest(token:string):Observable<ResultCollectionDto>{
    return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Post/getnewestposts/"+token);
  }
  addPost(model: PostDto, token: string): Observable<ResultDto> {
    return this.http.post<ResultDto>('https://localhost:44395/api/Post/add-post/'+token, model);
  }
  uploadPhoto(id:string,file: FormData):Observable<ResultDto>{
    this.headers.append('Content-Type',"multipart/form-data");
    return this.http.post<ResultDto>('https://localhost:44395/api/Post/uploadPhoto/'+id,file,{headers:this.headers});
  }
}
