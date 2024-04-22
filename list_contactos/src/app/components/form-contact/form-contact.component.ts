import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IContacts } from '../../interface/contacs';
import { ContactService } from '../../core/services/contact.service';
import { FormControl, FormsModule, ReactiveFormsModule,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TypecontactService } from '../../core/services/typecontact.service';
import { ITypeContacts } from '../../interface/typecontacts';
import { EMPTY, catchError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.css'
})
export class FormContactComponent implements OnInit   {

  @Input() idContact='';
  @Output() valEvent = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.getalltypes();
    console.log(this.idContact);
    if(this.idContact){
      this.getDataContact(this.idContact);

    }
  }

  @Input() typeform = '';
  contactType: ITypeContacts[]=[];
  private modalService = inject(NgbModal);
  public errorMessage!:string;
  contactsform = new FormGroup({
    typecontactid: new FormControl(1,[Validators.required]),
    name: new FormControl('',[Validators.required]),
    comment: new FormControl(''),
    phonenum: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    infoextra1: new FormControl(''),
    infoextra2: new FormControl(''),
    
  })

  constructor(private service : ContactService, private typecontactservice: TypecontactService){}

  getalltypes():void{
    this.typecontactservice.getAll().subscribe({next:(res)=>{console.log(res); this.contactType= res }, error:(e)=> console.error(e)})
  }

  saveContact(){
    
   if(this.contactsform.valid){

     console.log(this.contactsform.value ,'valor del formulario') 
     const typecontactid = parseInt(this.contactsform.value.typecontactid!.toString(), 10);
     const phonenum= parseInt(this.contactsform.value.phonenum!,10);
      const  data: IContacts={
      name:this.contactsform.value.name!,
      phonenum: phonenum,
      typecontactid:typecontactid,
      comment:this.contactsform.value.comment!,
      infoextra1:this.contactsform.value.infoextra1!,
      infoextra2:this.contactsform.value.infoextra2!,
    }

    this.service.create(data).subscribe({
      next: (res) => {
        console.log('Contacto creado exitosamente:', res);
        this.valEvent.emit(true)
        this.contactsform.reset();
        
      },
      error: (e) => console.error('Error al crear contacto:', e)
    });
    }
   }

   getDataContact(id:string){
    if(id != ''){
      
      try{
        this.service.find(id).subscribe(
          res=>{
            this.contactsform.patchValue({

              name: res.name,
              phonenum:res.phonenum.toString(),
              typecontactid: res.typecontactid,
              comment: res.comment ,
              infoextra1: res.infoextra1,
              infoextra2: res.infoextra2

            })
          }
        );
        console.log("se cargaron los tados al formulario")
  
      }catch(er)
      { console.log("error al traer datos del contacto")}
    }else{
      console.log("no entró")
    }
   }

   updateContact(){
    
      try {
        const typecontactid = parseInt(this.contactsform.value.typecontactid!.toString(), 10);
        const phonenum= parseInt(this.contactsform.value.phonenum!,10);
        const  data: IContacts={
        contactid: parseInt(this.idContact,10), 
        name:this.contactsform.value.name!,
        phonenum:phonenum,
        typecontactid:typecontactid,
        comment:this.contactsform.value.comment!,
        infoextra1:this.contactsform.value.infoextra1!,
        infoextra2:this.contactsform.value.infoextra2!,
      }
      
      this.service.update(this.idContact, data).subscribe({next:(value)=> {
        console.log("editado");
        this.modalService.dismissAll();
        this.valEvent.emit(true)
      }});
  
      } catch (error) {
        console.log("error al actualizar", error)
      }
   }


}
