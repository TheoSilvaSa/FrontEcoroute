import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoesComponent } from './caminhoes.component';

describe('CaminhoesComponent', () => {
  let component: CaminhoesComponent;
  let fixture: ComponentFixture<CaminhoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaminhoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaminhoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
