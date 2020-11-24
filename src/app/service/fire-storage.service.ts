import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  uploadFile(file: File) {
    const id = Math.random().toString(36).substring(2);
    const filePath = `upload/profile_${id}.jpg`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(downloadUrl => {
        // this.fileService.uploadFile(file).subscribe();
        }
        )
      )
    ).subscribe();
  }
}
