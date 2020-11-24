import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'app/domain/estado';
import { Proyecto } from 'app/domain/proyecto';
import { EstadoService } from 'app/service/estado.service';
import { ProyectoService } from 'app/service/proyecto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss']
})
export class ListaProyectosComponent implements OnInit {

  public listaProyecto:Proyecto;
  public subFindAll:Subscription;
  public showMsg:boolean=false;
  public msg:string;
  constructor(public proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  public delete(id:string):void{
    this.proyectoService.delete(id).subscribe(data=>{
      this.showMsg=true;
      this.msg="El cliente se borró con exito"
      console.log("Next");
    }, error=>{
     this.showMsg=true;
     this.msg=error.error.message;
     console.log("Error");
    }, ()=>{
      this.findAll();
      console.log("Complete");
    });
  }

  ngOnDestroy(): void {
    console.log('ngOninit')
    this.subFindAll.unsubscribe;
  }

 
  public findAll():void {
    this.subFindAll=this.proyectoService.findAll().subscribe(data=>{
      this.listaProyecto=data;
    });      
}


}


