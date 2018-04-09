import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FiatRate } from '../../models/fiatRate';

@Injectable()
export class FiatDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FiatDataProvider Provider');
  }

  public getRates(): Observable<FiatRate[]>{
    return this.http.get('https://api.fixer.io/latest?base=USD').map((x:any) => {
      console.log(x);
      var rates = x.rates;
      var fiatRates = [];
      var usd = new FiatRate('USD', 'USD', 1);
      usd.displayQuantity = 1;
      fiatRates.push(usd);
      for(var i in rates ) { 
        if(i == 'GBP' || i == 'EUR' || i == 'JPY'){
          var val = rates[i];
          fiatRates.push(new FiatRate(i, i, val))
        }
      }
      return fiatRates;
    });
  }

}
