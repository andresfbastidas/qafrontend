import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'app/domain/tipo-usuario';
import { Usuario } from 'app/domain/usuario';
import { UsuarioService } from 'app/service/usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.scss']
})
export class EliminarUsuarioComponent implements OnInit {

  public listaUser: Usuario[];
  public listaUserType: TipoUsuario[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public userService: UsuarioService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.userService.findAll().subscribe(
      data => { this.listaUser = data; }
    );
  }

  public delete(id: string): void {
    this.userService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        this.msg = 'El usuario se eliminó con éxito';
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
