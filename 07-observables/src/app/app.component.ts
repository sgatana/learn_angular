import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {  interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0)

  clickCount$ = toObservable(this.clickCount)

  // constructor(){effect(() => {
  //     console.log(`clicked button ${this.clickCount()} times`);
  //   })
    
  // }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((val) => val % 2 === 0 ? `even: ${val}` : `odd: ${val}`))
    //   .subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log('completed'),
    //     error: (error) => console.log(error),
    //   });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
    const subscription = this.clickCount$.subscribe({
      next: (value) =>  console.log(`clicked button ${value} times`)
    })
     this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((value) => value + 1);
  }
}
