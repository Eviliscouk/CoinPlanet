import { FiatDataProvider } from './../../providers/fiat-data/fiat-data';
import { FiatRate } from './../../models/fiatRate';
import { NavController, LoadingController, Loading, Refresher, ToastController, ItemSliding, AlertController, PopoverController } from 'ionic-angular';
import { CoinDetailPage } from './../coin-detail/coin-detail';
import { CoinPrice } from './../../models/coinPrice';
import { Component } from '@angular/core';
import { CoinmarketcapDataProvider } from '../../providers/coinmarketcap-data/coinmarketcap-data';
import { Subject } from 'rxjs/Subject';
import "rxjs/Rx";
import { CalculatorOptionsPage } from '../calculator-options/calculator-options';
import { CoinOption } from '../../models/coinOption';

@Component({
  selector: 'page-crypto-calculator',
  templateUrl: 'crypto-calculator.html',
})
export class CryptoCalculatorPage {
  hiddenCoins: CoinPrice[] = [];
  favouriteCoins: CoinPrice[] = [];
  coins: CoinPrice[];
  fiatRates: FiatRate[];
  coinsUpdatedMilis: number;
  ratesUpdatedMilis: number;
  loading: Loading;
  currency: string = '(USD)';
  coinChanged: Subject<CoinPrice> = new Subject<CoinPrice>();
  fiatChanged: Subject<FiatRate> = new Subject<FiatRate>();
  coinOptions: CoinOption[] = [];
  showFiat: boolean = true;
  showFavourites: boolean = true;
  showCoins: boolean = true;

  constructor(private navCtrl: NavController, private cmcData: CoinmarketcapDataProvider, private fiatData: FiatDataProvider, private alertCtrl: AlertController, private popCtrl: PopoverController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.coinChanged
    .debounceTime(800) 
    //.distinctUntilChanged()
    .subscribe(coin => this.onChangeCoinQuantity(coin));

    this.fiatChanged
    .debounceTime(800)
    //.distinctUntilChanged()
    .subscribe(fiat => this.onChangeFiatQuantity(fiat));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CryptoCalculatorPage');  
    this.updateItems();  
  }

  updateItems(refresher: Refresher = null){
    this.updateFiats(refresher);
  }

  updateCoins(refresher: Refresher = null){
    this.Createloader('Loading Crypto');
    this.loading.present().then(() => {
      this.cmcData.getPrices().subscribe(data => { 
        var newCoinData = (data) ? data : [];

        var initCoinOpts = this.coinOptions.length == 0;

        var favourites = [];
        var newCoins = [];
        newCoinData.forEach(x => {          
          var coin = this.favouriteCoins.find(y => y.symbol == x.symbol);
          if (coin){
            favourites.push(x)
          }
          else{
            newCoins.push(x)
          }

          if(initCoinOpts)
            this.coinOptions.push(new CoinOption(x.symbol, false));
        })

        this.coins = newCoins;
        this.favouriteCoins = favourites;

        this.markCoinUpdate(); 
        this.calculateFiatPriceAndQuantity(); 
        this.loading.dismiss(); 
        if (refresher) 
          refresher.complete(); 
        },
         error => { this.loading.dismiss(); if (refresher) refresher.complete();});
    });
  }

  updateFiats(refresher: Refresher = null){
    this.Createloader('Loading Fiats');
    this.loading.present().then(() => {
      this.fiatData.getRates().subscribe(data => { this.fiatRates = (data) ? data : []; this.markFiatUpdate(); this.loading.dismiss().then(()=> {this.updateCoins(refresher);}) }, error => { this.loading.dismiss(); if (refresher) refresher.complete();});
    });
  }

  doRefresh(refresher: Refresher){
    this.fiatData.getRates().subscribe(data => { this.fiatRates = (data) ? data : []; this.markFiatUpdate(); this.updateItems(refresher);});
  }

  private markCoinUpdate(){
    console.log('Coins Updated!');
    this.coinsUpdatedMilis = Date.now();      
    //this.updateFavourites();
  }

  onChangeCoin(coin: CoinPrice){
    this.coinChanged.next(coin);
  }

  onChangeFiat(fiat: FiatRate){
    this.fiatChanged.next(fiat);
  }

  onChangeCoinQuantity(coin: CoinPrice){
    if (coin && coin.displayQuantity != coin.oldDisplayQuantity)
      this.updateCoinsPriceAndQuantity(coin);
  }

  private updateCoinsPriceAndQuantity(item: CoinPrice = null){
    if(this.CoinsAreCurrent)
    {
      this.calculateCoinPriceAndQuantity(item);
    }
    else{
      //this.fiatData.getRates().subscribe(data => { this.fiatRates = (data) ? data : []; this.markFiatUpdate(); this.calculateCoinPriceAndQuantity(item); });
      this.cmcData.getPrices().subscribe(data => { this.coins = (data) ? data : []; this.markCoinUpdate(); this.calculateCoinPriceAndQuantity(item); });
    }
  }

  private calculateCoinPriceAndQuantity(item: CoinPrice = null, btcQty: number = 1){
    var btcQuantity = btcQty;
    var requestedQty = 0;
    if (item){
      requestedQty = item.displayQuantity;
      btcQuantity = +item.price_btc * item.displayQuantity;
    }

    this.coins.forEach(c => {
        var coinQuantity = btcQuantity / +c.price_btc;
        c.displayPriceBtc = +(btcQuantity * +c.price_btc).toFixed(5);
        c.displayQuantity = +coinQuantity.toFixed(2);
        c.oldDisplayQuantity = c.displayQuantity;
        c.displayPriceFiat = +(btcQuantity * +c.price_usd).toFixed(2);
    });

    this.favouriteCoins.forEach(c => {
      var coinQuantity = btcQuantity / +c.price_btc;
      c.displayPriceBtc = +(btcQuantity * +c.price_btc).toFixed(5);
      c.displayQuantity = +coinQuantity.toFixed(2);
      c.oldDisplayQuantity = c.displayQuantity;
      c.displayPriceFiat = +(btcQuantity * +c.price_usd).toFixed(2);
  });

    if (item){

      var btcItem = this.coins.find(x => x.symbol == 'BTC');
      if (btcItem){
        this.calculateFiatPriceAndQuantity(null, btcQuantity * +btcItem.price_usd );
      }
      const toast = this.toastCtrl.create({
        message: 'All coin values updated in relation to '+ requestedQty + ' '+item.name+'!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  onChangeFiatQuantity(fiat: FiatRate){
    if (fiat && fiat.displayQuantity != fiat.oldDisplayQuantity)
      this.updateFiatsPriceAndQuantity(fiat);
  }

  private updateFiatsPriceAndQuantity(item: FiatRate = null){
    if(this.FiatRatesAreCurrent)
    {
      this.calculateFiatPriceAndQuantity(item);
    }
    else{
      this.fiatData.getRates().subscribe(data => { this.fiatRates = (data) ? data : []; this.markFiatUpdate(); this.calculateFiatPriceAndQuantity(item); });
    }
  }

  private calculateFiatPriceAndQuantity(item: FiatRate = null, usdQty: number = 1){
    var usdQuantity = usdQty;
    var requestedQty = 0;
    if (item){
      requestedQty = item.displayQuantity;
      usdQuantity = +item.rate * item.displayQuantity;
    }

    this.fiatRates.forEach(c => {
        var fiatQuantity = usdQuantity / +c.rate;
        c.displayQuantity = +fiatQuantity.toFixed(2);
        c.oldDisplayQuantity = c.displayQuantity;
    });

    var btcItem = this.coins.find(x => x.symbol == 'BTC');
    if (btcItem){
      this.calculateCoinPriceAndQuantity(null, usdQuantity / +btcItem.price_usd );
    }

    if (item){
      const toast = this.toastCtrl.create({
        message: 'All fiat values updated in relation to '+ requestedQty + ' '+item.name+'!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  private FiatRatesAreCurrent(){
    return (Date.now() - this.ratesUpdatedMilis) > 600000;
  }

  private CoinsAreCurrent(){
    return (Date.now() - this.coinsUpdatedMilis) > 600000;
  }

  private markFiatUpdate(){
    console.log('Fiat Updated!');
    this.ratesUpdatedMilis = Date.now();
  }

  Createloader(message: string)
  {
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  coinSelected(coin: CoinPrice){
    console.log('coin selected:');
    console.log(coin);
    this.navCtrl.push(CoinDetailPage, {coin: coin, updated: new Date(this.coinsUpdatedMilis)});
  }

  fiatSelected(fiat: FiatRate){
    console.log('fiat selected:');
    console.log(fiat);

    //this.navCtrl.push(CoinDetailPage, {coin: coin, updated: new Date(this.coinsUpdatedMilis)});
  }

  addFavouriteCoin(slidingItem: ItemSliding, coin: CoinPrice) {
    var coinIndex = this.favouriteCoins.findIndex(x => x.symbol == coin.symbol);
    if (coinIndex == -1){
      this.favouriteCoins.push(coin);

      this.favouriteCoins = this.favouriteCoins.sort((obj1, obj2) =>  {
        // Ascending: first age less than the previous
        return +obj1.rank - +obj2.rank;
      });

      coinIndex = this.coins.indexOf(coin);
      
      if(coinIndex != -1)
        this.coins.splice(coinIndex, 1);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: coin.name +' added to favourites!',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present(); 
    }
  }

  removeFavouriteCoin(slidingItem: ItemSliding, coin: CoinPrice){
    var coinIndex = this.favouriteCoins.findIndex(x => x.symbol == coin.symbol);
    if (coinIndex != -1){
      this.favouriteCoins.splice(coinIndex, 1);

      this.coins.push(coin);

      this.coins = this.coins.sort((obj1, obj2) =>  {
        // Ascending: first age less than the previous
        return +obj1.rank - +obj2.rank;
      });


      // create an alert instance
      let alert = this.alertCtrl.create({
        title: coin.name +' removed from favourites!',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present(); 
    }
  }

  updateFavourites(){
    var symbols: string[] = [];
    this.favouriteCoins.forEach(x => symbols.push(x.symbol));
    this.favouriteCoins.length = 0;
    symbols.forEach(sym => {
      var coin = this.coins.find(x => x.symbol == sym);
      if(coin)
        this.favouriteCoins.push(coin);
    });
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popCtrl.create(CalculatorOptionsPage, {coinOptions: this.coinOptions}, {enableBackdropDismiss: false});
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data)
          return;
        
        this.coinOptions = data.coinOptions;
        
        this.coinOptions.forEach(co => {
          var coinIndex = -1;
          if (co.hidden){
            coinIndex = this.coins.findIndex(x => x.symbol == co.symbol)
            if (coinIndex != -1)
              this.hiddenCoins.push(this.coins.splice(coinIndex, 1)[0]);
            else{
              coinIndex = this.favouriteCoins.findIndex(x => x.symbol == co.symbol)
              if (coinIndex != -1)
                this.hiddenCoins.push(this.favouriteCoins.splice(coinIndex, 1)[0]);
            }
          }
          else{
            coinIndex = this.hiddenCoins.findIndex(x => x.symbol == co.symbol)
            if (coinIndex != -1)
              this.coins.push(this.hiddenCoins.splice(coinIndex, 1)[0]);
          }
        });

        this.coins = this.coins.sort((obj1, obj2) =>  {
          // Ascending: first age less than the previous
          return +obj1.rank - +obj2.rank;
        });

        this.favouriteCoins = this.favouriteCoins.sort((obj1, obj2) =>  {
          // Ascending: first age less than the previous
          return +obj1.rank - +obj2.rank;
        });
      }
    );
  }

  toggleFiat(){
    this.showFiat = !this.showFiat;
  }

  toggleFavourites(){
    this.showFavourites = !this.showFavourites;
  }

  toggleCoins(){
    this.showCoins = !this.showCoins;
  }
      
}
