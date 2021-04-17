import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultCollectionDto } from 'src/models/apiResults/apiResultDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http:HttpClient) { }

get():Observable<ResultCollectionDto>{
  return this.http.get<ResultCollectionDto>("https://localhost:44395/api/Category");
}

}
