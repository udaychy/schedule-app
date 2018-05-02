import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  public team: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team= this.navParams.data;
    console.log('nav params in team details page', this.navParams)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailsPage');
  }

}
