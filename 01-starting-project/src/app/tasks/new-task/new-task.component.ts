import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData, Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private taskService = inject(TasksService);
  @Output() closeModal = new EventEmitter<void>();
  @Input({ required: true }) userId!: User['id'];

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  onCloseModal() {
    this.closeModal.emit();
  }
  onAddTask() {
    this.taskService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDueDate,
      },
      this.userId
    );
    this.onCloseModal()
  }

}
