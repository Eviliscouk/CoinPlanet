import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CryptoCalculatorPage } from './crypto-calculator';

@NgModule({
  declarations: [
    CryptoCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(CryptoCalculatorPage),
  ],
})
export class CryptoCalculatorPageModule {}
