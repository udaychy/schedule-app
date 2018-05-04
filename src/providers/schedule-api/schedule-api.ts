import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleApiProvider {

  private baseUrl = "https://scheduleionicdemo.firebaseio.com";
  private tourneyData = {};
  private _currentTourney: any = {};
  constructor(public http: HttpClient) {
    console.log('Hello ScheduleApiProvider Provider');
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+ '/tournaments.json').subscribe(res => resolve(res));
    });
  }

  // getTournamentData(id){
  //   return this.http.get(this.baseUrl+ '/tournaments-data/' + id + '.json')
  //   .map(response => {
  //     this._currentTourney = response;
  //     return this._currentTourney;
  //   })
  // }

  getTournamentData(id, forceRefresh: boolean = false): Observable<any> {
    if (!forceRefresh && this.tourneyData[id]) {
      this.setCurrentTourney = this.tourneyData[id];
      console.log('no HTTP call, just return the data');
      return Observable.of(this.currentTourney);
    }

    console.log('making HTTP call');
    return this.http.get(this.baseUrl+ '/tournaments-data/' + id + '.json')
      .map(response => {
        this.tourneyData[id] = response;
        this.setCurrentTourney = this.tourneyData[id];
        return this.currentTourney;
      });
  }


  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  get currentTourney(){
    return this._currentTourney;
  }

  private set setCurrentTourney(t){
     this._currentTourney = t;
  }

}
