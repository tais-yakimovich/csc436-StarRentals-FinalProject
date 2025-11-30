import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLocationInfoComponent } from './register-location-info.component';

describe('RegisterLocationInfoComponent', () => {
  let component: RegisterLocationInfoComponent;
  let fixture: ComponentFixture<RegisterLocationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLocationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLocationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
