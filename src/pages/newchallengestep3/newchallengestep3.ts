import { Component } from '@angular/core';
import { NavController, NavParams, Toast,ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';
//import {EmailValidators} from 'ng2-validators';
import { HomePage } from "../home/home";
import {NewChallengeStep2Page} from "../newchallengestep2/newchallengestep2";
import {NewChallengeStep4Page} from "../newchallengestep4/newchallengestep4";
import { Challenge} from '../../models/challenge';
import { GolfPage } from '../golf/golf';


@Component({
    selector: 'newchallengestep3-page', 
    templateUrl: 'newchallengestep3.html'
})

export class NewChallengeStep3Page {
	
	public page = 1;
	public perPage = 10;
	
	userData:any;
	submitAttempt1: boolean = false;
	profileForm:any;
	tipo_challenge:any;
	public golfs:Array<any> = [];
	public challenge: Challenge;
	public selectedGolf:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController, public toastCtrl: ToastController ) {
  	
  	//El challenge nos viene de antes
  	this.challenge=this.navParams.data.challenge;

  	this.userData=this.global.getPlayerData();
  	
  	this.selectedGolf="";
  	
  	
  } 
  
  
  
  ionViewWillEnter() { this.getGolfs(); }
  
  /**** Funciones CUSTOM ****/
  
   getGolfs(){
  	
  	const headers = new HttpHeaders({
	  'Content-Type': 'application/json;',
	  'X-Auth-Token': this.global.token
	});
  	
    //this.http.get(this.global.url+"/clubs/2019", {headers}).subscribe((resp:any) => {
	    //this.http.get(this.global.urlApiLocal+"/getGolfs.php?file=true&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    this.http.get(this.global.urlApiLocal+"/getData.php?e=golfs&l="+this.perPage+"&p="+this.page+"&token="+encodeURIComponent(this.global.token)).subscribe((resp:any) => {
	    //this.http.get(this.global.url+"/golfs/1/150", {headers}).subscribe((resp:any) => {
		    let myresp=resp.json();
	    console.log(myresp.length);
	    for(let i=0; i<myresp.length; i++) {
             this.golfs.push(myresp[i]);
           }
	    
      console.log(this.golfs);
      //this.golfs=resp;
      //console.log(this.golfs);
    });  
  }

  
  changeSelectedGolf(g){
	  
	  console.log(g);
	  
	  this.selectedGolf=g.Name;
	  
	  this.challenge.course_name=g.Name;
	  this.challenge.course_image="https://www.footgolf-france.fr/media/cache/golf/"+g.GolfPhotos[0].Slug;
	  this.challenge.holes=g.NbTrous;
	  this.challenge.course_par=g.Pars;
	  this.challenge.course_long=g.NameParcours;
	  this.challenge.course_lat=g.NbParcours;

	  //this.challenge.course_image=g.Name;
  }
  
  openGolf(id){
	  //console.log(id);
  	this.navCtrl.push(GolfPage,{infoGolf: id});
  }
  

  
  
  saveAndNext(){
	  
	  console.log(this.challenge);
	  
	  //console.log(angular.element('#publico').val());
	  if(this.challenge.course_name=="" || this.challenge.course_name==undefined){
		  
		  //Toast para que seleccione campo
		  
		  const toast = this.toastCtrl.create({
		      message: 'Please select a Golf Course to play the Challenge',
		      duration: 3000
		    });
		    toast.present();
		  
		  
	  }else{
		  //this.navCtrl.push(NewChallengeStep4Page, {challenge: this.challenge}); 
		  	this.navCtrl.push(NewChallengeStep4Page, {challenge: this.challenge});
			
	  }

  }
  
   doInfinite(infiniteScroll) {
		  this.page = this.page+1;

	
	if(this.page!=0){
		
		setTimeout(() => {
		    
		    this.getGolfs();
		
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		  }, 500);
		}
		
	}
  
  
  
   openPage(page) {
	    switch (page){
			default:
	          this.navCtrl.setRoot(page.component); 
	        break;
	    }
  	}
  	
  
  	
  	


	    
}
