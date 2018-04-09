import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculatorOptionsPage } from './calculator-options';

@NgModule({
  declarations: [
    CalculatorOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculatorOptionsPage),
  ],
})
export class CalculatorOptionsPageModule {}
