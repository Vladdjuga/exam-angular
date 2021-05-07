import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from 'src/adapters/chatAdapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./app.component.scss']
})
export class AppComponent {
  title = 'exam-angular';
  constructor(private spinner: NgxSpinnerService) {}
  public adapter: ChatAdapter = new DemoAdapter();
  userId = 999;
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
