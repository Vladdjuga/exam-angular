import { Component, OnInit } from '@angular/core';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories:Array<CategoryDto>=[]

  constructor(private service:CategoryService) { }

  ngOnInit() {
    this.service.get().subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        console.log(res);
        this.categories=res.data;
      }
    })
  }
}
