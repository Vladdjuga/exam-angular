import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';
import { ProductDto } from 'src/models/productDto';
import { CategoryService } from 'src/services/category.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() editProduct: ProductDto;
  @Input() category: CategoryDto;
  categories: Array<CategoryDto> = [];
  nameCategory: string = ''

  constructor(private service: ProductsService, private categoryService: CategoryService, private router: Router,private notifierService:NotifierService) {
    categoryService.get().subscribe((res: ResultCollectionDto) => {
      this.categories = res.data
    })
    this.editProduct = new ProductDto();
    this.category = new CategoryDto();
  }
  ngOnInit() {
  }
  onPrepareToEdit(id:number){
    this.service.prepareToEdit(this.editProduct.id).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        console.log(res);
        this.category=this.editProduct.category;
      }
    });
  }
  onAdd() {
    this.editProduct.category = this.categories.find(el => el.id == Number(this.nameCategory)) as CategoryDto;
    console.log(this.nameCategory);
    this.service.editProduct(this.editProduct).subscribe((res: ResultDto) => {
      if (res.isSuccess) {
        console.log(res);
        this.notifierService.notify('success', 'Game updated!');
      }
    });
  }
}
