import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRentalsComponent } from './register-rentals.component';

describe('RegisterRentalsComponent', () => {
  let component: RegisterRentalsComponent;
  let fixture: ComponentFixture<RegisterRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
