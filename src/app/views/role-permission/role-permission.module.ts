import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionRoutingModule } from './role-permission-routing.module';
import { UsersService } from 'src/app/services/users.service';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule, CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, ListGroupModule, ModalModule, NavModule, PaginationModule, PlaceholderModule, PopoverModule, ProgressModule, SharedModule, SpinnerModule, TableModule, TabsModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { BaseRoutingModule } from '../base/base-routing.module';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { UsersComponent } from './users/users.component';
import { RolesService } from 'src/app/services/roles.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
  ],
  imports: [
    CommonModule,
    RolePermissionRoutingModule,
    TableModule,
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    DocsComponentsModule,
    ModalModule,
    FormsModule,
    CommonModule,
  ],
  providers:[
    UsersService,
    RolesService,
    PermissionsService,
  ]
})
export class RolePermissionModule { }
