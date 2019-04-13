import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Facultades } from 'app/models/models';

export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const clientes = [
      { id: 40774330, name: 'Jeremias', lastName: 'Chiosso', facultad: Facultades.fich, fechaRegistro: '10/09/2018' },
      { id: 41695331, name: 'Pablo', lastName: 'Etchecopar', facultad: Facultades.fadu, fechaRegistro: '11/09/2018' },
      { id: 42774530, name: 'Enrriqueta', lastName: 'DelCaño', facultad: Facultades.fcm, fechaRegistro: '12/09/2018' },
      { id: 43789730, name: 'Maria', lastName: 'Ramirez', facultad: Facultades.fich, fechaRegistro: '13/09/2018' },
      { id: 44770001, name: 'Candela', lastName: 'Portaneri', facultad: Facultades.fcbq, fechaRegistro: '14/09/2018' },
      { id: 40799930, name: 'Jeremias', lastName: 'Chiosso', facultad: Facultades.fich, fechaRegistro: '10/09/2018' },
      { id: 41699991, name: 'Pablo', lastName: 'Etchecopar', facultad: Facultades.fadu, fechaRegistro: '11/09/2018' },
      { id: 48884530, name: 'Enrriqueta', lastName: 'DelCaño', facultad: Facultades.fcm, fechaRegistro: '12/09/2018' },
      { id: 43666730, name: 'Maria', lastName: 'Ramirez', facultad: Facultades.fich, fechaRegistro: '13/09/2018' },
      { id: 45550001, name: 'Candela', lastName: 'Portaneri', facultad: Facultades.fcbq, fechaRegistro: '14/09/2018' },
      { id: 40774330, name: 'Jeremias', lastName: 'Chiosso', facultad: Facultades.fich, fechaRegistro: '10/09/2018' },
      { id: 41695331, name: 'Pablo', lastName: 'Etchecopar', facultad: Facultades.fadu, fechaRegistro: '11/09/2018' },
      { id: 42774530, name: 'Enrriqueta', lastName: 'DelCaño', facultad: Facultades.fcm, fechaRegistro: '12/09/2018' },
      { id: 43789730, name: 'Maria', lastName: 'Ramirez', facultad: Facultades.fich, fechaRegistro: '13/09/2018' },
      { id: 44770001, name: 'Candela', lastName: 'Portaneri', facultad: Facultades.fcbq, fechaRegistro: '14/09/2018' },
      { id: 40799930, name: 'Jeremias', lastName: 'Chiosso', facultad: Facultades.fich, fechaRegistro: '10/09/2018' },
      { id: 41699991, name: 'Pablo', lastName: 'Etchecopar', facultad: Facultades.fadu, fechaRegistro: '11/09/2018' },
      { id: 48884530, name: 'Enrriqueta', lastName: 'DelCaño', facultad: Facultades.fcm, fechaRegistro: '12/09/2018' },
      { id: 43666730, name: 'Maria', lastName: 'Ramirez', facultad: Facultades.fich, fechaRegistro: '13/09/2018' },
      { id: 45550001, name: 'Candela', lastName: 'Portaneri', facultad: Facultades.fcbq, fechaRegistro: '14/09/2018' }
    ];

    const puestos = [
      { id: 1, nombre: 'Pasillo', inventario: { equipo: { mates: 5, bombillas: 6, termos: 2, yerba: false }, ultimoRealizado: '10/12/5678' } },
      { id: 2, nombre: 'Cabina', inventario: { equipo: { mates: 2, bombillas: 5, termos: 0, yerba: true }, ultimoRealizado: '10/12/5678' } },
      { id: 3, nombre: 'Primer piso', inventario: { equipo: { mates: 4, bombillas: 2, termos: 1, yerba: true }, ultimoRealizado: '10/12/5678' } },
      { id: 4, nombre: 'Facu Bio', inventario: { equipo: { mates: 2, bombillas: 7, termos: 3, yerba: true }, ultimoRealizado: '10/12/5678' } }
    ];

    const prestamos = [
      {
        id: 0,
        cliente: { id: 43666730, name: 'Maria', lastName: 'Ramirez', facultad: Facultades.fich, fechaRegistro: '13/09/2018' },
        equipo: {
          mates: 1,
          bombillas: 2,
          termos: 0,
          yerba: true
        },
        fechaPedido: '10/12/2018',
        fechaEntregado: '11/12/2018',
        puestoPedido: { id: 4, nombre: 'Facu Bio', inventario: { mates: 2, bombillas: 7, termos: 3, yerba: true, ultimoRealizado: '10/12/5678' } }
      },
      {
        id: 1,
        cliente: { id: 45550001, name: 'Candela', lastName: 'Portaneri', facultad: Facultades.fcbq, fechaRegistro: '14/09/2018' },
        equipo: {
          mates: 1,
          bombillas: 1,
          termos: 0,
          yerba: false
        },
        fechaPedido: '8/12/2018',
        fechaEntregado: '',
        puestoPedido: { id: 1, nombre: 'Pasillo', inventario: { mates: 5, bombillas: 6, termos: 2, yerba: false, ultimoRealizado: '10/12/5678' } }
      }
    ];

    return { clientes, puestos, prestamos };
  }
}
