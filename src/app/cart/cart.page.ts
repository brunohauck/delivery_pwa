import { Cart } from './../models/cart/cart';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RetornoTaxaEntrega } from '../models/cart/retornoTaxaEntrega';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public cart: Cart;
  public valorTotal: number;
  public retornoTaxaEntrega: RetornoTaxaEntrega;
  constructor(
    public navCtrl: NavController,
    public cartService:  CartService
  ) {
    this.cart = new Cart(null,null,null,null,null,null,null,null,null);
    this.retornoTaxaEntrega = new RetornoTaxaEntrega(null,null);
   }

  ngOnInit(){
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }else{     
      if(sessionStorage.getItem('cart')){
        this.cart = JSON.parse(sessionStorage.getItem('cart'))
      }
      else{      
        console.log("Carrinho vazio");
      } 
    }  
  }
  goToLogin(){
    this.navCtrl.navigateRoot('/login');
  }
  goToRestaurants(){
    this.navCtrl.navigateRoot('/home');
  }
  verificaTaxaEntrega(){
    
 }
  // Update Cart Quantity
  private updateQuantity(index,amount){

  	if (this.cart.ordermenus[index].quantity + amount > 0) {
      if(amount==-1){
        this.cart.cart_total = this.cart.cart_total*1 - this.cart.ordermenus[index].menu.price*1;
      }else{
        this.cart.cart_total = this.cart.cart_total*1 + this.cart.ordermenus[index].menu.price*1;
      }
      this.cart.ordermenus[index].quantity = this.cart.ordermenus[index].quantity + amount;
      sessionStorage.setItem("cart", JSON.stringify(this.cart));       
    } 
    else if (this.cart.ordermenus[index].quantity + amount === 0) {   
      this.cart.cart_total = this.cart.cart_total*1 - this.cart.ordermenus[index].menu.price*1; 
      this.cart.ordermenus.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }else {
  		return;
  	}
  }    
  increaseQuantity(index) {
    this.updateQuantity(index,1);
  }
  decreaseQuantity(index) {
  	this.updateQuantity(index,-1);
  }
  
  checkout(){
    this.cart.status = "ordered";
    this.cart.delivery_tax = 4.99;
    this.cartService.login(this.cart).subscribe((res)=>{
      if(res==undefined){
        console.log("Error")
      }else{
        console.log(res)
        this.navCtrl.navigateRoot('/paypal');
      }
      
    },
    (err) => {console.log(err)}
    );
  }

}
