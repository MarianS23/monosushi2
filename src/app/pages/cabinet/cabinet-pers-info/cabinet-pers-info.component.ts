import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc } from 'firebase/firestore';




@Component({
  selector: 'app-cabinet-pers-info',
  templateUrl: './cabinet-pers-info.component.html',
  styleUrls: ['./cabinet-pers-info.component.scss']
})
export class CabinetPersInfoComponent implements OnInit, OnDestroy {
  public userProfileForm!: FormGroup;
  constructor(
    private afs: Firestore,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getUser();
    this.initUserProfileForm();
  }
  ngOnDestroy(): void {

  }
  async getUser() {
    const userUid = (JSON.parse(localStorage.getItem('currentUser') as string)).uid;
    docData(doc(this.afs, 'users', userUid)).subscribe(userProfile => {
      if (userProfile) {
        this.userProfileForm.patchValue({
          name: userProfile['firstName'],
          surname: userProfile['lastName'],
          phone: userProfile['phone'],
          email: userProfile['email']
        })
      }
    })

  }




  // getUser() {
  //   const userUid = (JSON.parse(localStorage.getItem('currentUser') as string)).uid;
  //   this.userProfile(userUid);
  // }
  // async userProfile(uid:string): Promise<any> {
  //   docData(doc(this.afs,'users',uid)).subscribe(userProfile=>{
  //     if(userProfile){
  //       localStorage.setItem('userProfile',JSON.stringify(userProfile))
  //       let user = JSON.parse(localStorage.getItem('userProfile') as string)
  //       this.userProfileForm.patchValue({
  //         name:user.firstName,
  //         surname:user.lastName,
  //         phone:user.phone,
  //         email:user.email
  //       })
  //     }

  //   })
  // }




  initUserProfileForm(): void {
    this.userProfileForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required]
    })
  }

}
