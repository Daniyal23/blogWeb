import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewusersComponent } from './admin-viewusers.component';

describe('AdminViewusersComponent', () => {
  let component: AdminViewusersComponent;
  let fixture: ComponentFixture<AdminViewusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
