import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Archivo } from 'app/domain/archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.apiUrl + 'api/archivo/';
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id);
  }

  public save(archivo: Archivo): Observable<any> {
    return this.httpClient.post(this.url + 'save', archivo);
  }

  public update(archivo: Archivo): Observable<any> {
    return this.httpClient.put(this.url + 'update', archivo);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id);
  }

}
