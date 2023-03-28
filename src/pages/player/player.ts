import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PlayerScorePage } from '../player-score/player-score';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";


@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  public player:any;
    public resultados : Array<any> = [];	
    public datos_jugador : Array<any> = [];
	public playerId:any;
  private profile:any;
  constructor( public http: HttpClient,public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  	this.player = "matches";
  	console.log(this.navParams);
  	this.playerId = this.navParams.data.player;
  	
    
    this.getPlayerData();
    
  }

  /*getPlayerScore(id){
    this.http.get("http://admin.fgranks.com/api/player/read_one.php?id_torneo="+this.global.id_torneo+"&id="+id)
      .subscribe((res: any) => {
        console.log(res);
        this.profile.scores = res.resultados;
    }, error => {
      console.log(error);
    }) 
  }*/
  
  
  getPlayerData(){
	 this.http.get("http://localhost/AFFGApp/API/getPlayer.php?id="+this.playerId+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	      //console.log("partjghj");
        this.datos_jugador=JSON.parse(resp);
        //this.resultados = res.records;   
        //this.datos_jugador=this.resultados[0];
        console.log("esto si que se hace");
        console.log(this.datos_jugador);
    }, error => {
      console.log(error);
    }); 
  }
  
  getPlayerScore(id){
	    this.http.get("http://localhost/AFFGApp/API/getClub.php?id="+id+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	      //console.log("partjghj");
        this.datos_jugador=JSON.parse(resp);
        //this.resultados = res.records;   
        //this.datos_jugador=this.resultados[0];
        console.log(this.datos_jugador);
    }, error => {
      //console.log(error);
    }) 
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

  playerScore(player,score){
    this.navCtrl.push(PlayerScorePage,{ player, index: score});
  }

}