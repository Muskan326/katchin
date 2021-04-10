import { TestBed } from '@angular/core/testing';

import { HttpconnectService } from './httpconnect.service';

describe('HttpconnectService', () => {
  let service: HttpconnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpconnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
