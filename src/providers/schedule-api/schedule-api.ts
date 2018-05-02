import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ScheduleApiProvider {

  private baseUrl = "https://scheduleionicdemo.firebaseio.com";
  private _currentTourney: any = {};
  constructor(public http: HttpClient) {
    console.log('Hello ScheduleApiProvider Provider');
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+ '/tournaments.json').subscribe(res => resolve(res));
    });
  }

  getTournamentData(id){
    return this.http.get(this.baseUrl+ '/tournaments-data/' + id + '.json')
    .map(response => {
      this._currentTourney = response;
      return this._currentTourney;
    })
  }

  get currentTourney(){
    return this._currentTourney;
  }
}
