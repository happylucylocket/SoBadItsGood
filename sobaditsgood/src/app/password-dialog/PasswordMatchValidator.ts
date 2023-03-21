import { AbstractControl, ValidatorFn } from '@angular/forms';

  export function PasswordMatch(form:any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if(form?.get('newPassword').value==form?.get('confirmPassword')?.value)
        return null
        return {PasswordDoesNotMatch: "Password does not match"}
    }
}