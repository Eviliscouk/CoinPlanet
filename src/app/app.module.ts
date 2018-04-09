import { NewsDetailPage } from './../pages/news-detail/news-detail';
import { NewsPage } from './../pages/news/news';
import { CoinDetailPage } from './../pages/coin-detail/coin-detail';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CryptoCalculatorPage } from '../pages/crypto-calculator/crypto-calculator';
import { CoinmarketcapDataProvider } from '../providers/coinmarketcap-data/coinmarketcap-data';
import { FiatDataProvider } from '../providers/fiat-data/fiat-data';
import { CryptoCompareDataProvider } from '../providers/crypto-compare-data/crypto-compare-data';
import { NewsDataProvider } from '../providers/news-data/news-data';
import { CalculatorOptionsPage } from '../pages/calculator-options/calculator-options';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewsPage,
    NewsDetailPage,
    CryptoCalculatorPage,
    CoinDetailPage,
    CalculatorOptionsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NewsPage,
    NewsDetailPage,
    CryptoCalculatorPage,
    CalculatorOptionsPage,
    CoinDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoinmarketcapDataProvider,
    FiatDataProvider,
    CryptoCompareDataProvider,
    NewsDataProvider,
    SocialSharing
  ]
})
export class AppModule {}
