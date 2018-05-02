import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [
    {id: 1, name: 'Team 1'},
    {id: 2, name: 'Team 2'},
    {id: 3, name: 'Team 3'}
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

}
