import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup,  Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Estado } from 'app/domain/estado';
import { AuthService } from 'app/service/auth.service';
import { Subject } from 'rxjs';
import { Proyecto } from 'app/domain/proyecto';
import { EstadoService } from 'app/service/estado.service';
import { ProyectoService } from 'app/service/proyecto.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  public  fecha : Date = new Date();
  public proyecto : Proyecto;
  public listaEnable: Estado[];
  public idProyecto: number;

  private _unsubscribeAll: Subject<any>;



   /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  constructor(
    public router: Router,
    public authService: AuthService,
    private _formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public estadoService: EstadoService,
    public proyectoService: ProyectoService,
  ) {
    this._unsubscribeAll = new Subject();
   }


  ngOnInit(): void {
    this.proyecto = new Proyecto(this.idProyecto,'','',this.fecha, '');
    this.findAllEnable();

    this.form = this._formBuilder.group({
      
      descripcion : ['', Validators.required],
      estado  : ['', Validators.required],
      nombreProyecto  : ['', Validators.required],
  });
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  public save(): void {
    this.proyectoService.save(this.proyecto).subscribe(
      data => {
        this.router.navigate(['/inicio']);
       
        console.log('Next');
      }, error => {
        error.error.message;
        console.log('Error');
      }, () => {
        console.log('Complete');
      }
    );
   
  }

  public findAllEnable(): void {
    this.listaEnable = this.estadoService.findAll();
  }

}
