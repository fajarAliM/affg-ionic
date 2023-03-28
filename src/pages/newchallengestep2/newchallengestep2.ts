import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import {EmailValidators} from 'ng2-validators';
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import {NewChallengeStep3Page} from "../newchallengestep3/newchallengestep3";
import { Challenge} from '../../models/challenge';


@Component({
    selector: 'newchallengestep2-page', 
    templateUrl: 'newchallengestep2.html'
})

export class NewChallengeStep2Page {
	userData:any;
	submitAttempt1: boolean = false;
	profileForm:any;
	tipo_challenge:any;
	currentYear:any;
	
	public challenge: Challenge;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl: ToastController ) {
  	
  	this.tipo_challenge=this.navParams.data.tipo;
  	
	
	this.profileForm = new FormGroup({
	  		date: new FormControl('', [Validators.required]),
	  		time: new FormControl('', [Validators.required]),
	  		points: new FormControl('', [Validators.required]),
            spots: new FormControl('', [Validators.required]),
            publico: new FormControl('')
        });
	
  	
  	this.challenge=new Challenge();
  	this.challenge.publico=true;
  	this.userData=this.global.getPlayerData();
  	//console.log(this.userData);
  		
  	
  	this.currentYear=new Date().getFullYear();
  	
  
  	
  } 
  ionViewWillEnter() {  
    //this.getData(); 
  }
  muestra_alert(titulo,texto){
    const alert = this.alertCtrl.create({
      title: titulo, 
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }
  
  
  
  saveAndNext(){
	  
	  //console.log(angular.element('#publico').val());
	  if(this.profileForm.status=="INVALID"){
		  this.submitAttempt1 = true;
	  }else{
		  
		  if(this.profileForm.value.points > this.userData.points){
			  let toast = this.toastCtrl.create({
			      message: 'You cannot bet more points that you currently have. You have '+this.userData.points+" points",
			      duration: 5000
			    });
			    toast.present();
		  }else{
		  
		  console.log(this.profileForm.value);
		  
		  if(this.profileForm.value.publico==""){
			  this.challenge.publico=true;
		  }else{
			  this.challenge.publico=this.profileForm.value.publico;
		  }
		  
		  this.challenge.date=this.profileForm.value.date;
		  this.challenge.time=this.profileForm.value.time;
		  this.challenge.points=this.profileForm.value.points;
		  this.challenge.spots=this.profileForm.value.spots;
		  
		  //Mando a la siguiente página
		  this.navCtrl.push(NewChallengeStep3Page, {challenge: this.challenge});
		  
		  }
		  
	  }
	  
	  
	  
	  
	  //TODO: Validar lo que toque
	  
	  //this.challenge.setDate();
  		

  }
  
  
  
  
   openPage(page) {
    

    switch (page)
    {


                                     
      default:
          this.navCtrl.setRoot(page.component); 
          break;
    }
  }


	    
}
