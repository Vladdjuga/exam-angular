import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  @Input() editCategory: CategoryDto;

  constructor(private service: CategoryService, private router: Router) {
    this.editCategory = new CategoryDto();
  }
  ngOnInit() {
  }
  onPrepareToEdit(id:number){
    //this.service.prepareToEdit(this.editProduct.id).subscribe((res: ResultCollectionDto) => {
    //  if (res.isSuccess) {
    //    console.log(res);
    //    this.nameCategory=this.editProduct.category.name;
    //  }
    //});
  }
  onAdd() {
    this.service.editCategory(this.editCategory).subscribe((res: ResultDto) => {
      if (res.isSuccess) {
        console.log(res);
      }
    });
  }
}
