import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPayerEcolageComponent } from './modal-payer-ecolage.component';

describe('ModalPayerEcolageComponent', () => {
  let component: ModalPayerEcolageComponent;
  let fixture: ComponentFixture<ModalPayerEcolageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPayerEcolageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPayerEcolageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
