import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/domain/usuario';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = environment.apiUrl + 'api/usuario/';
  }

  public findAll(): Observable<any>{
    return this.httpClient.get(this.url + 'findAll').pipe(
      catchError(e => {
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + id)
    .pipe(
      catchError(e => {
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  public save(usuario: Usuario): Observable<any> {
    return this.httpClient.post(this.url + 'save', usuario).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  public update(usuario: Usuario): Observable<any> {
    return this.httpClient.put(this.url + 'update', usuario).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + id).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);

      })
    );
  }
}
