import { TestBed } from '@angular/core/testing';

import { TypecontactService } from './typecontact.service';

describe('TypecontactService', () => {
  let service: TypecontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypecontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
