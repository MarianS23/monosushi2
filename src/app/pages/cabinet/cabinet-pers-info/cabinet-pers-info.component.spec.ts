import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPersInfoComponent } from './cabinet-pers-info.component';

describe('CabinetPersInfoComponent', () => {
  let component: CabinetPersInfoComponent;
  let fixture: ComponentFixture<CabinetPersInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetPersInfoComponent]
    });
    fixture = TestBed.createComponent(CabinetPersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
