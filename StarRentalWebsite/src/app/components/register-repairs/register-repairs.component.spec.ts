import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRepairsComponent } from './register-repairs.component';

describe('RegisterRepairsComponent', () => {
  let component: RegisterRepairsComponent;
  let fixture: ComponentFixture<RegisterRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRepairsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
