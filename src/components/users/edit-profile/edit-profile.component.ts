import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EditProfileDto, LoginDto, ProfileDto, RegisterDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto, ResultLoginDto } from 'src/models/apiResults/apiResultDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: RegisterDto = new RegisterDto();
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
  profile = new ProfileDto();
  res_profile = new EditProfileDto();

  constructor(private service: AccountService, private _formBuilder: FormBuilder, private notifier: NotifierService, private router: Router, private _fb: FormBuilder) { }

  target(event: Event): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  ngOnInit() {
    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        this.profile = res.data[0];
        //
        this.res_profile.username = this.profile.username;
        this.res_profile.image = this.profile.image;
        this.res_profile.email = this.profile.email;
        this.res_profile.alias = this.profile.alias;
        this.res_profile.birth = this.profile.birth;
        //console.log(this.res_profile);
      }
    })
  }
  photoChange(files: FileList) {
    this.files_ = files;
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
  alias = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(8)]);
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if ((event.value as Date).getTime() < this.minDate.getTime() || (event.value as Date).getTime() > this.maxDate.getTime()) {
      this.notifier.notify('error', "Date has not alright")
      //console.log(type);
    }
  }
  saveChanges() {
    if (this.files_ != undefined) {
      this.user.image = this.files_[0].name;
    }
    this.service.editProfile(this.res_profile, localStorage.getItem('token') as string).subscribe((res: ResultLoginDto) => {
      if (res.isSuccess) {
        this.notifier.notify('success', "Profile edited!")
        if (this.files_ != undefined) {
          this.uploadPhoto(this.files_, res.message);
        }
        else {
          this.router.navigate(['/profile']);
        }
        localStorage.setItem('token',res.token);
      }
      else {
        this.notifier.notify('error', res.message)
      }
    })
  }
  uploadPhoto(files: FileList, id: string) {
    if (files.item && files.item(0)) {
      this.formData.append('file', files.item(0) as File);
      this.service.uploadPhoto(id, this.formData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.router.navigate(['/profile']);
        }
        else {
          this.router.navigate(['/profile']);
        }
      })
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
