import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


//   Statements   : 35.16% ( 186/529 )
// Branches     : 8.04% ( 7/87 )
// Functions    : 30.97% ( 57/184 )
// Lines        : 34.43% ( 177/514 )



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open signIn modal',()=>{
    component.clickSignIn = false;
    component.openSignInModal();
    expect(component.clickSignIn).toBe(true);
  })

  it('should close signIn modal',()=>{
    component.clickSignIn = true;
    component.closeSignInModal();
    expect(component.clickSignIn).toBe(false);
  })

  it('should switch to register',()=>{
    component.clickRegister = true;
    component.switchToRegister();
    expect(component.clickRegister).toBe(false);
  })

  it('should switch to login',()=>{
    component.clickRegister = false;
    component.switchToLogIn();
    expect(component.clickRegister).toBe(true);
  })

  it('should toggle burger menu',()=>{
    component.clickBurger = false;
    component.toggleBurgerMenu();
    expect(component.clickBurger).toBe(true);
  })

  it('should open dialog',()=>{
    spyOn(component,'openDialog').and.callThrough();
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  })
  it('should toggleBasket',()=>{
    spyOn(component,'toggleBasket').and.callThrough();
    component.toggleBasket();
    expect(component.toggleBasket).toHaveBeenCalled();
  })
  

});
