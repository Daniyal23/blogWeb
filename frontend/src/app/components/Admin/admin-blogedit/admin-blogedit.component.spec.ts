import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogeditComponent } from './admin-blogedit.component';

describe('AdminBlogeditComponent', () => {
  let component: AdminBlogeditComponent;
  let fixture: ComponentFixture<AdminBlogeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBlogeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
