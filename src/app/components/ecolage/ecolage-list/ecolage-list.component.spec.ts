import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcolageListComponent } from './ecolage-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('EcolageListComponent', () => {
  let component: EcolageListComponent;
  let fixture: ComponentFixture<EcolageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [EcolageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EcolageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
