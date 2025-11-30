import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaGrafoComponent } from './mapa-grafo.component';

describe('MapaGrafoComponent', () => {
  let component: MapaGrafoComponent;
  let fixture: ComponentFixture<MapaGrafoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaGrafoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaGrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
