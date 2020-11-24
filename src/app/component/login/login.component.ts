import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'app/service/auth.service';
import { UsuarioService } from 'app/service/usuario.service';

import { Usuario } from 'app/domain/usuario';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  
  public email: string;
  public password: string;
  public tipoUsuarioAdmin: number;
  public user: Usuario;

  public contador = 0;

  public idTipoUsuario: number;

  public showMsg = false;
  public msg = '';

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      public router: Router,
    public authService: AuthService,
    public usuarioService: UsuarioService
  )
  {
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar   : {
                  hidden: true
              },
              toolbar  : {
                  hidden: true
              },
              footer   : {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              }
          }
      };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }


  public ingresar(): void {
    
    this.authService.loginWithEmailPassword(this.email, this.password)
      .then(() => {
        this.usuarioService.findById(this.email).subscribe(user => {
          
          console.log(localStorage);
          if (user.enable === 'Inactivo') {
            this.msg = 'El usuario está inactivo';
            this.showMsg = true;
            this.authService.signOut();
          } else {
            localStorage.setItem("email", this.email);
            this.idTipoUsuario = user.idTipoUsuario;
            this.routing();
          }
        }, error => {
          this.msg = error.error.message;
          this.showMsg = true;
        });
        
      })
      .catch(error => {
        this.showMsg = true;
        this.msg = error.message;
      });
  }

 
  public routing() {
    localStorage.setItem('idTipoUsuario', String(this.idTipoUsuario));
    if (this.idTipoUsuario === 1) {
      this.router.navigate(['/inicio']);

    } else if (this.idTipoUsuario === 2) {
      this.router.navigate(['/inicio']);
    } else if (this.idTipoUsuario === 3) {
      this.router.navigate(['/inicio']);
    }
  }

}
