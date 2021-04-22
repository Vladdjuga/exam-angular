import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/models/accountDtos';
import { ResultDto, ResultLoginDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDto=new LoginDto();

  constructor(private service:AccountService) { }

  ngOnInit() {
  }
  signIn(){
    this.service.login(this.loginDto).subscribe((res:ResultLoginDto)=>{
      if(res.isSuccess){
        localStorage.setItem("token",res.token);
      }
    })
  }
}
