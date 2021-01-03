import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserapproveComponent } from './admin-userapprove.component';

describe('AdminUserapproveComponent', () => {
  let component: AdminUserapproveComponent;
  let fixture: ComponentFixture<AdminUserapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
