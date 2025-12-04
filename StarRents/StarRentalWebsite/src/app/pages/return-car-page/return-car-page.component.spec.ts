import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCarPageComponent } from './return-car-page.component';

describe('ReturnCarPageComponent', () => {
  let component: ReturnCarPageComponent;
  let fixture: ComponentFixture<ReturnCarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnCarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnCarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
