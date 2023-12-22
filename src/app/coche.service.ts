// coche.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Coche } from './models/coche.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  private apiUrl = 'http://localhost:8080/api/coches';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  listarTodosLosCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  eliminarCoche(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.toastr.success('Coche eliminado correctamente', 'Éxito');
      })
    );
  }

  obtenerCochePorId(id: number): Observable<Coche> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Coche>(url);
  }

  actualizarCoche(id: number, coche: Coche): Observable<Coche> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Coche>(url, coche);
  }

  agregarCoche(nuevoCoche: any): Observable<Coche> {
    return this.http.post<Coche>(this.apiUrl, nuevoCoche);
  }
}
