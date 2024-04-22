import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interface/users';
const urlbase ='https://localhost:5001/api/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  loginjwt(email:String, password:string){
   return this.http.post<{token:string}>(urlbase+'Auths/login', {
      email:email,
      password:password,
    });
  }


}
