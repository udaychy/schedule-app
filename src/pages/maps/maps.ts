import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';

declare var window: any;
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  public map: any = {};

  constructor(
    public scheduleApi: ScheduleApiProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
    let games = this.navParams.data;
    console.log('game param', games);
    let tourneyData = this.scheduleApi.currentTourney;
    let location = tourneyData.locations[games.locationId];

    if(!location) {
      this.navCtrl.pop();
      return;
    } 
    
    console.log('tourney', tourneyData);
    console.log('location', location);

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12, 
      markerLabel: games.location
    };

  }

  goToDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
  
}
