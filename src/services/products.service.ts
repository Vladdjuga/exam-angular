import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http:HttpClient) { }

get():any{
  return this.http.get("https://localhost:44395/api/Product").subscribe((res:any)=>{
    
  })
}

}
