import { TestBed } from '@angular/core/testing';

import { UnioviExtensionService } from './uniovi-extension.service';

describe('UnioviExtensionService', () => {
  let service: UnioviExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnioviExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
