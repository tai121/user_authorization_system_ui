import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { RolesService} from '../../../services/roles.service'
import { PermissionsService} from '../../../services/permissions.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  createVisible = false

  updateVisible = false
  
  deleteVisible = false

  list_user_data: any[] = []
  list_role_data: any[] = []
  list_role_old: any[] = []
  list_permission_data: any[] = []
  colors: string[] = ['primary','secondary','success','danger','warning','info','light','dark']
  userInfo ={
    user:{
      _id: '',
      userName: '',
      password: '',
    },
    roles : [],
    claims:[]
  }

  oldUsername: string = ''
  
  constructor(private userService: UsersService,private rolesService: RolesService,private permissionService: PermissionsService,private router: Router){
    this.loadUserData()
    this.loadRoleData()
    this.loadPermissionData()
  }
  loadUserData():void{
    this.userService.getAll().subscribe(res=>{
      if(res.message.code===200){
        console.log("hi")
        this.list_user_data = res.data
        console.log(this.list_user_data)
      }
    })
  }
  loadRoleData():void{
    this.rolesService.getAll().subscribe(res=>{
      if(res.message.code===200){
        this.list_role_data = res.data
        this.list_role_data = this.list_role_data.map(item => ({ ...item, isActive: false }))
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
    console.log(this.list_role_old)
    this.list_permission_data.forEach(item => {
      item.isActive = false;
    });
    var result = this.list_role_data.reduce((accumulator, currentValue)=>currentValue.isActive?accumulator|currentValue.permissionInterger:accumulator,0)
    console.log(result)
    this.list_permission_data = this.list_permission_data.map(item=>({
      ...item,
      isActive:(item.code&result)>0
    }))
  }
  
  
  toggleUpdate(_id:string = '') {
    
    if(!this.updateVisible){
      this.userService.getOne(_id).subscribe(res=>{
        if(res['status']){ 
          this.userInfo = res.data
          var list_role_id: string[] = this.userInfo.roles.map((item:any)=>item._id)
          this.list_role_data.forEach(item=>item.isActive=list_role_id.includes(item._id))
          console.log('slice')
          this.list_role_old = this.list_role_data.map(item=>item.isActive)
          this.oldUsername = this.userInfo.user.userName
          this.loadListPermissionActive()
        }
      })
    }
    else{
      this.userInfo.user.userName =''
      this.userInfo.user.password = ''
    }
    this.updateVisible = !this.updateVisible;
  }

  handleUpdateChange(event: any) {
    this.updateVisible = event;
  }

  updateUser(){
    if(this.oldUsername!==this.userInfo.user.userName||this.userInfo.user.password!==''){
      this.userService.updateUser({id:this.userInfo.user._id, userName:this.userInfo.user.userName,password: this.userInfo.user.password}).subscribe(res=>{
        if(res.status){
          this.loadUserData()
        }
      })
    }
    for(let i = 0;i<this.list_role_data.length;i++){
      if(this.list_role_old[i] && !this.list_role_data[i].isActive){
        this.rolesService.kick({userId:this.userInfo.user._id,roleId:this.list_role_data[i]._id}).subscribe(res=>{
          
        })
      }
      else if(!this.list_role_old[i] && this.list_role_data[i].isActive){
        this.rolesService.invate({userId:this.userInfo.user._id,roleId:this.list_role_data[i]._id}).subscribe(res=>{
          
        })
      }
    }
    this.toggleUpdate()
    
  }



  toggleCreate() {
    if(!this.createVisible){
      this.userInfo.user.userName = ''
      this.userInfo.user.password = ''
    }
    this.createVisible = !this.createVisible
  }

  createUser(){
    this.userService.createUser({userName:this.userInfo.user.userName,password:this.userInfo.user.password}).subscribe(res=>{
      console.log(res)
      if(res.status){
        this.loadUserData()
        this.toggleCreate()
      }
    })
  }

  handleCreateChange(event: any) {
    this.createVisible = event;
  }

  toggleDelete(_id: string ='') {
    this.userInfo.user._id = _id
    this.deleteVisible = !this.deleteVisible
  }

  handleDeleteChange(event: any) {
    this.deleteVisible = event;
  }

  deleteUser(){
    this.userService.deleteUser({id: this.userInfo.user._id}).subscribe(res=>{
      if(res.status){
        this.loadUserData()
        this.toggleDelete()
      }
    })
  }
}
