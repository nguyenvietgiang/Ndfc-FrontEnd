import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotpassComponent } from './fogotpass.component';

describe('FogotpassComponent', () => {
  let component: FogotpassComponent;
  let fixture: ComponentFixture<FogotpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogotpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FogotpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
