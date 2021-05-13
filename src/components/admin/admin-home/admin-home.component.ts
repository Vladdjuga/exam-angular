import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  children='';
  constructor() { }

  ngOnInit() {
  }
  changeChildren(name:string){
    this.children=name;
  }
}
