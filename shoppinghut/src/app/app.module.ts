import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { HttpconnectService} from '../app/httpconnect.service'
import {HttpClientModule} from '@angular/common/http'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { BsModalService, BsModalRef,ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent, pathMatch:'full'},
      {path:'detail/:itemId',component:DetailComponent, pathMatch:'full'},
      {path:'cart/:userId',component:CartComponent, pathMatch:'full'},
      {path:'',component:HomeComponent, pathMatch:'full'},
      {path:'**',component:HomeComponent, pathMatch:'full'}
    ])
  ],
  providers: [HttpconnectService,, BsModalService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
