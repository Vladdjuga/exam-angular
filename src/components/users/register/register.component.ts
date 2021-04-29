import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterDto } from 'src/models/accountDtos';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NotifierService } from 'angular-notifier';
import * as Promise from 'bluebird';
import { AccountService } from 'src/services/account.service';
import { ResultDto, ResultLoginDto } from 'src/models/apiResults/apiResultDto';
import { Router } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: RegisterDto = new RegisterDto();
  isLinear = true;
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

  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.formDoc = this._fb.group({
      requiredfile: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ]
    });
    this.path = "Images\\";
  }
  photoChange(files: FileList) {
    this.files_ = files;
  }
  uploadPhoto(files: FileList, id: string) {
    if (files.item && files.item(0)) {
      this.formData.append('file', files.item(0) as File);
      this.service.uploadPhoto(id, this.formData).subscribe((res: any) => {
        if (res.isSuccessful) {
          this.ngOnInit();
        }
      })
    }
  }
  signIn() {
    if (this.user.password == this.re_enter_pass) {
      this.user.image=this.files_[0].name;
      this.service.register(this.user).subscribe((res: ResultLoginDto) => {
        if (res.isSuccess) {
          this.notifier.notify('success', "Successfully registered!")
          this.id = res.token
          this.router.navigate(['/login']);
          this.uploadPhoto(this.files_, this.id);
        }
      })
    }
    else {
      this.notifier.notify('error', "Passwords should match");
    }
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(8)]);
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
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if ((event.value as Date).getTime() < this.minDate.getTime() || (event.value as Date).getTime() > this.maxDate.getTime()) {
      this.notifier.notify('error', "Date has not alright")
      console.log(type);
    }
  }
}
