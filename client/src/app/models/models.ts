export class Client {
  id: number;
  name: string;
  lastName: string;
  facultad: Facultades;
  fechaRegistro: string;
}

export enum Facultades {
  fich = 'FICH',
  fcbq = 'FCBQ',
  fadu = 'FADU',
  fcm = 'FCM'
}

export class Equipo {
  mates: number;
  bombillas: number;
  termos: number;
  yerba: boolean;
}

export class Inventario {
  equipo: Equipo;
  ultimoActualizado: string;
}

export class Puesto {
  id: number;
  nombre: string;
  inventario: Inventario;
}

export class Prestamo {
  id: number;
  cliente: Client;
  equipo: Equipo;
  fechaPedido: string;
  fechaEntregado: string;
  puestoPedido: Puesto;
}
