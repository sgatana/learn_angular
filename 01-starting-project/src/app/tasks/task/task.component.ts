import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../tasks.model';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  private taskService = inject(TasksService)

  onCompleteTask() {
    this.taskService.removeTask(this.task.id)
  }
}
