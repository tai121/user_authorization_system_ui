import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Login',
    url: '/login',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Portal',
    title: true
  },
  {
    name: 'Portal',
    url: '/role-permission',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Users',
        url: '/role-permission/users'
      },
      {
        name: 'Roles',
        url: '/role-permission/roles'
      },
      {
        name: 'Permissions',
        url: '/role-permission/permissions'
      },
    ]
  },
 
 
 
  
];
