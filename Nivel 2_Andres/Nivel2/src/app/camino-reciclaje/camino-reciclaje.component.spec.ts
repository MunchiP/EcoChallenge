import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminoReciclajeComponent } from './camino-reciclaje.component';

describe('CaminoReciclajeComponent', () => {
  let component: CaminoReciclajeComponent;
  let fixture: ComponentFixture<CaminoReciclajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaminoReciclajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaminoReciclajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
