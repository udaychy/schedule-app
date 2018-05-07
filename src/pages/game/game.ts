import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { TeamHomePage } from '../team-home/team-home';
import { MapsPage } from '../maps/maps';
import { ToastController } from 'ionic-angular';

declare var window:any;
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.scheduleApi.currentTourney;
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections() {
    let tourneyData = this.scheduleApi.currentTourney;
    let location = tourneyData.locations[this.game.locationId];
    if(!location) {
      this.presentToast('No Location Found');
      return;
    } 
    
    window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }

  goToMap() {
    this.navCtrl.push(MapsPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }

  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
