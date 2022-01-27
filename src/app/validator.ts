import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// 用于校验表单中密码重复输入是否相同
export const passwordEqualValidator: ValidatorFn = 
(control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {
      notEqual: '两次输入的密码不一致'
    }
  }