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
import { LoginPage } from "../login/login";



@Component({
    selector: 'page-intro-challenges', 
    templateUrl: 'intro-challenges.html'
})

export class IntroChallengesPage {
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
  
  
  
  openPage(page) {
    

    switch (page)
    {
      case "login":
          this.navCtrl.setRoot(LoginPage); 
          //console.log("results");
          //console.log(slug);
          break;
       case "register":
          this.navCtrl.setRoot(RegisterPage); 
          //console.log("results");
          //console.log(slug);
          break;
                                     
      default:
          this.navCtrl.setRoot(page.component); 
          break;
    }
  }
  
  
}
