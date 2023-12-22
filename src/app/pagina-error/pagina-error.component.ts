import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-error',
  templateUrl: './pagina-error.component.html',
  styleUrls: ['./pagina-error.component.css'],
})
export class PaginaErrorComponent {
  constructor(private router: Router) {}

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}
