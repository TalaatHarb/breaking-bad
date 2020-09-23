import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakingBadCharsModule } from 'breaking-bad-chars';
import { MockModule } from 'ng-mocks';

import { CastPageComponent } from './cast-page.component';

describe('CastPageComponent', () => {
  let component: CastPageComponent;
  let fixture: ComponentFixture<CastPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastPageComponent ],
      imports: [MockModule(BreakingBadCharsModule)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
