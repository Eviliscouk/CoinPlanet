import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
//import { Exchange } from '../../models/exchange';

@Injectable()
export class CryptoCompareDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CryptoCompareDataProvider Provider');
  }

  public getExchanges(symbol: string, currency: string): Observable<any>{
    console.log('requesting exchanges');
    return this.http.get('/api/data/coinsnapshot/?fsym='+symbol+'&tsym='+currency);
}

}
