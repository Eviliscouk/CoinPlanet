import { CryptoCompareDataProvider } from './../../providers/crypto-compare-data/crypto-compare-data';
import { CoinPrice } from './../../models/coinPrice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coin-detail',
  templateUrl: 'coin-detail.html',
})
export class CoinDetailPage {
 coin: CoinPrice;
 updatedTime: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cryptoCompareData: CryptoCompareDataProvider) {
  }

  ionViewDidLoad() {
    this.coin = this.navParams.get('coin');
    this.updatedTime = this.navParams.get('updated');

    //this.cryptoCompareData.getExchanges(this.coin.symbol, 'USD').subscribe(x => {console.log(x);})
  }

}
