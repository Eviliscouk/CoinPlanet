import { NewsDetailPage } from './../news-detail/news-detail';
import { NewsItem } from './../../models/newsItem';
import { NewsDataProvider } from './../../providers/news-data/news-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  newsItems: NewsItem[] = [];
  items:NewsItem[] = [];
  pagesLoaded = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public newsData: NewsDataProvider, private loadingCtrl: LoadingController) {
    
    const loading = this.loadingCtrl.create({
      content: 'Loading News Items'
    });
    loading.present()
      .then(() => {
        this.newsData.getNews().subscribe((news) => {
          console.log('received news');
          console.log(news);
          var articles = news.articles;
          this.newsItems = articles;
          var items = this.newsItems.slice(0,19);
          items.forEach(a => {
            this.items.push(new NewsItem(a.title, a.author, a.description, a.url, a.urlToImage, a.publishedAt));
          })
          this.pagesLoaded = 1;
          loading.dismiss();
        } );
      })
      .catch(() => loading.dismiss());
    
    
      
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      var itemCount = this.pagesLoaded * 20;
      for (let i = itemCount; i < itemCount + 20 ; i++) {
        this.items.push( this.newsItems[i] );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  showArticle(item: NewsItem){
    console.log('coin selected:');
    console.log(item);
    this.navCtrl.push(NewsDetailPage, {article: item});
  }

}
