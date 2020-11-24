import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Usuario } from 'app/domain/usuario';
import { TipoUsuario } from 'app/domain/tipo-usuario';
import { Estado } from 'app/domain/estado';
import { UsuarioService } from 'app/service/usuario.service';
import { EstadoService } from 'app/service/estado.service';
import { TipoUsuarioService } from 'app/service/tipo-usuario.service';
import { AuthService } from 'app/service/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {

  form: FormGroup;
  
  public email: string;
  public password: string;
  public name: string;
  public user: Usuario;
  public idTipoUsuario: number =0;
  public listaEnable: Estado[];
  public listaUserType: TipoUsuario[];

  public showMsg: boolean = false;
  public msg: string;

  private _unsubscribeAll: Subject<any>;

  
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  constructor(
    public userService: UsuarioService,
    public enableService: EstadoService,
    public userTypeService: TipoUsuarioService,
    public router: Router,
    public authService: AuthService,
    private _formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth

  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.user = new Usuario(this.email,'','',this.idTipoUsuario,this.password, '');
    this.findAllEnable();
    this.findAllUserType();

    this.form = this._formBuilder.group({
      
      firstName : ['', Validators.required],
      tipoUsu  : ['', Validators.required],
      correo   : ['', Validators.required],
      contrasena  : ['', Validators.required],
      estado      : ['', Validators.required],
      //fotoUrl      : ['', Validators.required],
  });
    
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }


  public save(): void {
    this.authService.createUser(this.email, this.password, this.name)
   
    .then(() => {
      this.userService.save(this.user).subscribe(
        data => {
          console.log(this.angularFireAuth.currentUser);
          localStorage.setItem("email", this.email);
          this.showMsg = true;
          this.msg = 'El usuario se creo con exito';
          console.log('Next');
        }, error => {
          this.showMsg = true;
          this.msg = error.error.message;
          console.log('Error');
        }, () => {
          console.log('Complete');
        }
      );
    })
    .then(() => {
      this.router.navigate(['/inicio']);
    })
    .catch(error => {
      this.msg = error.message;
      this.showMsg = true;
    });
   
  }

  public findAllEnable(): void {
    this.listaEnable = this.enableService.findAll();
  }

  public findAllUserType(): void {
    this.userTypeService.findAll().subscribe(
      data => this.listaUserType = data
    );
  }



}
