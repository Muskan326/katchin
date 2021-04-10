import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpconnectService } from '../httpconnect.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private serv:HttpconnectService,private router:Router, 
    private _route:ActivatedRoute) { }
  public idlist:[]
  public allitems: object[] = [];
  public totalCost=0;
  public userId;searchText;
  ngOnInit(): void {
    this.userId=this._route.snapshot.paramMap.get('userId');
    if(!this.userId){
      Swal.fire(
        'No Item In Cart',
        'Explore our items and add to cart',
        'error'
      )
      this.router.navigate(['/home'])     
    }
    this.serv.getCartItems(Cookie.get("userId")).subscribe(
      data=>{
        if(data["status"]==200){
          this.idlist=data["data"].cart
          let unique=new Set(this.idlist);
          for (let each of unique){
            let c=0;
            this.serv.getItemDetail(each).subscribe(
              data=>{
                if(data["status"]==200){
                  for(let every of this.idlist){
                    if(each==every){
                      c++;
                    }
                  }
                  data["data"].image[0]=data["data"].image[0].slice(2,)
                  data["data"].qty=c
                  //Update total Price
                  this.totalCost=this.totalCost+(data["data"]["qty"] * data["data"]["price"])

                  
                  this.allitems.push(data["data"])
                }
              })
          }  
                 
        }
      }
    )
  }

}
