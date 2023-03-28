import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import {EmailValidators} from 'ng2-validators';
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { RecoverPasswordPage } from "../recover-password/recover-password";
import { RegisterPage } from "../register/register";

/******* Estas hay que quitarlas *********/
import { ProfilePage } from "../profile/profile";




@Component({
    selector: 'page-newteam', 
    templateUrl: 'newteam.html'
})

export class NewTeamPage {
	submitAttempt1: boolean = false;
	submitAttempt2: boolean = false;
  formLogin:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public global: GlobalProvider, public alertCtrl: AlertController) {

  	this.formLogin = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.required)
        });
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
  
  doLogin(){
  		let parameteres = {
            page: 'login',
            usuario: this.formLogin.value.email,
            password: this.formLogin.value.password, 

	    };
	    if(this.formLogin.value.email=="" || this.formLogin.value.password==""){
    		this.submitAttempt1 = true; 
    		this.submitAttempt2 = true;
		}else{
			this.http.post(this.global.url, parameteres).subscribe((resp) => {
			    let data = resp.json();


			    if(data.data.ok=="true"){ 
			     	//this.muestra_alert("titulo","texto1");
			    	this.navCtrl.setRoot(HomePage); 
			    }else{
					if(data.data.ok=="false1"){ //el user existe
						this.submitAttempt1 = true; 
						//this.muestra_alert("titulo","texto2");
					}else{ //nada existe
						this.submitAttempt2 = true;
						//this.muestra_alert("titulo","texto3");
					}
			    } 
			}); 
		}

  }
  
  openPage(page) {
    

    switch (page)
    {
      case "recover-password":
          this.navCtrl.setRoot(RecoverPasswordPage); 
          //console.log("results");
          //console.log(slug);
          break;
       case "register":
          this.navCtrl.setRoot(RegisterPage); 
          //console.log("results");
          //console.log(slug);
          break;
       case "profile":
          this.navCtrl.setRoot(ProfilePage); 
          //console.log("results");
          //console.log(slug);
          break;
                                     
      default:
          this.navCtrl.setRoot(page.component); 
          break;
    }
  }
  
  
}
