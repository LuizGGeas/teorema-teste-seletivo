import { TestBed } from '@angular/core/testing';

import { PlantaSelecionadaService } from './planta-selecionada.service';

describe('PlantaSelecionadaService', () => {
  let service: PlantaSelecionadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantaSelecionadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
