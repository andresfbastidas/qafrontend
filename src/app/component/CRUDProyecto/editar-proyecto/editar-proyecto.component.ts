import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup,  Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'app/domain/estado';
import { AuthService } from 'app/service/auth.service';
import { Subject } from 'rxjs';
import { Proyecto } from 'app/domain/proyecto';
import { EstadoService } from 'app/service/estado.service';
import { ProyectoService } from 'app/service/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.scss']
})
export class EditarProyectoComponent implements OnInit {


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
    public activedRoute:ActivatedRoute,
  ) {
    this._unsubscribeAll = new Subject();
   }


  ngOnInit(): void {
    this.proyecto = new Proyecto(this.idProyecto,'','',this.fecha, '', );
    this.findAllEnable();
    this.findByIdProyecto();
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

  public update(): void {
    this.proyectoService.update(this.proyecto).subscribe(
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

  
  public findByIdProyecto():void{
    let params=this.activedRoute.params['_value'];
    let id = params.id;
    console.log(id);
    this.proyectoService.findById(id).subscribe(data=>{
      this.proyecto=data;
      console.table(this.proyecto);
    }, error=>{
         error.error.message;
    })
 }

  public findAllEnable(): void {
    this.listaEnable = this.estadoService.findAll();
  }

}
