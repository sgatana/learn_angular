import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;

  private destroyRef = inject(DestroyRef);

  // form = viewChild<NgForm>('form')

  constructor() {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const { email } = JSON.parse(savedForm);
      setTimeout(() => {
        this.form.controls['email'].setValue(email);
      }, 1);
    }
    afterNextRender(() => {
      const subscription = this.form.valueChanges
        ?.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({
                email: value?.email,
              })
            );
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const { email, password } = formData.form.value;
    console.log(formData.form);
    console.log(email, password);

    // formData.form.reset()
    formData.resetForm();
  }
}
