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
import { NewChallengeStep2Page } from "../newchallengestep2/newchallengestep2";



@Component({
    selector: 'page-newchallenge', 
    templateUrl: 'newchallenge.html'
})

export class NewChallengePage {
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
  
  
  
  openPage(page, parametros) {
    
  this.navCtrl.push(NewChallengeStep2Page, parametros);
  
    }
  
  
}
