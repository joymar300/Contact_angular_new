import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITypeContacts } from '../../interface/typecontacts';
const baseUrl= 'https://localhost:5001/api/typecontacts';
@Injectable({
  providedIn: 'root'
})
export class TypecontactService {

  constructor(private http: HttpClient) {   }
  getAll():Observable<ITypeContacts[]>{
    return this.http.get<ITypeContacts[]>(baseUrl);
  }
  getType(id: any): Observable<ITypeContacts> {
    return this.http.get<ITypeContacts>(`${baseUrl}/${id}`);
  }
}
