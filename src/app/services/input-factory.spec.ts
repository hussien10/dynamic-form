import { TestBed } from '@angular/core/testing';

import { InputFactory } from './input-factory';

describe('InputFactory', () => {
  let service: InputFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
