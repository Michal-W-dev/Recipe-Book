import { TestBed } from '@angular/core/testing';

import { FbDataService } from './fb-data.service';

describe('FbDataService', () => {
  let service: FbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
