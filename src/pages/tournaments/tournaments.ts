import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { ScheduleApiProvider } from '../../providers/schedule-api/schedule-api';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleApi: ScheduleApiProvider,
    private commonService: CommonProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');

    this.commonService.displayLoader('Loading Tournaments')
    .then((loaderRef) => {
      this.scheduleApi.getTournaments()
      .then((data) => {
        this.tournaments = data
        loaderRef.dismiss();        
      })
    });
    

  }

  itemTapped($event, tourney){
    this.navCtrl.push(TeamsPage, tourney)
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}
