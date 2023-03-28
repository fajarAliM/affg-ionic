import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { ScoreCardPage } from '../scorecard/scorecard';
import { ScoresPage } from "../scores/scores";
import { HomePage } from "../home/home";
import { TeamsPage } from '../teams/teams';
import { RankingPage } from '../ranking/ranking';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FavoriteProvider } from './../../providers/favorite/favorite';


@Component({
  selector: 'page-rankingteam',
  templateUrl: 'rankingteam.html',
})
export class RankingTeamPage {

  public listado : Array<any> = [];
  public scores : Array<any> = [];
  public isFavorite : Array<any> = [];
  public rondas : Array<any> = [];
  private ranking:any;
  private rankingArray:any;
  private slug:any;
  private categoryName:any;
  private rankings=true;
  public fb_live_url:any;
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

  constructor(public favoriteProvider: FavoriteProvider,public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
	  this.fb_live_url='http://admin.fgranks.com/static/redirect_fb_live.php';
	  let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Rankings...'
    });
    loading.present();
    this.slug = this.navParams.get("slug");
    console.log("Rankings Slug:"+this.slug);
    this.getCategory(this.slug);
        loading.dismiss();

    //console.log(this.favoriteProvider.getAllFavoritePlayers());
    
    
  }

  ionViewWillEnter() {  

  }

   SearchPlayers(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.ranking = this.rankingArray.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
   initializeItems() {
    this.ranking = this.rankingArray;
  }
  openBrowser(){
	  	
	  	let target = "_system";	  	
    	this.iab.create(this.fb_live_url,target,this.options);
	}
  getCategory(cat){
    switch (cat)
    {
      case "rankings_men": 
          this.getRanking("men");
          this.categoryName = "Men";
          break;
      case "rankings_women": 
          this.getRanking("women");
          this.categoryName = "Women";
          break;
      case "rankings_senior": 
          this.getRanking("senior");
          this.categoryName = "Senior";
          break;
      case "rankings_junior": 
          this.getRanking("junior");
          this.categoryName = "Junior";
          break;
      case "rankings_team": 
          this.getRanking("team");
          this.categoryName = "Team";
          break;     
      case "rankings": 
          this.getRanking("");
          this.categoryName = "General";
          break;                                   
      default:
          this.getRanking(""); 
          break;
    }
  }

 


  getRanking(cat){
	  
	  if(cat!=""){
		  
		  this.http.get(this.global.url+"/rankings/read_one.php?id_torneo="+this.global.id_torneo+"&categoria="+cat)
      .subscribe((res: any) => {
        this.ranking = res.records;
        this.rankingArray = res.records;
         
        //console.log(this.ranking);
        this.rondas=this.ranking[0].scores;
        
        //console.log(this.ranking[0].num_rondas); 
        //console.log(this.ranking.scores);
         //Arreglo lo del video
      
		for (var _i = 0; _i < this.ranking.length; _i++){
			
			//console.log(this.ranking[_i]);
			
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
					//console.log(isFav);
		    	});
	     }//End for
          
          console.log(this.isFavorite);
          
    }, error => {
      console.log(error);
    }) 
		  
	  }else{ //Todos los resultados
		  
		  this.http.get(this.global.url+"/rankings/read.php?id_torneo="+this.global.id_torneo)
      .subscribe((res: any) => {
        this.ranking = res.records;
        this.rankingArray = res.records;
        //console.log(this.ranking); 
        
        this.rondas=this.ranking[0].scores;
        
        //console.log(this.ranking[0].num_rondas); 
        //console.log(this.ranking.scores);
         //Arreglo lo del video
         
         for (var _i = 0; _i < this.ranking.length; _i++){
			    this.favoriteProvider.isFavorite(this.ranking[_i].player_id).then(isFav => {
					this.isFavorite.push(isFav);
		    	});
	     }//End for
      
		
          
    }, error => {
      console.log(error);
    }) 
		  
		  } //IF
	  
    
  } // Get Ranking


 openCard(playerID){
    this.navCtrl.push(ScoreCardPage,{playerID});
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
          this.navCtrl.setRoot(RankingPage,{slug: 'rankings_men'});
          break;
      case 3: 
      console.log(id);
          this.navCtrl.setRoot(ScoresPage,{slug: ''});
          break;
      case 5: 
          this.openBrowser();
          break;
     
    }
}//Open Menu


favoritePlayer(player_id, index) {
    this.favoriteProvider.favoritePlayer(player_id).then(() => {
      this.isFavorite[index] = true;
    });
  } // Favorite
 
  unfavoritePlayer(player_id, index) {
    this.favoriteProvider.unfavoritePlayer(player_id).then(() => {
      this.isFavorite[index] = false;
    });
  }//Unfavorite

openMenuContextual() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Ranking',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Men Ranking',
          //role: 'destructive',
          //icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            //console.log('Delete clicked');
            this.navCtrl.setRoot(RankingPage,{slug: 'rankings_men'});
          }
        },
        {
          text: 'Women Ranking',
          //icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            //console.log('Share clicked');
            this.navCtrl.setRoot(RankingPage,{slug: 'rankings_women'});
          }
        },
        {
          text: 'Senior Ranking',
          //icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            this.navCtrl.setRoot(RankingPage,{slug: 'rankings_senior'});
          }
        },
        {
          text: 'Team',
          //icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            //console.log('Favorite clicked');
            this.navCtrl.setRoot(RankingTeamPage,{slug: 'rankings_team'});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          //icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  } //OpenMenu


}
