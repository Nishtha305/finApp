import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }
  onSubmit(){
    if(this.loginForm.valid){
      const user = this.loginForm.value;
      this.authService.login(user).subscribe(
        (data) =>{
          this.authService.saveToken(data.token);
          this.router.navigate(['/dashboard'])
        },
        (err) =>{
          console.log(err);
        }
      )
    }
  }

}
