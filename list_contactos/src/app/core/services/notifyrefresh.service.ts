import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyrefreshService {

  private contactAlert= new Subject<void>();
  contactNotify$= this.contactAlert.asObservable();
  constructor() { }
  notifyContact():void{
    this.contactAlert.next();
  }
}
