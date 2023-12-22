import { Component, OnInit } from '@angular/core';
import { Coche } from '../models/coche.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CocheService } from '../coche.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-coche',
  templateUrl: './editar-coche.component.html',
  styleUrls: ['./editar-coche.component.css'],
})
export class EditarCocheComponent implements OnInit {
  cocheId!: number;
  coche!: Coche;

  constructor(
    private route: ActivatedRoute,
    private cocheService: CocheService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cocheId = this.route.snapshot.params['id'];
    this.cargarDetallesCoche();
  }

  cargarDetallesCoche(): void {
    this.cocheService.obtenerCochePorId(this.cocheId).subscribe((coche) => {
      this.coche = coche;
      console.log(this.coche);

      this.cuadroMarca = this.coche.marca;
      this.cuadroModelo = this.coche.modelo;
      this.cuadroMatricula = this.coche.matricula;
    });
  }

  actualizarCoche(): void {
    // Asignar valores directamente al objeto coche
    this.coche.marca = this.cuadroMarca;
    this.coche.modelo = this.cuadroModelo;
    this.coche.matricula = this.cuadroMatricula;

    // Llamar al método actualizarCoche del servicio
    this.cocheService.actualizarCoche(this.cocheId, this.coche).subscribe(
      () => {
        // Navegar a la página del catálogo después de la actualización
        this.router.navigate(['/catalogo']);
        // Mostrar notificación de éxito
        this.toastr.success('Coche actualizado exitosamente', 'Éxito');
      },
      (error) => {
        // Mostrar notificación de error en caso de falla
        this.toastr.error('Error al actualizar el coche', 'Error');
        console.error(error);
      }
    );
  }

  cuadroMarca: string = '';
  cuadroModelo: string = '';
  cuadroMatricula: string = '';
}
