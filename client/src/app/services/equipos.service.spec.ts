/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuestosService } from './equipos.service';

describe('Service: Equipos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuestosService]
    });
  });

  it('should ...', inject([PuestosService], (service: PuestosService) => {
    expect(service).toBeTruthy();
  }));
});
