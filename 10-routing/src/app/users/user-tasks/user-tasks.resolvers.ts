import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class UsernameResolver implements Resolve<string> {
  constructor(private usersService: UsersService) {}
  resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = activatedRoute.paramMap.get('userId');
    return (
      this.usersService.users.find((user) => user.id === userId)?.name ?? ''
    );
  }
}
