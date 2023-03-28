import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Toast,ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { PlayerPage } from '../player/player';
import { ChallengesPage } from '../challenges/challenges';
import { Challenge} from '../../models/challenge';
declare var bodymovin: any


@Component({
  selector: 'page-signupcomplete',
  templateUrl: 'signupcomplete.html',
})
export class SignUpCompletePage {
  
 	public playerData: any;
 	
  
  
  constructor(public global: GlobalProvider, public http: HttpClient, public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  	
  	//Recibimos el challenge del paso anterior
  	this.playerData=this.navParams.data.player;
  	
  	console.log(this.playerData);
  	
  	let parameteres = {
            page: 'player',
            playerData: this.playerData

	    };
	    
			this.http.post(this.global.urlApiLocal+"/savePlayer.php", parameteres).subscribe((resp) => {
			    let data:any = resp;
				
				

			    if(data.status==1){ 
			     	//this.muestra_alert("titulo","texto1");
			    	//this.navCtrl.setRoot(HomePage); 
			    	this.global.setPlayerData(data.player[0]);
			    }else{
					if(data.status==2){ //el user existe
						
						
						
					}else{ //nada existe
						
					}
			    } 
			}); 
		
  	
  	
  	//this.getPlayers();
  }

  ionViewWillEnter() { 
   
  }
  
  ionViewDidEnter(){
	  
	  bodymovin.loadAnimation({
             container: document.getElementById('lottie'), // Required
             path: 'assets/animations/newAccount.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: true, // Optional
            //                    name: "Hello World", // Name for future reference. Optional.
        });
	  
  }
  
    
  saveAndNext(){
	  
	  this.navCtrl.setRoot(ChallengesPage);
	  
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
  
    
  
}
