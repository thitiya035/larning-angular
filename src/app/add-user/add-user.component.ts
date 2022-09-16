import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface UserProfileForm {
  name: FormControl<string | null>;
  age: FormControl<number | null>;
  isAdmin: FormControl<boolean | null>;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  //การสร้าง FromGroup
  //

  readonly userForm = this.fb.group<UserProfileForm>({
    name: this.fb.control<string | null>(null, Validators.required),
    // age: this.fb.nonNullable.control<number | null>(null, [
    age: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    isAdmin: this.fb.nonNullable.control(false),
  });

  get name() {
    return this.userForm.get('name');
  }

  get age() {
    return this.userForm.get('age');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm.setValue({
      //ต้องใส่ให้ครบทุกช่อง
      name: 'Pin',
      age: 25,
      isAdmin: true,
    });

    this.userForm.patchValue({
      //ใส่แค่ค่าเดียว
      age: 25,
    });
  }

  reset(): void {
    this.userForm.reset({
      age: 20,
    });
  }
}
