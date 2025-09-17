import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAjoutComponent } from './etudiant-ajout.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

describe('EtudiantAjoutComponent', () => {
  let component: EtudiantAjoutComponent;
  let fixture: ComponentFixture<EtudiantAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([]), provideToastr()],
      imports: [EtudiantAjoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
