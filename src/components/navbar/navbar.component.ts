import { Component, OnInit } from '@angular/core';
import { IsLoggedGuard } from 'src/guards/islogged.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activate:IsLoggedGuard=new IsLoggedGuard()

  constructor() { }

  ngOnInit() {
  }

}
