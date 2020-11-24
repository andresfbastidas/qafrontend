import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {TipoUsuario} from 'app/domain/tipo-usuario'
@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  public url: string;

  constructor(public httpClient:HttpClient) {
    this.url = environment.apiUrl + '/api/tipoUsuario/';
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id);
  }

  public save(tipoUsuario: TipoUsuario): Observable<any> {
    return this.httpClient.post(this.url + 'save', tipoUsuario);
  }

  public update(tipoUsuario: TipoUsuario): Observable<any> {
    return this.httpClient.put(this.url + 'update', tipoUsuario);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id);
  }
}
