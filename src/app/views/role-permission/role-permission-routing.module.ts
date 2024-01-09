import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {PermissionsComponent} from './permissions/permissions.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role-Permission',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles',
        },
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: 'Permissions',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolePermissionRoutingModule { }
