import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {

  }

  sayHello(){
    let alert = this.alertCtrl.create({
      title: 'Simple alert',
      subTitle: 'Hello World!',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
