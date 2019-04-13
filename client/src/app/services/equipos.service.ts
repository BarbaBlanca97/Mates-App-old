import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Puesto, Inventario } from 'app/models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
puestoActual: Puesto;
dataStream = new BehaviorSubject<Puesto[]>([]);

constructor(
  private http: HttpClient
) {
  this.refreshStream();
  this.getAllPosts().subscribe(
    (puestos: Puesto[]) => {
      this.puestoActual = puestos[0];
    });
}

public getPostById (id: number): Observable<Puesto> {
  return this.http.get<Puesto>(`api/puestos/${id}`);
}

public getAllPosts (): Observable<Puesto[]> {
  return this.dataStream.asObservable();
}

public getCurrentPost (): Puesto {
  return this.puestoActual;
}

public makeInventory (inventario: Inventario) {
  const requestBody = this.puestoActual;
  requestBody.inventario = inventario;
  return this.http.put(`api/puestos`, requestBody).subscribe(
    (result) => {
      this.refreshStream();
    }
  );
}

private refreshStream (): void {
  this.http.get<Puesto[]>('api/puestos').subscribe(
    (result) => {
      this.dataStream.next(result);
    }
  );
}
}
