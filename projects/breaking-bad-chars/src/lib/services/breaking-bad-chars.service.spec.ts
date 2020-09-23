import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BreakingBadCharsService } from './breaking-bad-chars.service';

describe('BreakingBadCharsService', () => {
  let service: BreakingBadCharsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BreakingBadCharsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
