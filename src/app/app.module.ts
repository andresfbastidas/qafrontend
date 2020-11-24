import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select'
import {MatToolbarModule} from '@angular/material/toolbar'

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './component/login/login.component';
import { EditarUsuarioComponent } from './component/CRUDUsuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './component/CRUDUsuario/eliminar-usuario/eliminar-usuario.component';
import { CrearUsuarioComponent } from './component/CRUDUsuario/crear-usuario/crear-usuario.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { SampleComponent } from './main/sample/sample.component';
import { CrearProyectoComponent } from './component/CRUDProyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './component/CRUDProyecto/editar-proyecto/editar-proyecto.component';
import { ListaProyectosComponent } from './component/CRUDProyecto/lista-proyectos/lista-proyectos.component';
import { CrearArchivoComponent } from './component/CRUDArchivo/crear-archivo/crear-archivo.component';
import { BorrarArchivoComponent } from './component/CRUDArchivo/borrar-archivo/borrar-archivo.component';
import { CrearCategoriaComponent } from './CRUDCategoria/crear-categoria/crear-categoria.component';
import { BorrarCategoriaComponent } from './CRUDCategoria/borrar-categoria/borrar-categoria.component';
import { EditarCategoriaComponent } from './CRUDCategoria/editar-categoria/editar-categoria.component';
import {FormsModule} from '@angular/forms';
import { EditarDocumentosComponent } from './component/editar-documentos/editar-documentos.component'

const redirectToLogin = ()=> redirectUnauthorizedTo(['login']);

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent, 
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'editar-usuario', component: EditarUsuarioComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'inicio', component: SampleComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: '', component: SampleComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'eliminar-usuario', component: EliminarUsuarioComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'crear-proyecto', component: CrearProyectoComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'editar-proyecto/:id', component: EditarProyectoComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'lista-proyectos', component: ListaProyectosComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'crear-archivo', component: CrearArchivoComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'borrar-archivo', component: BorrarArchivoComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'crear-categoria', component: CrearCategoriaComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'borrar-categoria', component: BorrarCategoriaComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'editar-categoria', component: EditarCategoriaComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
    { path: 'editar-documentos', component: EditarDocumentosComponent,
    canActivate:[AngularFireAuthGuard], data:{authGuardPipe:redirectToLogin}},
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        EditarUsuarioComponent,
        EliminarUsuarioComponent,
        CrearUsuarioComponent,
        CrearProyectoComponent,
        EditarProyectoComponent,
        ListaProyectosComponent,
        CrearArchivoComponent,
        BorrarArchivoComponent,
        CrearCategoriaComponent,
        BorrarCategoriaComponent,
        EditarCategoriaComponent,
        EditarDocumentosComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        //Firebase modules
        AngularFireModule,
        AngularFireModule.initializeApp(environment.firebase, "cloud"),
        AngularFireAuthModule,
        AngularFirestoreModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
