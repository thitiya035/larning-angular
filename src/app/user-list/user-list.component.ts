import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { UserProfile } from '../user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private subscription?: Subscription;

  users: UserProfile[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (response) => {
        console.error(response);
        alert('Something went wrong');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  viewUserDetail(user: UserProfile):void {
    this.router.navigate(['/users',user.id]);
  }
}
