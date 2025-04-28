import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth/auth.model';
import { AuthService } from './auth/auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

  @Input({ required: true, alias: 'appAuth' }) userType: Permission = 'guest';
  private authService = inject(AuthService);

  //   ngOnInit() {
  //     if(this.authService.activePermission() === this.userType) {
  //       console.log('User has the required permission:', this.userType);
  //     }else {
  //       console.log('User does not have the required permission:', this.userType);
  //     }
  //   }
}
