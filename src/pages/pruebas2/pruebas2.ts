import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';



@Component({
  selector: 'page-pruebas2',
  templateUrl: 'pruebas2.html',
})
export class Pruebas2Page {

  public items : Array<any> = [];
  public simplevar = "";
  public test = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pruebas2Page');
  }
 
  azAlgo(){
//${this.urlBase}

    let parameters = {
            test: 2,
            clave: 3,
    };
    this.http.post("http://localhost/golftabApp/api/test.php", parameters).subscribe((resp) => {
       let data = resp.json();
       this.muestra_alert("eltitulo",data.data.msg); 

       this.recorre(data.recorrido); 
       this.simplevar=data.data;
    });

    this.http.post("http://localhost/golftabApp/api/test.php", parameters).subscribe((resp) => {
       let data = resp.json();
       ; 

       ; 
       this.test=data.data;
    });


  	
  }
  recorre(rec){
    this.items = rec;
  }

  muestra_alert(titulo,texto){
  	const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }

}
//pal html uso de globales
//<h1>{{ global.myGlobalVar }} </h1>
