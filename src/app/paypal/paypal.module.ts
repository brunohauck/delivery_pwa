import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaypalPage } from './paypal.page';
import { PayPal } from '@ionic-native/paypal/ngx';

const routes: Routes = [
  {
    path: '',
    component: PaypalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaypalPage],
  providers: [
    PayPal
  ] 
})
export class PaypalPageModule {}
