import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcolageItemComponent } from './ecolage-item.component';

describe('EcolageItemComponent', () => {
  let component: EcolageItemComponent;
  let fixture: ComponentFixture<EcolageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcolageItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcolageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
