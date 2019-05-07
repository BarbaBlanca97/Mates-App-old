import { Injectable } from '@angular/core';
import { Facultades, Client } from 'app/models/models';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export enum ClientesServiceResults {
  ok,
  notFound,
  invalidData
}

const clientsUrl: string = 'api/clientes';

interface RawClient {
  dni: number,
  name: string,
  lastName: string,
  facultad: {
    id: number,
    name: string
  },
  dateRegistered: string,
  active: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

// BehaviorSubject devuelve el ultimo valor devuelto al momento de subscribirse
dataStream = new BehaviorSubject<Client[]>([]);

constructor(
  private htpp: HttpClient
) {
  this.refreshStream();
}

addNew(cliente: Client): Observable<ClientesServiceResults> {
  this.htpp.post('api/clientes', cliente).subscribe(
    (result) => {
      this.refreshStream();
    }
  );
  return of(ClientesServiceResults.ok);
}

update(cliente: Client): Observable<ClientesServiceResults> {
  this.htpp.put('api/clientes', cliente).subscribe(
    (result) => {
      this.refreshStream();
    }
  );
  return of(ClientesServiceResults.ok);
}

delete(id: number): Observable<ClientesServiceResults> {
  this.htpp.delete(`api/clientes/${id}`).subscribe(
    () => { this.refreshStream(); }
  );
  return of(ClientesServiceResults.ok);
}

getStream(): Observable<Client[]> {
  return this.dataStream.asObservable();
}

private idToFacultad(id: number): Facultades {
  switch(id) {
    case 1:
      return Facultades.fcm;
    case 2:
      return Facultades.fadu;
    case 3:
      return Facultades.fich;
    default:
      return Facultades.fcbq;
  }
}

private refreshStream() {
  this.htpp.get<RawClient[]>(clientsUrl).subscribe(
    (result) => { 
      const clients: Client[] = result.map(
        (client): Client => {
          return {
            id: client.dni,
            name: client.name,
            lastName: client.lastName,
            facultad: this.idToFacultad(client.facultad.id),
            fechaRegistro: client.dateRegistered
          }
        }
      );
      this.dataStream.next(clients);
    }
  );
}
}
