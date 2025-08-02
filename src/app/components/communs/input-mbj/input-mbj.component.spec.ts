import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMBJComponent } from './input-mbj.component';

describe('InputMBJComponent', () => {
  let component: InputMBJComponent;
  let fixture: ComponentFixture<InputMBJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMBJComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMBJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
