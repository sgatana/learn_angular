import { Component, Input } from '@angular/core';
import { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import { type Task } from './tasks.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) name!: User['name'];
  @Input({ required: true }) userId!: User['id'];
  isAddingTask = false;

 constructor(private tasksService: TasksService) {}

  get userTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onToggleTaskModal() {
    this.isAddingTask = !this.isAddingTask;
  }
}
