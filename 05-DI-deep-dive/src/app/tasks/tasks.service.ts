import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask({ title, description }: { title: string; description: string }) {
    const newTask: Task = {
      id: new Date().toISOString(),
      title,
      description,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.loggingService.log('Task added with title: ' + title);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    this.loggingService.log(`Task status with id ${id} updated to ${status}`);
    // this.tasks.update((tasks) => {
    //   const taskIndex = tasks.findIndex((task) => task.id === id);
    //   const updatedTasks = [...tasks];
    //   updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status };
    //   return updatedTasks;
    // });
  }
}
