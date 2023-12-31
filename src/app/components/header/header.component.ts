import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { IProductResponce } from 'src/app/shared/interface/common.interface';


import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';


import { Role } from 'src/app/shared/constants/role.constants';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, docData } from '@angular/fire/firestore';
import { setDoc, doc } from 'firebase/firestore';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalCallbackComponent } from '../modal-callback/modal-callback.component';
import { matchPassword } from 'src/app/shared/validators/confirm-password.validator';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private basket: Array<IProductResponce> = [];
  public clickBasket: boolean = false;
  public clickBurger: boolean = false;
  public clickSignIn: boolean = false;
  public clickRegister: boolean = true;
  public islogin: boolean = false;
  public userUrl = '';
  public userName = '';
  public userRole = '';
  public totalPrice = 0;
  public totalCount = 0;
  public orders: Array<IProductResponce> = [];
  public authForm!: FormGroup;
  public registerForm!: FormGroup;

  public loginSubscription!: Subscription;



  constructor(
    private orderService: OrderService,
    private accauntService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initAuthForm();
    this.initRegisterForm()
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }
  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
    
  }
  login(): void {
    const { email, password } = this.authForm.value;
    this.loginFirebase(email, password).then(() => {
      this.toastr.success('login succes')
    }).catch(e => {
      console.log(e)
      this.toastr.error(e);
    })

    this.authForm.reset();
    this.closeSignInModal();
  }

  async loginFirebase(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      this.checkUserLogin();
    }, (e) => {
      console.log(e);
    })
  }


  register() {
    const { email, password, name, surname, phone } = this.registerForm.value;
    this.registerFirebase(email, password, name, surname, phone).then(() => {
      this.toastr.success('login succes');
      this.openSignInModal();
      this.switchToLogIn();
    }).catch(e => {
      this.toastr.error(e);
    })
    this.registerForm.reset();
  }


  async registerFirebase(email: string,
    password: string,
    name: string,
    surname: string,
    phone: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const newUser = {
      email: credential.user.email,
      firstName: name,
      lastName: surname,
      phone: phone,
      orders: [],
      address: '',
      role: 'USER'
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), newUser)
  }
  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    if (currentUser && currentUser.role === Role.ADMIN) {
      this.islogin = true;
      this.userUrl = 'admin';
      this.userName = `${currentUser.firstName} ${currentUser.lastName}`;
      this.userRole = 'Admin';
      this.router.navigate(['/' + this.userUrl])
    } else if (currentUser && currentUser.role === Role.USER) {
      this.islogin = true;
      this.userUrl = 'cabinet';
      this.userName = `${currentUser.firstName} ${currentUser.lastName}`;
      this.userRole = 'Guest';
      // this.userName = currentUser.fullName;
      this.router.navigate(['/' + this.userUrl])
    } else {
      // this.isGuest = false;
      this.islogin = false;
      this.userUrl = '/';
      this.userName = '';
      this.userRole = '';
      this.router.navigate(['/' + this.userUrl])
    }
  }
  checkUpdateUserLogin(): void {
    this.accauntService.checkUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }


  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      repeatPassword: [null]
    },
      {
        validators: [matchPassword()]
      })
  }


  loadBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.orders = this.basket;
    }
    this.getTotalPrice();
    this.getTotalCount();
  }
  getTotalPrice(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductResponce) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket
      .reduce((total: number, prod: IProductResponce) => total + prod.count, 0)
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  updateProductCount(order: IProductResponce, value: boolean, i: number) {
    this.basket = JSON.parse(localStorage.getItem('basket') as string);
    if (value) {
      ++this.basket[i].count
    } else if (!value && order.count > 1) {
      --this.basket[i].count
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  deleteCurrentItem(item: number): void {
    this.basket.splice(item, 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.loadBasket();
  }
  toggleBasket() {
    this.clickBasket = !this.clickBasket
    if (this.clickBasket) {
      document.body.style.overflow = 'hidden';
      this.close = function (event: Event): void {
        const target = event.target as Element;
        if (!target.closest('.header-basket') && target.className === 'modal-container' && !target.closest('.item-card-busket')) {
          this.clickBasket = false;
          document.body.style.overflow = 'auto';
        }
      }
    } else {
      this.close = function (): void { };
    }
  }



  //---------------sign in modal-------------------------
  openSignInModal() {
    this.clickSignIn = true;
    document.body.style.overflow = 'hidden';
    this.close = function (event: Event): void {
      if ((event.target as Element).className === 'modal-sign-in-container') {
        this.closeSignInModal();
      }
    }
  }
  closeSignInModal() {
    this.clickSignIn = false;
    document.body.style.overflow = 'auto';
    this.close = function (): void { };
  }

  @HostListener('document:click', ['$event'])
  close(event: Event): void { };



  switchToRegister() {
    this.authForm.reset();
    this.clickRegister = false;
    
  }
  switchToLogIn() {
    this.registerForm.reset();
    this.clickRegister = true;
    
  }


  toggleBurgerMenu() {
    this.clickBurger = !this.clickBurger;
  };


  openDialog() {
    this.dialog.open(ModalCallbackComponent, {
      panelClass: 'callback-modal',
      backdropClass: 'modal-container',
      autoFocus: false
    });
  }

}
