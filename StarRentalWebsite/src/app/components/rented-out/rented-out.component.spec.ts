import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedOutComponent } from './rented-out.component';

describe('RentedOutComponent', () => {
  let component: RentedOutComponent;
  let fixture: ComponentFixture<RentedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
