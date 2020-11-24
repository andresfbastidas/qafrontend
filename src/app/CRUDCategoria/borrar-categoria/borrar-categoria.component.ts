import { Component, OnInit } from '@angular/core';
import { Categoria } from 'app/domain/categoria';
import { CategoriaService } from 'app/service/categoria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-borrar-categoria',
  templateUrl: './borrar-categoria.component.html',
  styleUrls: ['./borrar-categoria.component.scss']
})
export class BorrarCategoriaComponent implements OnInit {

  public listaCategoria: Categoria[];
  public subFindAll: Subscription;

  public showMsg: boolean = false;
  public msg: string;

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.subFindAll.unsubscribe();
  }

  public findAll(): void {
    this.subFindAll = this.categoriaService.findAll().subscribe(
      data => { this.listaCategoria = data; }
    );
  }

  public delete(id: number): void {
    this.categoriaService.delete(id).subscribe(
      data => {
        this.showMsg = true;
        this.msg = 'la categoria se eliminó con éxito';
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
