import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, Subscription, switchMap } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserProfile } from '../user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  private subscription?: Subscription;
  // private userSubscription?: Subscription;
  // private routeSubscription?: Subscription;

  user: UserProfile | null = null;
  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.router.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        switchMap((id) => {
          return id === null ? of(null) :this.userService.getUser(+id);
          // return this.userService.getUser(+id);
        })
      )
      .subscribe({
        next: (user) => (this.user = user),
        error: (response) => {
          console.error(response);
          alert("Something went wrong!");
        },
      });

    // this.routeSubscription = this.router.paramMap.subscribe((paramMap) => {
    //   const id = paramMap.get('id');
    //   if (id === null) {
    //     return;
    //   }

    //   this.userSubscription?.unsubscribe();
    //   this.userSubscription = this.userService.getUser(+id).subscribe({
    //     next: (user) => (this.user = user),
    //     error: (response) => {
    //       console.error(response);
    //       alert(response);
    //     },
    //   });
    // });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    // this.userSubscription?.unsubscribe();
    // this.routeSubscription?.unsubscribe();
  }
}
