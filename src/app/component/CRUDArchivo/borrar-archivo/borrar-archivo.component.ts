import { Component, OnInit } from '@angular/core';
import { Archivo } from 'app/domain/archivo';
import { Proyecto } from 'app/domain/proyecto';
import { ArchivoService } from 'app/service/archivo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-borrar-archivo',
  templateUrl: './borrar-archivo.component.html',
  styleUrls: ['./borrar-archivo.component.scss']
})
export class BorrarArchivoComponent implements OnInit {

  public listaArchivo: Archivo[];
  public listaProyecto: Proyecto[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public archivoService: ArchivoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.archivoService.findAll().subscribe(
      data => { this.listaArchivo = data; }
    );
  }

  public delete(id: number): void {
    this.archivoService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        this.msg = 'El archivo se eliminó con éxito';
        console.log('Next');
      }, error => {
        this.showMsg = true;
        this.msg = error.error.message;
        console.log('Error');
      }, () => {
        this.findAll();
        console.log('Complete');
      }
    );
  }
}
