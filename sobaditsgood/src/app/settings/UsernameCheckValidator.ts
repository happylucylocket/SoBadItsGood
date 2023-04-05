import { APIServiceService } from '../apiservice.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { user } from '../user';

export function UsernameUsed(form:any,users:any[],usernameCheck:string): ValidatorFn {
      
    return (control: AbstractControl): { [key: string]: any } | null => {
        for(var i=0;i<users.length;i++){
            if(form.get('username')?.value==users[i].username&&form.get('username')?.value!=usernameCheck)
            return {usernameUsed:"Username Already Used"}
        }
        return null
    }
}