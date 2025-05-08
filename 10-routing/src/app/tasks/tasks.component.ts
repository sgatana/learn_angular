import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  order?: 'asc' | 'desc' = 'desc';

  @Input({ required: true }) userId!: string;
  // @Input() order?: 'asc' | 'desc';

  get userTasks() {
    const tasks = this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId);
    if (this.order) {
      return tasks.sort((taskA, taskB) => {
        return this.order === 'asc'
          ? taskA.dueDate.localeCompare(taskB.dueDate)
          : taskB.dueDate.localeCompare(taskA.dueDate);
      });
    }
    return tasks;
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.order = params['order'];
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
