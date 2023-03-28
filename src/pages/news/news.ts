import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";

import { NewsDetailPage } from '../news-detail/news-detail';


@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public videos : Array<any> = [];  
  public resultados : Array<any> = [];  
  public noticiaPrincipal : Array<any> = []; 
  public banner = "";  
  public partidos : Array<any> = [];
  private noticias:any;

  private news:any;

  constructor(public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
  }

  ionViewWillEnter() { 
     this.getNews();
     this.getBanner();
  }

  openNews(newsObj){
    this.navCtrl.push(NewsDetailPage,newsObj);
  }
 
  getNews(){
    let params = new HttpParams()
      .set("id_torneo", this.global.id_torneo.toString());
    this.http.get(this.global.url+"/news/read.php",{params: params})
      .subscribe((res: any) => {
        console.log(res);
        this.noticias = res.records;   
    }, error => {
      console.log(error);
    }) 
  }

  getBanner(){
    let params = new HttpParams()
      .set("id_torneo", this.global.id_torneo.toString())
      .set("records","1");
    this.http.get(this.global.url+"/banner/read_x.php",{params: params}).subscribe((resp:any) => {
      console.log(resp.records);
      this.banner=resp.records;
    });  
  }


}
