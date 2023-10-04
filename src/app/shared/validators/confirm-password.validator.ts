import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword():ValidatorFn{
   return (control:AbstractControl):ValidationErrors|null =>{
    let password = control.get('password')?.value;
    let confirmPassword = control.get('repeatPassword')?.value;
    if(password != confirmPassword){
                return{
                    passwordmatcherror:true
                }
            }
            return null
   }
}