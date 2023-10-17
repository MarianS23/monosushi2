import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show add menu',()=>{
    component.clickAddBtn = false;
    component.showAddMenu();
    expect(component.clickAddBtn).toBe(true);
  })

  it('should return the value of a control', () => {
    const mockValue = 'Test Value';
    component.productForm.patchValue({ name: mockValue });

    const result = component.valueByControl('name');

    expect(result).toBe(mockValue);
  });
});
