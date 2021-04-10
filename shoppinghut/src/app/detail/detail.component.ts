import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import {HttpconnectService} from '../httpconnect.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private serv:HttpconnectService, private router:Router, 
    private _route:ActivatedRoute,) { }
  public itemId="";
  public item;
  ngOnInit(): void {
    this.itemId=this._route.snapshot.paramMap.get('itemId');
    this.serv.getItemDetail(this.itemId).subscribe(
      data=>{
        console.log(data["data"])
        if(data["status"]==200){
          this.item=data["data"]
          this.item.image[0]=this.item.image[0].slice(2,)
        }
      }
    )
  }

  public addToCart(){
    let data={
      userId:Cookie.get("userId"),
      itemId:this.item.itemId
    }
    this.serv.addtoCart(data).subscribe(
      data=>{
        if(data["status"]==200){
          Cookie.set("userId",data["data"]["userId"])
          Swal.fire(
            'Item Added To Cart Successfully',
            'Explore our other items',
            'success'
          )
        }
      }
    )
  }

}
