import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function passwordValidator(control: AbstractControl) {
  if ((control.value as string).includes('?')) {
    return null;
  }
  return {
    passwordInvalid: true,
  };
}

function emailValidator(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({
    emailInvalid: true,
  });
}

@Component({
  selector: 'app-login-with-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-with-reactive.component.html',
  styleUrl: './login-with-reactive.component.css',
})
export class LoginWithReactiveComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailValidator],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        passwordValidator,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.dirty &&
      this.form.controls.email.touched
    );
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty &&
      this.form.controls.password.touched
    );
  }

  onSubmit() {
    console.log(this.form);
  }

  ngOnInit(): void {
    const savedForm = localStorage.getItem('saved-login-form');
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      this.form.patchValue({ email: parsedForm.email });
    }

    
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({
              email: value.email,
            })
          );
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
