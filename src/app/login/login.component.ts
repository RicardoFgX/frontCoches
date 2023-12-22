// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(): void {
    // Verifica no vacío
    if (this.username && this.password) {
      console.log(this.username);
      console.log(this.password);
      this.authService
        .login({ username: this.username, password: this.password })
        .subscribe(
          (response: any) => {
            // Si el inicio de sesión es exitoso, se guarda el token
            localStorage.setItem('token', response.token);
            // Redirige a la página principal
            this.router.navigate(['/']);
          },
          (error) => {
            // Si se introducen credenciales incorrectas
            this.toastr.error(
              'Inicio de sesión fallido. Verifica tus credenciales.',
              'Error'
            );
          }
        );
    } else {
      // Si se introducen campos vacíos
      this.toastr.warning(
        'Por favor, ingresa tanto el nombre de usuario como la contraseña.',
        'Advertencia'
      );
    }
  }
}
