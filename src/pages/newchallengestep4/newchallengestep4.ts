import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Toast,ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { NewChallengeStep5Page } from '../newchallengestep5/newchallengestep5';
import { Challenge} from '../../models/challenge';



@Component({
  selector: 'page-newchallengestep4',
  templateUrl: 'newchallengestep4.html',
})
export class NewChallengeStep4Page {
  
 	public challenge: Challenge;
 	
 	public selectedPlayers:Array<any> = [];
 	public allPlayers:Array<any> = [];
 	
 	
 	public page = 1;
	public perPage = 10;
	
	public clubSwitch: string = "allplayers";
  
  
  constructor(public global: GlobalProvider, public http: HttpClient, public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  	
  	//Recibimos el challenge del paso anterior
  	this.challenge=this.navParams.data.challenge;
  	
  	this.getPlayers();
  }

  ionViewWillEnter() { 
   
  }


  openPlayer(player){
    this.navCtrl.push(PlayerPage,{player:player});
  }

  addPlayer(p){
	  
	  
	  var found = this.selectedPlayers.find(function(element) {
		  return element.Id == p.Id;
		});
		
		var found2 = this.allPlayers.findIndex(function(element) {
		  return element.Id == p.Id;
		});
		
		if(found){
			 const toast = this.toastCtrl.create({
		      message: 'Player already in the list of players to be invited',
		      duration: 3000
		    });
		    toast.present();
		}else{
			this.allPlayers[found2].isActive = !p.isActive;
			this.selectedPlayers.push(p);
			const toast = this.toastCtrl.create({
		      message: 'Player '+p.LastName +' '+ p.FirstName+' added to the list of players to be invited',
		      duration: 3000
		    });
		    toast.present();
		}
 
  }
  
  deletePlayer(p){
	  
	  
	  var found = this.selectedPlayers.findIndex(function(element) {
		  return element.Id == p.Id;
		});
		
		this.selectedPlayers.splice(found,1);
		
		const toast = this.toastCtrl.create({
		      message: 'Player '+p.LastName +' '+ p.FirstName+' removed from the list of players to be invited',
		      duration: 3000
		    });
		    toast.present();
		
		//console.log(found);
		
		/*if(found){
			 const toast = this.toastCtrl.create({
		      message: 'Player already in the list of players to be invited',
		      duration: 3000
		    });
		    toast.present();
		}else{
			this.selectedPlayers.push(p);
		}*/
 
  }
  
  
  
  getPlayers(){
  		  	
    //this.http.get(this.global.urlApiLocal+"/getPlayers.php?file=true&id="+this.teamInfo.Id+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => { 
    //licences/{club_id}/{year}
	this.http.get(this.global.urlApiLocal+"/getData.php?e="+encodeURIComponent("licences/1/"+this.global.season)+"&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {

    //this.http.get(this.global.url+"/licences/"+this.teamId+"/"+this.global.anyo+"").subscribe((resp:any) => {
      
      let myresp=resp;
	 
	    for(let i=0; i<myresp.length; i++) {
		    myresp[i].isActive=false;
             this.allPlayers.push(myresp[i]);
           }
      
    }); 
  }
  
  saveAndNext(){
	  
	  this.challenge.selectedPlayers=this.selectedPlayers;
	  
	  this.navCtrl.setRoot(NewChallengeStep5Page, {challenge: this.challenge});
	  
	  //console.log(this.challenge);
	  
	  //console.log(angular.element('#publico').val());
	  /*if(this.challenge.course_name=="" || this.challenge.course_name==undefined){
		  
		  //Toast para que seleccione campo
		  
		  const toast = this.toastCtrl.create({
		      message: 'Please select a Golf Course to play the Challenge',
		      duration: 3000
		    });
		    toast.present();
		  
		  
	  }else{
		  //this.navCtrl.push(NewChallengeStep4Page, {challenge: this.challenge}); 
		  	this.navCtrl.push(NewChallengeStep4Page, {challenge: this.challenge});
			
	  }*/

  }
  
  
    doInfinite(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getPlayers();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}
  
  
  
}
