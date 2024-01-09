import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: any 
  password: any

  constructor(private authService: AuthService,private router: Router) { }

  login():void{
    this.authService.login({username: this.username,password:this.password}).subscribe(res=>{
      if(res.status){
        console.log(res.token)
        this.authService.saveTokenToCookie(res.token)
        this.router.navigate(['/role-permission'])
      }
    })
  }

}
