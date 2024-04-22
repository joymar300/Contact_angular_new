import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  error= false;
  logdata = new FormGroup({
  
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
   
  })
  router = inject(Router)
  constructor(private service: UserService){}

  login(){
    if(this.logdata.valid){

      const email = this.logdata.value.email!;
      const password = this.logdata.value.password!;
      this.service.loginjwt(email,password).subscribe({next:(res)=> {
        localStorage.setItem("token", res.token);
        window.location.reload();
      }, error(err){
        alert("no found")
      }
    });
    }else{
      this.error= true;
    }
  }
  
}
