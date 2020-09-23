import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharLoadingComponent } from './char-loading.component';

describe('CharLoadingComponent', () => {
  let component: CharLoadingComponent;
  let fixture: ComponentFixture<CharLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
