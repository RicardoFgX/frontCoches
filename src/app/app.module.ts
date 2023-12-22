import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CocheService } from './coche.service';
import { PrincipalComponentComponent } from './principal-component/principal-component.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarCocheComponent } from './editar-coche/editar-coche.component';
import { ToastrModule } from 'ngx-toastr';
import { AgregarCocheComponent } from './agregar-coche/agregar-coche.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: PrincipalComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  {
    path: 'editar-coche/:id',
    component: EditarCocheComponent,
  },
  {
    path: 'agregar-coche',
    component: AgregarCocheComponent,
  },
  { path: '**', component: PaginaErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    PrincipalComponentComponent,
    EditarCocheComponent,
    AgregarCocheComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [CocheService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
