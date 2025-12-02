import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalReturnCardComponent } from './rental-return-card.component';

describe('RentalReturnCardComponent', () => {
  let component: RentalReturnCardComponent;
  let fixture: ComponentFixture<RentalReturnCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalReturnCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalReturnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
