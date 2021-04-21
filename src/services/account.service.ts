import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto,LoginDto } from 'src/models/accountDtos';
import { ResultDto } from 'src/models/apiResults/apiResultDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private http:HttpClient) { }

register(model:RegisterDto):Observable<ResultDto>{
  return this.http.post<ResultDto>('https://localhost:44395/api/Account/register',model);
}
login(model:LoginDto):Observable<ResultDto>{
  return this.http.post<ResultDto>('https://localhost:44395/api/Account/login',model);
}

}
