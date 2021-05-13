import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto,LoginDto, EditProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto,ResultLoginDto } from 'src/models/apiResults/apiResultDto';
import { InviteDto } from 'src/models/inviteDto';
import { MessageDto } from 'src/models/messageDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private http:HttpClient) { }

onChanged = new EventEmitter<boolean>();
headers:HttpHeaders=new HttpHeaders();

register(model:RegisterDto):Observable<ResultLoginDto>{
  return this.http.post<ResultLoginDto>('https://localhost:44395/api/Account/register',model);
}
editProfile(model:EditProfileDto,token:string):Observable<ResultLoginDto>{
  return this.http.post<ResultLoginDto>('https://localhost:44395/api/Account/edit/'+token,model);
}
login(model:LoginDto):Observable<ResultLoginDto>{
  return this.http.post<ResultLoginDto>('https://localhost:44395/api/Account/login',model);
}
getProfile(token:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Account/profile/'+token);
}
getProfileUsername(username:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Account/profile_username/'+username);
}
uploadPhoto(id:string,file: FormData):Observable<ResultDto>{
  this.headers.append('Content-Type',"multipart/form-data");
  return this.http.post<ResultDto>('https://localhost:44395/api/Account/uploadPhoto/'+id,file,{headers:this.headers});
}
getStringFriends(token:string,str:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Friend/find-friends/'+token+'&'+str);
}
invite(invite:InviteDto):Observable<ResultDto>{
  return this.http.post<ResultDto>('https://localhost:44395/api/Friend/invite',invite);
}
accept(invite:InviteDto):Observable<ResultDto>{
  return this.http.post<ResultDto>('https://localhost:44395/api/Friend/inviteaccept',invite);
}
getInvites(token:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Friend/getinvites/'+token);
}
getFriends(token:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Friend/friends/'+token);
}
getFriendsUsername(username:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Friend/friendsusername/'+username);
}
getAllFriends():Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Friend/all-friends/');
}
addChat(token:string,friend:string):Observable<ResultDto>{
  return this.http.get<ResultDto>('https://localhost:44395/api/Chat/add-chat/'+token+'&'+friend);
}
getChats(token:string):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>('https://localhost:44395/api/Chat/chats/'+token);
}
sendMessage(token:string,id:string,model:MessageDto):Observable<ResultDto>{
  return this.http.post<ResultDto>(`https://localhost:44395/api/Chat/add-message/${token}&${id}/`,model);
}
ban(username:string):Observable<ResultDto>{
  return this.http.get<ResultDto>(`https://localhost:44395/api/Admin/ban/${username}`);
}

isAdmin(){
  let token = localStorage.getItem('token') as string;
  const jwtData = token.split('.')[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  if(decodedJwtData.roles != "Admin"){
    return true;
  }
  else{
    return false;
  }
}
//friendsusername

}
