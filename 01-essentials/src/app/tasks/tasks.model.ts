import { User } from '../user/user.model';

export type Task = {
    id: string;
    userId: User['id'];
    title: string;
    summary: string;
    dueDate: string;
  };
  
  export type NewTaskData = {
    title: Task['title'];
    summary: Task['summary'];
    dueDate: Task['dueDate'];
  }
  export const dummyTasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
    {
      id: 't4',
      userId: 'u2',
      title: 'Prepare presentation',
      summary:
        'Prepare a presentation for the next team meeting and share it with the team.',
      dueDate: '2024-05-31',
    },
    {
      id: 't5',
      userId: 'u1',
      title: 'Create a new project',
      summary:
        'Create a new project in the GitHub organization and add all team members.',
      dueDate: '2024-06-01',
    },
  ];