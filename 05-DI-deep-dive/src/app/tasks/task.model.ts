import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOption = {
  status: TaskStatus;
  value: 'open' | 'in-progress' | 'done';
  label: string;
};

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOption[]>('task-status-options');

export const taskStatusOptions: TaskStatusOption[] = [
  {
    status: 'OPEN',
    value: 'open',
    label: 'Open',
  },
  {
    status: 'IN_PROGRESS',
    value: 'in-progress',
    label: 'In Progress',
  },
  {
    status: 'DONE',
    value: 'done',
    label: 'Done',
  },
];

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: taskStatusOptions,
} 

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
