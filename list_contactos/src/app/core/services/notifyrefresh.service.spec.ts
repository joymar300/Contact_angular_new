import { TestBed } from '@angular/core/testing';

import { NotifyrefreshService } from './notifyrefresh.service';

describe('NotifyrefreshService', () => {
  let service: NotifyrefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyrefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
