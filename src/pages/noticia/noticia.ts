import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
})
export class NoticiaPage {
	public noticia:any;
	public titulo ="";
	public fecha ="";
	public img ="";
	public texto ="";
	public tags ="";
  public equipos ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider) {
	  console.log(this.navParams.data.noticia);
	  this.noticia=this.navParams.data.noticia;
	  
  }
  ionViewWillEnter() {  
    //this.getData(); 
  }
    
  

}
