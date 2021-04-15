import { Component, OnInit } from '@angular/core';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { ProductDto } from 'src/models/productDto';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Array<ProductDto>=[]

  constructor(private service:ProductsService) { }

  ngOnInit() {
    this.service.get().subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        console.log(res);
        this.products=res.data;
      }
    })
  }

}
