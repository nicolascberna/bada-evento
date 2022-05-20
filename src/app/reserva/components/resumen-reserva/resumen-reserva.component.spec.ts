import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenReservaComponent } from './resumen-reserva.component';

describe('ResumenReservaComponent', () => {
  let component: ResumenReservaComponent;
  let fixture: ComponentFixture<ResumenReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
