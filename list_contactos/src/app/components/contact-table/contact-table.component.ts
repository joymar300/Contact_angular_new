import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalActionComponent } from '../modal-action/modal-action.component';
import { IContacts } from '../../interface/contacs';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../../core/services/contact.service';
import { ITypeContacts } from '../../interface/typecontacts';
import { TypecontactService } from '../../core/services/typecontact.service';
import { NotifyrefreshService } from '../../core/services/notifyrefresh.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [ModalActionComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css'
})
export class ContactTableComponent implements OnInit {
  contacts: IContacts[] = [];
  typecontacts: ITypeContacts[]=[];
  subscription!: Subscription;
  validarCambio= false ;
  filterOption= new FormGroup({
    id: new FormControl(0)
  });
  option=0;


  constructor(private service: ContactService, private typeservice: TypecontactService){}
  ngOnInit(): void {
    this.loadContacts();
    this.getTypes();
  }

  refresh(valid:boolean){
        if(valid){
          this.loadContacts();
        }else{
          console.log("no entró")
        }
    
  }


loadContacts(){
  this.service.getContactsList().subscribe({next : (data) => {
    if (data.length>0) {
      this.contacts = data;
      this.getTypeContact();
      console.log("carga");
      
    }
}, error(err) {
  console.log(err)
},});}

getTypeContact(){
  for(const contac of this.contacts){
    this.typeservice.getType(contac.typecontactid).subscribe({next: (typeContact )=>{
      contac.typecontact = typeContact.type ;
    }, error(err) {
      console.error(err)
    },
  })
    
  }
}

getTypes(){
  this.typeservice.getAll().subscribe(
  {next: (data)=>{
    this.typecontacts=data;
  },error(Err){
    console.log(Err)
  }
})
}
  filter(){
    
     this.option= parseInt(this.filterOption.value.id!.toString(),10);
    console.log(this.option);
  
  }

}
