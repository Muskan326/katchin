import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpconnectService {
  private url='http://localhost:3000/v1'
  constructor(private http:HttpClient) { }

  public getAllItems=()=>{
    return this.http.get(`${this.url}/getAll`) 
  }

  public getItemDetail=(itemId)=>{
    return this.http.get(`${this.url}/getItemDetail/${itemId}`) 
  }

  public addtoCart=(data)=>{
    return this.http.post(`${this.url}/addtoCart`,data)
  }

  public getCartItems=(userId)=>{
    return this.http.get(`${this.url}/getCartItems/${userId}`) 
  }

  public login=(data)=>{
    return this.http.post(`${this.url}/login`,data)
  }
}
