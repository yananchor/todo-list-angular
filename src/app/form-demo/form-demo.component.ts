import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { passwordEqualValidator } from '../validator';

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css'],
})
export class FormDemoComponent implements OnInit {
  // 注册一个表单控件，导入一个FormControl类并创建一个FormControl的新实例
  // 可以直接对表单控件的状态进行监听、修改和校验
  user = new FormControl();

  // 使用FormGroup创建表单
  // 定义FormGroup对象, 并包含多个FormControl对象
  // userInfo = new FormGroup({
  //   userName: new FormControl('11', [Validators.required, Validators.minLength(3)]),
  //   // phone: new FormControl('15826541550', [Validators.required, Validators.pattern(/^1[34578]\d{9}$/)]),
  //   phone: new FormControl('15826541550', {
  //     // 设置第二个参数为一个AbstractControlOptions类型
  //     // 在该对象类型中传递validators/ asyncValidators / updateOn
  //     validators: [
  //       Validators.required, 
  //       Validators.pattern(/^1[34578]\d{9}$/)
  //     ],
  //     // 设置什么时间触发校验
  //     updateOn: 'blur'
  //   }),
  //   sex: new FormControl('0', [Validators.required]),
  //   pwd: new FormGroup({
  //     password: new FormControl('123456', this.passwordValidator),
  //     confirmPassword: new FormControl('', this.passwordValidator),
  //   }, passwordEqualValidator)
  // });
  userInfo = this.fb.group({
    userName: ['',[ Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^1[34578]\d{9}$/)]],
    sex: ['', [Validators.required]],
    pwd: this.fb.group({
      password: ['', this.passwordValidator],
      confirmPassword: ['', this.passwordValidator],
    }, {validators: passwordEqualValidator})
  });

  showPwd: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 通过可观察对象valueChanges
    // 可以在模板中使用AsyncPipe或在组件类中使用subscribe()方法来监听表单值的变化
    this.user.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  changeUserName(): void {
    // 通过FormControl的setValue方法可以设置对应的值
    this.user.setValue('Jack');
  }

  // 打印FormGroup中的数据信息
  onSubmit(): void {
    console.log(this.userInfo.value);
  }

  updateFormData(): void {
    // 使用form.patchValue(键值对象);方法设置表单中指定字段的值
    // this.userInfo.patchValue({'userName': 'Jack'});
    // 先使用form.get(键)获取formControl对象，再调用setValue方法
    // this.userInfo.get('userName')?.setValue('Jerry');
    this.userInfo.patchValue({
      'userName': 'Jack',
      'phone': '13452637283',
      'sex': '0',
      'pwd': {
        'password': 'asdfg123',
        'confirmPassword': 'asdfg123'
      }
  });
  }

  // 定义get方法直接获取属性值, 拿到的属性值可以在页面做校验UI处理
  // 1. invalid 可以判断表单字段是否通过
  // 2. touched和dirty指定当触发之后再回执行判断
  // 3. hasError()设置判断对应类型的错误
  get username(): AbstractControl | null {
    return this.userInfo.get('userName');
  }

  get phone(): AbstractControl | null {
    return this.userInfo.get('phone');
  }
  get password(): AbstractControl | null {
    return this.userInfo.get('pwd.password');
  }
  get confirmPassword(): AbstractControl | null {
    return this.userInfo.get('pwd.confirmPassword');
  }
  get pwd(): AbstractControl | null {
    return this.userInfo.get('pwd');
  }

  // 自定义校验规则
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    const reg = /^[a-zA-Z]\w{2,7}$/;
    return reg.test(control.value) ? null : {
      passwordError: '密码必须以字母开头, 只能包含数字、字母、下划线、中划线，长度在3-6之间'
    }
  }
}
