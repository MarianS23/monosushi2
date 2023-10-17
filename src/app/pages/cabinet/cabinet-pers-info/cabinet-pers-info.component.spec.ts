import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPersInfoComponent } from './cabinet-pers-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firestore } from '@angular/fire/firestore';

describe('CabinetPersInfoComponent', () => {
  let component: CabinetPersInfoComponent;
  let fixture: ComponentFixture<CabinetPersInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetPersInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(CabinetPersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
