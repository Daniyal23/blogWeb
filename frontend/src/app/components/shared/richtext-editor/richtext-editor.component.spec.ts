import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichtextEditorComponent } from './richtext-editor.component';

describe('RichtextEditorComponent', () => {
  let component: RichtextEditorComponent;
  let fixture: ComponentFixture<RichtextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichtextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichtextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
