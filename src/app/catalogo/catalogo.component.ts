import { Component, OnInit } from '@angular/core';
import { Coche } from '../models/coche.model';
import { CocheService } from '../coche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  coches: Coche[] = [];

  constructor(private cocheService: CocheService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCoches();
  }

  cargarCoches() {
    console.log('Haciendo clic en cargarCoches'); // Añade este log
    this.cocheService.listarTodosLosCoches().subscribe((data) => {
      console.log('Datos recibidos:', data); // Añade este log
      this.coches = data;
    });
  }

  confirmarEliminarCoche(id: number): void {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas eliminar este coche?'
    );

    if (confirmacion) {
      this.eliminarCoche(id);
    }
  }

  eliminarCoche(id: number): void {
    this.cocheService.eliminarCoche(id).subscribe(() => {
      // Actualizar la lista después de la eliminación
      this.cargarCoches();
    });
  }

  modificarCoche(id: number): void {
    // Navegar a la página de edición
    this.router.navigate(['/editar-coche', id]);
  }

  agregarCoche(): void {
    this.router.navigate(['/agregar-coche']);
  }
}
