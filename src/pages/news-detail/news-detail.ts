import { NewsItem } from './../../models/newsItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, FabContainer } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  article: NewsItem
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, private socialSharing: SocialSharing, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
    this.article = this.navParams.get('article');
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = { zoom: 'no', presentationstyle:'pagesheet' };
    this.iab.create(url, '_self', options);
  }

  compilemsg():string{
    var msg = this.article.title + "-" + this.article.url;
    return msg.concat(" \n Sent from my Awesome App !");
  }

  regularShare(){
    var msg = this.compilemsg();
    return this.socialSharing.share(msg, null, null, null);
  }

  whatsappShare(){
    var msg  = this.compilemsg();
     return this.socialSharing.shareViaWhatsApp(msg, null, null);
   }

  twitterShare(){
    var msg  = this.compilemsg();
    return this.socialSharing.shareViaTwitter(msg, null, null);
  }

  facebookShare(){
    var msg  = this.compilemsg();
    return this.socialSharing.shareViaFacebook(msg, null, null);
  }

  instagramShare(){
    var msg  = this.compilemsg();
    return this.socialSharing.shareViaInstagram(msg, this.article.urlToImage);
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();

    var p: Promise<any>;
    if (network == 'WhatsApp')
      p = this.whatsappShare();
    else if (network == 'Instagram')
      p = this.instagramShare();
    else if (network == 'Twitter')
      p = this.twitterShare();
    else if (network == 'Facebook')
      p = this.facebookShare();
    
    p.then(() => {
      console.log('Posted to '+network);
      loading.dismiss();
    })
    .catch(()=> {
      console.log('Failed Post to '+network)
      loading.dismiss();
    })
  }
}
