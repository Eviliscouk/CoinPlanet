import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoinPrice } from '../../models/coinPrice';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class CoinmarketcapDataProvider {
  constructor(public http: HttpClient) {
  }
    
    public getPrices(): Observable<CoinPrice[]>{
      return this.http.get<CoinPrice[]>('https://api.coinmarketcap.com/v1/ticker/');
  }

}
