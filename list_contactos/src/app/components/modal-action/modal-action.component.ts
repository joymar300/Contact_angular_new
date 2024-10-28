import { Component, EventEmitter, inject, Input, output, Output, TemplateRef  } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { ContactService } from '../../core/services/contact.service';
import { NotifyrefreshService } from '../../core/services/notifyrefresh.service';
import { FormLoginComponent } from '../form-login/form-login.component';

@Component({
  selector: 'app-modal-action',
  standalone: true,
  imports: [NgbDatepickerModule, FormContactComponent,FormLoginComponent],
  templateUrl: './modal-action.component.html',
  styleUrl: './modal-action.component.css'
})
export class ModalActionComponent {
  
	private modalService = inject(NgbModal);
	closeResult = '';
  @Input() idContact='';
  @Input() name='';
  @Input() color='';
  @Output() confirmEvent = new EventEmitter<boolean>();
  @Output() confirForm = new EventEmitter<boolean>();
  
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}
  constructor(private service: ContactService){}
  
  delete( idContact:string){
    try {
      this.service.delete(idContact).subscribe({next:(data)=> {
            this.modalService.dismissAll();
            this.confirmEvent.emit(true);   
      },})
    } catch (error) {
      console.log(error)
    }
  }
 
  take(valid:boolean){
    if(valid){
      this.confirForm.emit(true);
    }

  }

}
