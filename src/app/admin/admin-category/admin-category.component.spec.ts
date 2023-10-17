import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
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
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should reset flags and variables', () => {
  //   component.categoryForm.reset()
  //   component.isImgUploaded = true;
  //   component.uploadPercent = 50;
  //   component.addCategory();
  //   expect(component.isImgUploaded).toBeFalse();
  //   expect(component.uploadPercent).toBe(0);
  //   expect(component.categoryForm.reset).toHaveBeenCalled();
  // });


  it('should update form values when editing a category', () => {
    const mockCategory = {
      id: 1,
      name: 'Test Category',
      path: '/test-category',
      imagePath: 'test-image.jpg'
    };

    component.clickUpdateCurrentCategory(mockCategory);

    expect(component.categoryForm.value).toEqual({
      name: mockCategory.name,
      path: mockCategory.path,
      imagePath: mockCategory.imagePath
    });
  });

  it('should toggle addMenu to false', () => {
    component.clickAddBtn = true;
    component.showAddMenu();
    expect(component.clickAddBtn).toBe(false);
  });
  it('should return the value of a control', () => {
    const mockValue = 'Test Value';
    component.categoryForm.patchValue({ name: mockValue });

    const result = component.valueByControl('name');

    expect(result).toBe(mockValue);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
