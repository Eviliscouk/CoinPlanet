import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsDataProvider {
  //
//newsApi = new NewsAPI('89a7e14a30bf4eff8031538728c027ac')
  constructor(public http: HttpClient) {
    console.log('Hello NewsDataProvider Provider');
  }

  public getNews(): Observable<any>{
    return this.http.get<any>('https://newsapi.org/v2/everything?language=en&q=(bitcoin OR crypto)&pageSize=100&sortBy=publishedAt&apiKey=89a7e14a30bf4eff8031538728c027ac');
}

  /*public getNews(): Observable<string>{
    return this.newsApi.v2.everything({
      q: 'bitcoin',
      //sources: 'bbc-news,the-verge',
      //domains: 'bbc.co.uk, techcrunch.com',
      //from: '2017-12-01',
      //to: '2017-12-12',
      language: 'en',
      sortBy: 'publishedAt',
      page: 5
      }).then(response => {
      console.log(response);
      }).map(x => {
        return Observable.of(JSON.stringify(x));
      })
     .catch(function(err){
       console.log('error');
       return Observable.of(JSON.stringify(err));
     });
  }*/

}
