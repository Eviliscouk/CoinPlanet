export class FiatRate {
    public displayQuantity: number = 0;
    public oldDisplayQuantity: number = 0;
    constructor(public symbol: string, public name: string, public rate: number){}
  }