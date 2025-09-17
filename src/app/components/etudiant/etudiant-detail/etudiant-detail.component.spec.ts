import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDetailComponent } from './etudiant-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

describe('EtudiantDetailComponent', () => {
  let component: EtudiantDetailComponent;
  let fixture: ComponentFixture<EtudiantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([]), provideToastr()],
      imports: [EtudiantDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
