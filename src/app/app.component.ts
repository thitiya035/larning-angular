import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from './service/user.service';
import { UserProfile } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  users: UserProfile[] = [];
  userForm = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    age: this.fb.control<number | null>(null),
    isAdmin: this.fb.control<boolean | null>(false),
    id: this.fb.control<number | null>(null),
  });

  private subscription?: Subscription;
  // private gerUserSuc
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription?.unsubscribe();
    this.subscription = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  get id() {
    return this.userForm.get('id');
  }

  addUser(): void {
    this.subscription?.unsubscribe();
    if (this.userForm.invalid) {
      return;
    }
    const userProfile = this.userForm.value as UserProfile;
    this.subscription = this.userService
      .addUser(userProfile)
      .subscribe((user) => {
        this.users.push(user);
        this.userForm.reset();
      });
  }

  editUser(user: UserProfile): void {
    this.userForm.reset(user);
  }

  updateUser(): void {
    this.subscription?.unsubscribe();
    if (this.userForm.invalid) {
      return;
    }
    const userProfile = this.userForm.value as UserProfile;
    this.subscription = this.userService
      .updateUser(userProfile)
      .subscribe((updatedUser) => {
        const index = this.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        this.users.splice(index, 1, updatedUser);
        this.userForm.reset();
      });
  }

  deleteUser(id: number): void {
    this.subscription?.unsubscribe();
    this.subscription = this.userService.deleteUser(id).subscribe({
      next: () => {
        const index = this.users.findIndex((user) => user.id === id);
        this.users.splice(index, 1);
      },
      error: (response: HttpErrorResponse) => {
        console.warn(response);
        alert('Something went wrong! Please try again later.');
      },
    });
    // .subscribe(() => {
    //   const index = this.users.findIndex((user) => user.id === id);
    //   this.users.splice(index, 1);
    // });
  }
  // title = 'my-new-project';
  // appMinLabel = 'myAppMinLabel';
  // appMaxLabel = 'myAppMaxLabel';
  // testClick(){
  //   console.log('test Even')
  // }
  // testNumberChange(value: number){
  //   console.log('test Numberchange from app action bar:',value);
  // }
}
