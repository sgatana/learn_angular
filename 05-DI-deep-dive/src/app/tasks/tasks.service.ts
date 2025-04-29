import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask({ title, description }: { title: string; description: string }) {
    const newTask: Task = {
      id: new Date().toISOString(),
      title,
      description,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    // this.tasks.update((tasks) => {
    //   const taskIndex = tasks.findIndex((task) => task.id === id);
    //   const updatedTasks = [...tasks];
    //   updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status };
    //   return updatedTasks;
    // });
  }
}
