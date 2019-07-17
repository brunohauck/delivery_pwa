import { OrderMenu } from './../models/cart/order_menu';
import { Cart } from './../models/cart/cart';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { MenusService } from './menus.service';
import { MenuList } from './../models/menu/menuList';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu/menu';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menus: Menu[];
  id: string;
  cart: Cart;
  ordermenu: OrderMenu;
  ordermenus: OrderMenu[] = [];
  loading: any; 
  constructor(
    private service: MenusService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController) { 
      this.id = this.route.snapshot.paramMap.get("id");
      this.ordermenu = new OrderMenu(null,null,null);
      if(sessionStorage.getItem('cart')){
        console.log(sessionStorage.getItem('cart'))
        this.cart = JSON.parse(sessionStorage.getItem('cart'));
        if(!this.menus){
          console.log("entrou no if ==0")
           this.cart = new Cart(null,null,null,null,null,null,null,null,null);
        }
      }else{
        this.cart = new Cart(null,null,null,null,null,null,null,null,null);
      }
  }
  ngOnInit(){
    
    this.getMenu();
  }
  getMenu(): void {
    this.presentLoading().then(()=>{
      this.service.getMenus(this.id)
        .subscribe(
          menus =>{
            console.log("carregou os restaurantes ----->");

            this.menus = menus;
            this.loadingController.dismiss();
          },
          error => {
            this.loadingController.dismiss();
            this.presentAlert("Ocorreu algum erro.")
          } );
        });    
  }
  seleciona(menu: Menu){
    if(this.cart.ordermenus == null){ 
      this.ordermenu.quantity = 1;
      this.ordermenu.menu = menu;
      this.ordermenu.menu_id = menu.id;
      this.ordermenus[0] = this.ordermenu; 
      this.cart.ordermenus = this.ordermenus;
      this.cart.cart_total = this.ordermenu.menu.price;
      this.cart.delivery_tax = 10.50;
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }else
    if(this.cart.ordermenus.length>0){

      let flag=true;
      this.cart.ordermenus.forEach((menu) => {
        if(menu.menu.id == this.ordermenu.menu.id){
          console.log("pedido já se encontra no carrinho");
          flag=false;
        }
      });
      if(flag){
        this.ordermenu.quantity = 1;
        let arrayIndex = this.cart.ordermenus.length;
        this.cart.cart_total = this.cart.cart_total*1 + this.ordermenu.menu.price*1;
        this.cart.ordermenus[arrayIndex] = this.ordermenu;
        this.cart.ordermenus[arrayIndex].menu_id = this.ordermenu.menu.id;
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
      }	
      console.log(sessionStorage.getItem('cart'))
    }
    this.navCtrl.navigateRoot('/cart');
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading',
      duration: 2000
    });
    await this.loading.present();
  }
  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
