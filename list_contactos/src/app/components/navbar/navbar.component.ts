import { Component, OnInit, inject } from '@angular/core';
import { ModalActionComponent } from '../modal-action/modal-action.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ModalActionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  valid=false;
router= inject(Router);
isLoggedIn(): boolean {
  // confirm token
   if(!!localStorage.getItem('token')){
    return this.valid=true;
   }else{
    return this.valid=false;
   };

   
}

ngOnInit(): void {
  this.isLoggedIn();
}
  logout(){
    localStorage.removeItem('token');
    console.log('close')
   window.location.reload();
  }
}
