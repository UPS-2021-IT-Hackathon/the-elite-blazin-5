import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlenderModelComponent } from './blender-model.component';

describe('BlenderModelComponent', () => {
  let component: BlenderModelComponent;
  let fixture: ComponentFixture<BlenderModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlenderModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlenderModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
