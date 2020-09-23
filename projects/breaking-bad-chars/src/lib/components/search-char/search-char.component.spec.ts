import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCharComponent } from './search-char.component';

describe('SearchCharComponent', () => {
  let component: SearchCharComponent;
  let fixture: ComponentFixture<SearchCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
