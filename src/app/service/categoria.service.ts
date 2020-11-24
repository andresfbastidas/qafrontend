import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from 'app/domain/categoria';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.apiUrl + 'api/categoria/';
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id);
  }

  public save(categoria: Categoria): Observable<any> {
    return this.httpClient.post(this.url + 'save', categoria);
  }

  public update(categoria: Categoria): Observable<any> {
    return this.httpClient.put(this.url + 'update', categoria);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id);
  }

}
