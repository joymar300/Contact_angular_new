import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContacts } from '../../interface/contacs';


const urlbase ='https://localhost:5001/api/contacts';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient ) { }

  getContactsList():Observable<IContacts[]>{
    return this.http.get<IContacts[]>(urlbase);
  }

  find(id:any):Observable<IContacts>{
    return this.http.get<IContacts>(`${urlbase}/${id}`);
  }

  create(data:IContacts):Observable<IContacts>{
    return this.http.post<IContacts>(urlbase,data);

  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${urlbase}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${urlbase}/${id}`);
  }
}
