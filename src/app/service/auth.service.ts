import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth) { }

  public createUser(email: string, password: string, name: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(user=>{
      user.user.updateProfile({
        displayName : name, 
        photoURL : ""
      }).then(()=>console.log('nombre agregado'))
    });
  }

  public loginWithEmailPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then( data=> {
      console.log(data.user);
   });;
  }

  public getCurrentUser() {
    return this.angularFireAuth.currentUser.then( data=> {
      console.log(data);
   });
  }

 

  public signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('userUID');
   });
  }
}
