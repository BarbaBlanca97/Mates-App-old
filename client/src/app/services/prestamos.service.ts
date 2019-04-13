import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Prestamo } from 'app/models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  // BehaviorSubject devuelve el ultimo valor devuelto al momento de subscribirse
  dataStream = new BehaviorSubject<Prestamo[]>([]);

  constructor(
    private http: HttpClient
  ) {
    this.refreshStream();
  }

  getStream(): Observable<Prestamo[]> {
    return this.dataStream.asObservable();
  }

  nuevoPrestamo(prestamo: Prestamo) {
    this.http.post('api/prestamos', prestamo).subscribe(
      () => {
        this.refreshStream();
      }
    );
  }

  private refreshStream() {
    this.http.get<Prestamo[]>('api/prestamos').subscribe(
      (result) => { this.dataStream.next(result); }
    );
  }
}
