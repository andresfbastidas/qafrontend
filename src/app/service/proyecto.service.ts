import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from 'app/domain/proyecto';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.apiUrl + 'api/proyecto/';
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id);
  }

  public save(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post(this.url + 'save', proyecto);
  }

  public update(proyecto: Proyecto): Observable<any> {
    return this.httpClient.put(this.url + 'update', proyecto);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id);
  }
}
