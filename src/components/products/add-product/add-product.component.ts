import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalContainerComponent, ModalOptions } from 'angular-bootstrap-md';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';
import { ProductDto } from 'src/models/productDto';
import { CategoryService } from 'src/services/category.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  addProduct:ProductDto;
  categories:Array<CategoryDto>=[];
  nameCategory:string=''

  constructor(private service:ProductsService,private categoryService:CategoryService,private router:Router) {
    categoryService.get().subscribe((res:ResultCollectionDto)=>{
      this.categories=res.data
    })
    this.addProduct=new ProductDto();
    this.addProduct.category=new CategoryDto();
   }
   ngOnInit() {
  }
  onAdd(){
    this.addProduct.category=this.categories.find(el=>el.id==Number(this.nameCategory)) as CategoryDto;
    console.log(this.nameCategory);
    this.service.addProduct(this.addProduct).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        console.log(res);
        //this.notifier.notify('success', 'You are awesome! I mean it!');
      }
    });
  }
}
