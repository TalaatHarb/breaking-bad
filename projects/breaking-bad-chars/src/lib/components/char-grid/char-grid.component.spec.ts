import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharLoadingComponent } from 'breaking-bad-chars';
import { MockComponent } from 'ng-mocks';

import { CharGridComponent } from './char-grid.component';

describe('CharGridComponent', () => {
  let component: CharGridComponent;
  let fixture: ComponentFixture<CharGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CharGridComponent,
        MockComponent(CharLoadingComponent)
      ],
      imports: [HttpClientTestingModule]
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
