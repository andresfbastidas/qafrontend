import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Categoria } from 'app/domain/categoria';
import { CategoriaService } from 'app/service/categoria.service';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit, OnDestroy {

  form: FormGroup;

  public categoria: Categoria;

  private _unsubscribeAll: Subject<any>;

  public idCategoria: number;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  constructor(
    public categoriaService: CategoriaService,
    private _formBuilder: FormBuilder,
  ) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.categoria = new Categoria(this.idCategoria,'');

    this.form = this._formBuilder.group({
      
      firstName : ['', Validators.required],
      tipoUsu  : ['', Validators.required],
      correo   : ['', Validators.required],
      contrasena  : ['', Validators.required],
      estado      : ['', Validators.required],
      fotoUrl      : ['', Validators.required],
  });
  }


  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }


  public save(): void {
    this.categoriaService.save(this.categoria).subscribe(
      categoria => {
        swal.fire('Nueva categoria ', ` Categoria ${categoria.nombreCategoria} creada con exito`, `success`);
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
