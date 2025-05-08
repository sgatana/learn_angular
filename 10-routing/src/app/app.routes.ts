import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolverUsername,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsernameResolver } from './users/user-tasks/user-tasks.resolvers';
import { ExitNewTaskGuard } from './tasks/new-task/new-task.guards';

export const routes: Routes = [
  { path: '', component: NoTaskComponent },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      username: UsernameResolver,
      // username: resolverUsername,
    },
    
    data: { selectedUser: 'Hello' },
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate:  [ExitNewTaskGuard]
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
