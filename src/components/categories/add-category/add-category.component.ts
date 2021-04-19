import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategory:CategoryDto;

  constructor(private service:CategoryService,private router:Router) {
    this.addCategory=new CategoryDto();
   }
   ngOnInit() {
  }
  onAdd(){
    this.service.addCategory(this.addCategory).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        console.log(res);
      }
    });
  }
}
