import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockModule } from 'ng-mocks';

import { SearchCharComponent } from './search-char.component';

describe('SearchCharComponent', () => {
  let component: SearchCharComponent;
  let fixture: ComponentFixture<SearchCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCharComponent],
      imports: [
        HttpClientTestingModule,
        MockModule(FormsModule)
      ]
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
