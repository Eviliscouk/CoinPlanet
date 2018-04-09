import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinDetailPage } from './coin-detail';

@NgModule({
  declarations: [
    CoinDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinDetailPage),
  ],
})
export class CoinDetailPageModule {}
