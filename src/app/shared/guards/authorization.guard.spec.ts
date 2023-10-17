import { TestBed } from '@angular/core/testing';


import { authorizationGuard } from './authorization.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('authorizationGuard', () => {
    let guard = authorizationGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[
            RouterTestingModule
        ]
    });
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
