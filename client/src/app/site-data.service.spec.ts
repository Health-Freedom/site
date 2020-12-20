import { TestBed } from '@angular/core/testing';

import { SiteDataService } from './site-data.service';

describe('SiteDataService', () => {
  let service: SiteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
