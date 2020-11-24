import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarArchivoComponent } from './borrar-archivo.component';

describe('BorrarArchivoComponent', () => {
  let component: BorrarArchivoComponent;
  let fixture: ComponentFixture<BorrarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
