import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewblogsComponent } from './admin-viewblogs.component';

describe('AdminViewblogsComponent', () => {
  let component: AdminViewblogsComponent;
  let fixture: ComponentFixture<AdminViewblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewblogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
