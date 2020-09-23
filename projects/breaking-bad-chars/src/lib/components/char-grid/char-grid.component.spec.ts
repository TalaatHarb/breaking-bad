import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharGridComponent } from './char-grid.component';

describe('CharGridComponent', () => {
  let component: CharGridComponent;
  let fixture: ComponentFixture<CharGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
