import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAjoutComponent } from './etudiant-ajout.component';

describe('EtudiantAjoutComponent', () => {
  let component: EtudiantAjoutComponent;
  let fixture: ComponentFixture<EtudiantAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
