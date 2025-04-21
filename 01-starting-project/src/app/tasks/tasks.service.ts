import { Injectable } from '@angular/core';
import { dummyTasks, NewTaskData, Task } from './tasks.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = dummyTasks;

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }


  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getUserTasks(userId: Task['userId']) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  removeTask(taskId: Task['id']) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage();
  }

  addTask(task: NewTaskData, userId: Task['userId']) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId,
      ...task,
    });
    this.saveTasksToLocalStorage();
  }
}
