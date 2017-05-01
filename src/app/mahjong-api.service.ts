import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MahjongApiService {

  constructor(private http: Http) { }

  getGameStates() {
    return this.http.get('http://mahjongmayhem.herokuapp.com/gamestates');
  }

}
