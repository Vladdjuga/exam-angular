import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { ProductDto } from 'src/models/productDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http:HttpClient) { }

get():Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Product");
}

}
