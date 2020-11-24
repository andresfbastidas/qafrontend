import { Injectable } from '@angular/core';
import {Estado} from 'app/domain/estado'
@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  public listEstado: Estado[];

  constructor() {
    this.listEstado = [
      {id: 'Activo', name: 'Activo'},
      {id: 'Inactivo', name: 'Inactivo'},
    ];
  }

  public findAll(): Estado[]{
    return this.listEstado;
  }
}
