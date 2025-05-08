import {
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  // userId = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // @Input({ required: true }) userId!: string;

  // username = computed(
  //   () =>
  //     this.usersService.users.find((user) => user.id === this.userId)?.name
  // );
  @Input({ required: true }) username!: string;
  // @Input()
  // set userId(uid: string) {
  //   console.log(uid);
  //   this.username = this.usersService.users.find(
  //     (user) => user.id === uid
  //   )?.name;
  // }

  //   get username() {
  //     console.log(this.userId);
  //     return this.usersService.users.find((user) => user.id === this.userId)
  //       ?.name;
  //   }

  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.username = this.usersService.users.find(
  //         (user) => user.id === paramMap.get('userId')
  //       )?.name;
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}

export const resolverUsername: ResolveFn<string> = (
  activateRouteSnapshot: ActivatedRouteSnapshot,
  routerStateSnapshot: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userId = activateRouteSnapshot.paramMap.get('userId');
  const user = usersService.users.find((user) => user.id === userId);
  return user?.name ?? '';
};
