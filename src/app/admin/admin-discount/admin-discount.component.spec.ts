import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { of } from 'rxjs';


describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: Storage,useValue:{}}
        

      ]
    });
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the value of a control', () => {
    const mockValue = 'Test Value';
    component.discountForm.patchValue({ name: mockValue });

    const result = component.valueByControl('name');

    expect(result).toBe(mockValue);
  });
  
  it('should call addDiscount',()=>{
    spyOn(component,'getDiscount').and.callThrough();
    component.getDiscount();
    expect(component.getDiscount).toHaveBeenCalled();
  })

  // it('should get discounts', () => {
  //   const fakeDiscounts = [
  //     {
  //       date: 'Date',
  //       id: 1,
  //       name: 'string',
  //       title: 'string',
  //       description: 'string',
  //       imagePath: 'string'
  //     }
  //   ]
  //   spyOn(component, 'getDiscount').and.callThrough();
  //   spyOn(discountsBaseStub, 'getDiscount').and.returnValue(of(fakeDiscounts));

  //   component.getDiscount();

  //   expect(component.getDiscount).toHaveBeenCalled();
  //   expect(component.discounts).toEqual(jasmine.arrayContaining(fakeDiscounts));
  // });
});
