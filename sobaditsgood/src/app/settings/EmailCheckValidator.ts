import { APIServiceService } from '../apiservice.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { user } from '../user';

export function EmailUsed(form:any,users:any[],emailCheck:string): ValidatorFn {
      
    return (control: AbstractControl): { [key: string]: any } | null => {
        for(var i=0;i<users.length;i++){
            if(form.get('userEmail')?.value==users[i].email&&form.get('userEmail')?.value!=emailCheck)
            return {EmailUsed:"Email Already Used"}
        }
        return null
    }
}