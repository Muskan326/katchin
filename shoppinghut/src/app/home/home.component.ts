import { Component, Input, OnInit } from '@angular/core';
import {HttpconnectService} from "./../httpconnect.service"
import { Cookie } from 'ng2-cookies/ng2-cookies';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() searchText: string;

  
  constructor(public serv:HttpconnectService ) {
    if(this.searchText==undefined){
      console.log("Yes" + this.searchText)
      this.searchText=""
      console.log("Changed----"+ this.searchText.length)
    }
   }
public allItem=[];
  ngOnInit(): void {
    if(Cookie.get("userId")==null){
      Cookie.set("loggedIn","false")
    }
    this.serv.getAllItems().subscribe(
      data=>{
        if(data["status"]==200){
          this.allItem=data["data"]
        }
      }
    )

  }

  public addToCart(id){
    let data={
      userId:Cookie.get("userId"),
      itemId:id
    }
    this.serv.addtoCart(data).subscribe(
      data=>{
        if(data["status"]==200){
          Cookie.set("userId",data["data"]["userId"])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item Added to cart Successfully',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    )
  }

}
