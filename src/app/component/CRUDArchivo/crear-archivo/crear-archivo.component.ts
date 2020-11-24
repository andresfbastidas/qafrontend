import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'app/domain/proyecto';
import { ProyectoService } from 'app/service/proyecto.service';
import { Subject } from 'rxjs';
import { AuthService } from 'app/service/auth.service';
import { ArchivoService } from 'app/service/archivo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Archivo } from 'app/domain/archivo';
import { Router } from '@angular/router';
import { FireStorageService } from 'app/service/fire-storage.service';
import { isEmpty } from 'lodash';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-crear-archivo',
  templateUrl: './crear-archivo.component.html',
  styleUrls: ['./crear-archivo.component.scss']
})
export class CrearArchivoComponent implements OnInit,  OnDestroy {

  form: FormGroup;

  public listaProyecto: Proyecto[];
  public archivoDomain: Archivo;
  public idArchivo: number;
  public idProyecto: number;

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private proyectoService: ProyectoService, private archivoService: ArchivoService,
    private authService: AuthService, private _formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public router: Router, private firebaseStorage: FireStorageService
  ) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.archivoDomain = new Archivo(this.idArchivo,'',this.URLPublica,this.idProyecto);
    console.log(this.URLPublica)
    this.findAllProyecto();
    console.log(this.URLPublica);
    this.form = this._formBuilder.group({
      
      nombreArchivo : ['', Validators.required],
      urlArchivo  : ['', Validators.required],
      idProyecto   : ['', Validators.required],
      archivo   : ['', Validators.required],
   
  });
  }

 

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  public findAllProyecto(): void {
    this.proyectoService.findAll().subscribe(
      data => this.listaProyecto = data
    );
  }

   //Evento que se gatilla cuando el input de tipo archivo cambia
   public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;  
      this.archivoDomain.urlArchivo = this.URLPublica;
      this.archivoDomain.nombreArchivo = this.nombreArchivo
    });
    
    
  }

  public save(): void {
    this.archivoDomain.urlArchivo = this.URLPublica;
    this.archivoDomain.nombreArchivo = this.nombreArchivo
      this.archivoService.save(this.archivoDomain).subscribe(

        data => {
          console.log('Next');
        }, error => {
          error.error.message;
          console.log('Error');
        }, () => {
          console.log('Complete');
        }
      );
    
    
   
  }
 
}


   

  
