import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CoinOption } from '../../models/coinOption';

@IonicPage()
@Component({
  selector: 'page-calculator-options',
  templateUrl: 'calculator-options.html',
})
export class CalculatorOptionsPage {
  coinOptions: CoinOption[]
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatorOptionsPage');
    this.coinOptions = this.navParams.get('coinOptions');
    console.log(this.coinOptions);
  }

  onSet() {
    console.log(this.coinOptions);
    this.viewCtrl.dismiss({coinOptions: this.coinOptions});
  }

  onCancel(){
    this.viewCtrl.dismiss();
  }

}
