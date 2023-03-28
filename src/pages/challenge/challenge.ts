import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { ScoreCardPage } from '../scorecard/scorecard';
import {Challenge} from '../../models/challenge';


@Component({
  selector: 'page-challenge',
  templateUrl: 'challenge.html',
})
export class ChallengePage {
  private team:any;
  public teamId:any;
  public teamDBId:any;
  public challenge:Challenge;
  public places:string;
  private office1:any;
  private office2:any;
   private office3:any;
    private office4:any;
      private office5:any;
  private office6:any;
   private office7:any;
    private office8:any;
  public players:Array<any> = [];
  private director:any;
  private secretario:any;
  private tesorero:any;
  private director_id:any;
  private secretario_id:any;
  private tesorero_id:any;
    private director_p:any;
  private secretario_p:any;
  private tesorero_p:any;
  //private director1:any;

  public clubSwitch: string = "clubs";
  
  constructor(public global: GlobalProvider, public http: HttpClient, public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  	//this.team ="players";
  	this.challenge = this.navParams.data.challenge;
  	
  	console.log(this.challenge);
  	
  	/*this.director_id=this.teamInfo.Staffs.President.LicenceId;
	this.secretario_id=this.teamInfo.Staffs.Secretaire.LicenceId;
	this.tesorero_id=this.teamInfo.Staffs.Tresorier.LicenceId;*/
  	
  	//console.log(this.teamInfo);
  	//this.teamDBId = this.navParams.data.id_database;
  	//console.log(this.teamId);
  	//this.getTeam();
  	this.getPlayer();
  }

  ionViewWillEnter() { 
   
  }

openCard(playerID){
    this.navCtrl.push(ScoreCardPage,{playerID});
  }

  openPlayer(player){
    this.navCtrl.push(PlayerPage,{player:player});
  }

  /*getTeam(){
  	//console.log(this.teamId);

    //this.http.get(this.global.url+"/club/"+this.teamId+"/"+this.global.anyo+"").subscribe((resp:any) => {
	    
	    this.http.get("http://localhost/AFFGApp/API/getClub.php?id="+this.teamId+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
      
      this.teamInfo=JSON.parse(resp);
      console.log(this.teamInfo);
      
	  if(this.teamInfo.length){
		  
		  this.office1=this.teamInfo[0].Places.HeadOffice.Street;
	      this.office2=this.teamInfo[0].Places.HeadOffice.PostalCode + ", "+ this.teamInfo[0].Places.HeadOffice.Locality;
	      this.office3=this.teamInfo[0].Places.HeadOffice.OfficePhone;
	      this.office4=this.teamInfo[0].Places.HeadOffice.Mail;
	      this.office5=this.teamInfo[0].Places.Correspondance.Street ;
	      this.office6=this.teamInfo[0].Places.Correspondance.PostalCode + ", "+ this.teamInfo[0].Places.HeadOffice.Locality;
	      this.office7=this.teamInfo[0].Places.Correspondance.OfficePhone;
	      this.office8=this.teamInfo[0].Places.Correspondance.Mail;
	      
	      this.director_id=this.teamInfo[0].Staffs.President.LicenceId;
	      this.secretario_id=this.teamInfo[0].Staffs.Secretaire.LicenceId;
	      this.tesorero_id=this.teamInfo[0].Staffs.Tresorier.LicenceId;
		  
	  }

      
      //console.log(this.places);
      
      
     

    }); 
  }*/

  getPlayer(){
  		  	
    this.http.get(this.global.urlApiLocal+"/getChallengePlayers.php?&id="+this.challenge.id+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {

    //this.http.get(this.global.url+"/licences/"+this.teamId+"/"+this.global.anyo+"").subscribe((resp:any) => {
      
      for(let i=0; i<resp.players.length; i++) {
	      this.players.push(JSON.parse(resp.players[i]));
	      }
      
      //this.players=JSON.parse(resp.players);
      console.log(this.players);
      
            

      
    }); 
  }
  
  
  
}
