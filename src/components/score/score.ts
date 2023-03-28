import { Component, Input } from '@angular/core';
import { GlobalProvider } from "../../providers/global/global";
import { MatchPage } from "../../pages/match/match";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'score',
  templateUrl: 'score.html'
})
export class ScoreComponent {

  @Input('campo') campo : string;
  @Input('jugando') jugando : string;
  @Input('hoyoactual') hoyoactual : string;
  @Input('equipos') equipos : Array<any> = [];  
  @Input('listadohoyos') listadohoyos : Array<any> = [];   
  @Input('grupo') grupo : string;  
  @Input('partido_id') partido_id : string;
  @Input('fecha_programado') fecha_programado : string; 

public equips : Array<any> = [];
  constructor(public global: GlobalProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

 
  }
   ngOnInit(){
    
  }
  ionViewWillEnter() {
      
  } 

  openMatch(id_match){
    //this.muestra_alert('titulo','texto:'+id_match);  
    let paramObj = { id_part: id_match };
    this.navCtrl.push(MatchPage,paramObj); 
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
