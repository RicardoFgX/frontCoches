import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocheService } from '../coche.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-coche',
  templateUrl: './agregar-coche.component.html',
  styleUrls: ['./agregar-coche.component.css'],
})
export class AgregarCocheComponent {
  cuadroMarca: string = '';
  cuadroModelo: string = '';
  cuadroMatricula: string = '';

  constructor(
    private cocheService: CocheService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  agregarCoche(): void {
    if (!this.cuadroMarca || !this.cuadroModelo || !this.cuadroMatricula) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }

    const nuevoCoche = {
      marca: this.cuadroMarca,
      modelo: this.cuadroModelo,
      matricula: this.cuadroMatricula,
    };

    this.cocheService.agregarCoche(nuevoCoche).subscribe(
      () => {
        this.toastr.success('Coche agregado exitosamente.', 'Éxito');
        this.router.navigate(['/catalogo']);
      },
      (error) => {
        console.error('Error al agregar el coche:', error);
        this.toastr.error('Hubo un error al agregar el coche.', 'Error');
      }
    );
  }
}
