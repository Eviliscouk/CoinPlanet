export class CoinPrice {
  public displayPriceBtc: number = 0;
  public displayPriceFiat: number = 0;
  public displayQuantity: number = 0;
  public oldDisplayQuantity: number = 0;

  constructor(
    public id: string,
    public name: string,
    public symbol: string,
    public rank: string,
    public price_usd: string,
    public price_btc: string,
    //public 24h_volume_usd: string,
    public market_cap_usd: string,
    public available_supply: string,
    public total_supply: string,
    public max_supply: string,
    public percent_change_1h: string,
    public percent_change_24h: string,
    public percent_change_7d: string,
    public last_updated: string) {}
}