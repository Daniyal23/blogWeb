import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllcommentsComponent } from './admin-allcomments.component';

describe('AdminAllcommentsComponent', () => {
  let component: AdminAllcommentsComponent;
  let fixture: ComponentFixture<AdminAllcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllcommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
