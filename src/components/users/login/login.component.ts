import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private service:AccountService,private router:Router) { }

  username = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(8)]);
  
  ngOnInit() {
    
  }  
  getErrorMessage2() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('username') ? 'Not a valid username' : '';
  }
  getErrorMessage3() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  signIn(){
    this.service.login(this.loginDto).subscribe((res:ResultLoginDto)=>{
      if(res.isSuccess){
        localStorage.setItem("token",res.token);
        this.router.navigate(["/profile"]);
      }
    })
  }
}
