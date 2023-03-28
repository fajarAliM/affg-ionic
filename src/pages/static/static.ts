import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { GolfsPage } from "../golfs/golfs";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { TournamentsTypePage } from '../tournamentstype/tournamentstype';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-static',
  templateUrl: 'static.html',
})
export class StaticPage {
  public idNoticia:any;
  private errorMsg:any;	
  public titulo:any;	
  public html:any;
  public noticias:any[];
  public url:any;
  public options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
	};
  constructor(public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private domSanitizer: DomSanitizer, private iab: InAppBrowser) {
  	this.idNoticia = this.navParams.get("id");
  	console.log(this.idNoticia);
  	this.getStatic();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaticPage');
  }

  getStatic(){
  	    
     this.http.get(this.global.urlApiLocal+"/getNoticias.php?file=true&id="+this.idNoticia+"&locale="+this.global.locale+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    
      //console.log(resp);
      this.noticias=resp;
      /*this.html=this.noticia[0].Document;
      this.titulo=this.noticia[0].Title;*/
      //console.log(this.noticias);
    }); 
    
    
  }
  openMenu(id) {
	  
	  switch (id)
    {
      case 1 : 
          //this.nav.setRoot(TabsPage,{position:0});
          console.log(id);
          this.navCtrl.setRoot(HomePage);
          break;
      case 2: 
      console.log(id);
          this.navCtrl.setRoot(TeamsPage);
          break;    
      case 4: 
      console.log(id);
          this.navCtrl.setRoot(TournamentsTypePage);
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(GolfsPage);
          break;
      case 5: 
          break;
     
    }
}//Open Menu


}
