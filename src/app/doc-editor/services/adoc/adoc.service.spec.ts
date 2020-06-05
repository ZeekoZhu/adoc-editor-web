import { TestBed } from '@angular/core/testing';

import { AdocService } from './adoc.service';

describe('AdocService', () => {
  let service: AdocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
