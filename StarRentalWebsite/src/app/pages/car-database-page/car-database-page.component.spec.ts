import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDatabasePageComponent } from './car-database-page.component';

describe('CarDatabasePageComponent', () => {
  let component: CarDatabasePageComponent;
  let fixture: ComponentFixture<CarDatabasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDatabasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDatabasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
