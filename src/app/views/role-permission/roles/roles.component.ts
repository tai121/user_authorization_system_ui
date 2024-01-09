import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  createVisible = false

  updateVisible = false
  
  deleteVisible = false

  list_role_data: any[] = []
  list_permission_data: any[] = []
  list_user_data: any[]=[]

  colors: string[] = ['primary','secondary','success','danger','warning','info','light','dark']
  roleInfo ={
    role:{
      _id: '',
      name: '',
      description:'',
      permissionInterger: 0
    },
    users : [],
    claims: [],
  }

  
  constructor(private rolesService: RolesService,private permissionService: PermissionsService){
    this.loadRoleData()
    this.loadPermissionData()
  }
  loadRoleData():void{
    this.rolesService.getAll().subscribe(res=>{
      if(res.message.code===200){
        this.list_role_data = res.data
        console.log(this.list_role_data)
      }
    })
  }
  loadPermissionData():void{
    this.permissionService.getAll().subscribe(res=>{
      if(res.message.code===200){
        this.list_permission_data = res.data
        this.list_permission_data = this.list_permission_data.map(item => ({ ...item, isActive: false }))
        console.log(this.list_permission_data)
      }
    })
  }
  loadListPermissionActive():void{
    this.list_permission_data.forEach(item => {
      item.isActive = false;
    });
    var result = this.roleInfo.role.permissionInterger
    this.list_permission_data = this.list_permission_data.map(item=>({
      ...item,
      isActive:(item.code&result)>0
    }))
  }

  toggleUpdate(_id:string = '') {
    if(!this.updateVisible){
      this.rolesService.getOne(_id).subscribe(res=>{
        console.log(res)
        if(res.status){
          this.roleInfo = res.data
          this.list_user_data = res.data.users
          this.loadListPermissionActive()
        }
      })
    }
    this.updateVisible = !this.updateVisible;
  }

  handleUpdateChange(event: any) {
    this.updateVisible = event;
  }

  updateRole(){
    var result = this.list_permission_data.reduce((accumulator, currentValue)=>currentValue.isActive?accumulator|currentValue.code:accumulator,0)
    this.roleInfo.role.permissionInterger = result
    this.rolesService.update({...this.roleInfo.role,id:this.roleInfo.role._id}).subscribe(res=>{
      if(res.status){
        this.loadRoleData()
      }
    })
    this.toggleUpdate()
  }
  onChangePermission(){
    var result = this.list_permission_data.reduce((accumulator, currentValue)=>currentValue.isActive?accumulator|currentValue.code:accumulator,0)
    this.roleInfo.role.permissionInterger = result
  }



  toggleCreate() {
    this.roleInfo.role.name =''
    this.roleInfo.role.description =''
    this.roleInfo.role.permissionInterger =0
    this.createVisible = !this.createVisible
  }

  createRole(){
    this.rolesService.create(this.roleInfo.role).subscribe(res=>{
      if(res.status){
        this.loadRoleData()
        this.toggleCreate()
      }
    })
  }

  handleCreateChange(event: any) {
    this.createVisible = event;
  }

  toggleDelete(_id: string ='') {
    this.roleInfo.role._id = _id
    this.deleteVisible = !this.deleteVisible
  }

  handleDeleteChange(event: any) {
    this.deleteVisible = event;
  }

  deleteRole(){
    this.rolesService.delete({id: this.roleInfo.role._id}).subscribe(res=>{
      if(res.status){
        this.loadRoleData()
        this.toggleDelete()
      }
    })
  }

}
