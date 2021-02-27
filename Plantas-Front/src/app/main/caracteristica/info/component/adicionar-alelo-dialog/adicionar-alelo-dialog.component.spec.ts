import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAleloDialogComponent } from './adicionar-alelo-dialog.component';

describe('AdicionarAleloDialogComponent', () => {
  let component: AdicionarAleloDialogComponent;
  let fixture: ComponentFixture<AdicionarAleloDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarAleloDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAleloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
