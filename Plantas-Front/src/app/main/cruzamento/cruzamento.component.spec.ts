import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzamentoComponent } from './cruzamento.component';

describe('CruzamentoComponent', () => {
  let component: CruzamentoComponent;
  let fixture: ComponentFixture<CruzamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruzamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
