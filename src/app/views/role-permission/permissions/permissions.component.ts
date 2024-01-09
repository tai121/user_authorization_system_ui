import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from 'src/app/services/roles.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
  createVisible = false

  updateVisible = false
  
  deleteVisible = false

  list_role_data: any[] = []
  list_permission_data: any[] = []
  list_user_data: any[]=[]

  colors: string[] = ['primary','secondary','success','danger','warning','info','light']

  permissionInfo ={
    permission:{
      _id: '',
      name: '',
      code: 0
    },
    users : [],
    roles: [],
  }

  constructor(private rolesService: RolesService,private permissionService: PermissionsService){
    this.loadPermissionData()
  }
  loadPermissionData():void{
    this.permissionService.getAll().subscribe(res=>{
      if(res.message.code===200){
        this.list_permission_data = res.data
        console.log(this.list_permission_data)
      }
    })
  }

  toggleUpdate(_id:string = '') {
    if(!this.updateVisible){
      this.permissionService.getOne(_id).subscribe(res=>{
        console.log(res)
        if(res.status){
          this.permissionInfo = res.data
          this.list_user_data = res.data.users
          this.list_role_data = res.data.roles
        }
      })
    }
    this.updateVisible = !this.updateVisible;
  }

  handleUpdateChange(event: any) {
    this.updateVisible = event;
  }

  updatePermission(){
    this.permissionService.update({id:this.permissionInfo.permission._id,name:this.permissionInfo.permission.name}).subscribe(res=>{
      if(res.status){
        this.loadPermissionData()
      }
    })
    this.toggleUpdate()
  }



  toggleCreate() {
    this.permissionInfo.permission.code=0
    this.permissionInfo.permission.name=''
    this.createVisible = !this.createVisible
  }

  createPermission(){
    this.permissionService.create(this.permissionInfo.permission).subscribe(res=>{
      if(res.status){
        this.loadPermissionData()
        this.toggleCreate()
      }
    })
  }

  handleCreateChange(event: any) {
    this.createVisible = event;
  }

  toggleDelete(_id: string ='') {
    this.permissionInfo.permission._id = _id
    this.deleteVisible = !this.deleteVisible
  }

  handleDeleteChange(event: any) {
    this.deleteVisible = event;
  }

  deletePermission(){
    this.permissionService.delete({id: this.permissionInfo.permission._id,code :this.permissionInfo.permission.code}).subscribe(res=>{
      if(res.status){
        this.loadPermissionData()
        this.toggleDelete()
      }
    })
  }
    

}
