import { Restaurant } from './../models/restaurant/restaurant';
import { Component } from '@angular/core';
import { RestaurantesService } from './restaurantes.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { RestaurantList } from '../models/restaurant/restaurantList';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurants: Restaurant[];
  loading: any; 
  constructor(
    private service: RestaurantesService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertController: AlertController) { 
  }
  ngOnInit(){
    this.getRestaurantes();
  }
  getRestaurantes(): void {
    this.presentLoading().then(()=>{this.service.getRestaurantes()
        .subscribe(
          restaurantes =>{      
            this.restaurants = restaurantes;
            this.loadingController.dismiss(null, undefined);
          },
          error => {
            this.loadingController.dismiss(null, undefined);
            this.presentAlert("Ocorreu algum erro.")
          } );
        });     
  }
  seleciona(restaurant: Restaurant){
    this.navCtrl.navigateRoot('/menu/'+ restaurant.id);
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
