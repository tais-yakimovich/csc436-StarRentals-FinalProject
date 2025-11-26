import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignUpCardComponent } from './user-sign-up-card.component';

describe('UserSignUpCardComponent', () => {
  let component: UserSignUpCardComponent;
  let fixture: ComponentFixture<UserSignUpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSignUpCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignUpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
