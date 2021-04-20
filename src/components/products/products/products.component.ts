import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';
import { ProductDto } from 'src/models/productDto';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;

  constructor(private service:ProductsService) {
    service.onChanged.subscribe((res)=>this.ngOnInit());
   }

  ngOnInit() {
    this.service.get().subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        console.log(res);
        this.products=res.data;
      }
    })
  }
  identify(index:number, item:any) {
    return item.id;
 }

}
