import { Component, Output, EventEmitter, TemplateRef  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpconnectService } from './httpconnect.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userId;
  constructor(private modalService: BsModalService, private serv:HttpconnectService, private router:RouterModule){
    this.userId=Cookie.get("userId")
  }

  @Output() searchText = new EventEmitter<string>();
  
  title = 'shoppinghut';
  
  
  modalRef: BsModalRef;
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{animated: true});
  }

  
  decline(): void {
    this.modalRef.hide();
  }

  login(mail){
    let send={
      userId:Cookie.get("userId"),
      email:mail
    }
    this.serv.login(send).subscribe(
      data=>{
        if(data["status"]==200){
          Cookie.delete("userId")
          Cookie.delete("loggedIn")
          Cookie.set("userId",data["data"]["userId"])
          Cookie.set("loggedIn","true")
          Swal.fire(
            'Logged in successfully',
            'Cart Items are updated',
            'success'
          )
          window.location.reload();
        }
        else if(data["status"]==404){
          Swal.fire(
            'Email not registered with us',
            'Please enter registered Email address',
            'error'
          )
        }
      }
    )
  }

}
