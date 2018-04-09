import { NewsPage } from './../news/news';
import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { CryptoCalculatorPage } from '../crypto-calculator/crypto-calculator';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CryptoCalculatorPage;
  tab2Root = NewsPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
