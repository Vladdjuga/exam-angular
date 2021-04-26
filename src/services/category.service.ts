import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { CategoryDto } from 'src/models/categoryDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http:HttpClient) { }

get():Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Category");
}
addCategory(category:CategoryDto):Observable<ResultDto>{
  return this.http.post<ResultDto>("https://localhost:44395/api/Category",category);
}
prepareToEdit(id:number):Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Category/prepare"+id);
}
editCategory(category:CategoryDto):Observable<ResultDto>{
  return this.http.put<ResultDto>("https://localhost:44395/api/Category",category);
}
}
