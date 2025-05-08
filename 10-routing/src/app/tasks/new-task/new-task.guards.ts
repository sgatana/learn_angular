import { CanDeactivate } from '@angular/router';
import { NewTaskComponent } from './new-task.component';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ExitNewTaskGuard implements CanDeactivate<NewTaskComponent> {
//   constructor(private newTaskComponent: NewTaskComponent) {}

  canDeactivate(component: NewTaskComponent) {
    if (
      (component.enteredDate() ||
      component.enteredSummary() ||
      component.enteredTitle() ) && !component.submitted
    ) {
      return window.confirm(
        'Do you want to leave? You will loose you entered data'
      );
    }
    return true;
  }
}
