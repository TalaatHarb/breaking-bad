import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingBadCharsComponent } from './breaking-bad-chars.component';

describe('BreakingBadCharsComponent', () => {
  let component: BreakingBadCharsComponent;
  let fixture: ComponentFixture<BreakingBadCharsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakingBadCharsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingBadCharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
