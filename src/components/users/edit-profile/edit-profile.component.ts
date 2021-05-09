import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RegisterDto } from 'src/models/accountDtos';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: RegisterDto = new RegisterDto();
  re_enter_pass = "";
  firstFormGroup: FormGroup = new FormGroup({}, [], []);
  secondFormGroup: FormGroup = new FormGroup({}, [], []);
  minDate: Date = new Date(1940, 1, 1, 0, 0, 0);
  maxDate: Date = new Date(2006, 1, 1, 0, 0, 0);
  formDoc: FormGroup = new FormGroup({}, [], []);
  files_: any;
  file: File = new File([], '');
  readonly maxSize = 104857600;
  formData: FormData = new FormData();
  path: string = '';
  id: string = '';
  constructor(private service: AccountService, private _formBuilder: FormBuilder, private notifier: NotifierService, private router: Router, private _fb: FormBuilder) { }


  ngOnInit() {
    
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(8)]);
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if ((event.value as Date).getTime() < this.minDate.getTime() || (event.value as Date).getTime() > this.maxDate.getTime()) {
      this.notifier.notify('error', "Date has not alright")
      console.log(type);
    }
  }
  getErrorMessage1() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
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


}
