import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";


@Component({
  selector: 'page-scorecard',
  templateUrl: 'scorecard.html',
})
export class ScoreCardPage {
  //public rankings:Array<any> = []; 
  public playerID:any;
  public infoPlayer:any;
  public rankings:Array<any> = [];
  //Parametros de la página
  public LicenceId:any;
  public pars:Array<any> = [];
  public diferencias:Array<any> = [];
  public totales:Array<any> = [];
  public primera_mitad:Array<any> = [];
  public segunda_mitad:Array<any> = [];
    public hoyos_fake : Array<any> = [];
    public rondas_jugadas:any;
    public infoTorneo:any;
    public paresCampo : Array<any> = [];

  public show:any;
  public resultSwitch: string = "ronda0";
  
  constructor(public viewCtrl:ViewController, public http: HttpClient, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
	  this.infoPlayer = this.navParams.get("infoPlayer");
	  this.infoTorneo = this.navParams.get("infoTorneo");
	  
	  console.log(this.infoPlayer);
	  
	  
	  //console.log(this.infoPlayer);
    this.playerID = this.infoPlayer.Id;
    if(this.infoPlayer.Pars==null){
	    this.rondas_jugadas=0;
    }else{
	    this.rondas_jugadas=this.infoPlayer.Pars.length;
    }
    
	
	for (var _i = 0; _i < this.rondas_jugadas; _i++){
		var mitotal=0;
		var mitotal2=0;
		
		for (var _j = 0; _j < 18; _j++){
			mitotal=mitotal+this.infoTorneo.Pars[_i][_j];
			mitotal2=mitotal2+this.infoPlayer.Pars[_i][_j];
			}
			
			this.paresCampo.push(mitotal);
			this.totales.push(mitotal2);
	  }
	  
	  console.log(this.paresCampo);
	  console.log(this.totales);
     
    
    //this.getScore(this.playerID);
    
    for (var _i = 0; _i < 18; _i++){
		   this.hoyos_fake.push("");   
	   }
   
   
    
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ScoreDetailPage');
  }

  /*getScore(id){
    this.http.get(this.global.url+"/rankings/read_individual.php?id_torneo="+this.global.id_torneo+"&id="+id)
      .subscribe((res: any) => {
        console.log(res);
        this.rankings = res.records;  
        
	        this.LicenceId=res.records[0].LicenceId;
			this.pars=res.records[0].pars;
			this.diferencias=res.records[0].diferencia;
			this.totales=res.records[0].scores;
			this.primera_mitad=res.records[0].primera_mitad;
			this.segunda_mitad=res.records[0].segunda_mitad;
			this.rondas_jugadas=res.records[0].pars.length;
    console.log("Las rondas que se han jugado son:"+this.rondas_jugadas);

		if(this.pars){
			this.show=true;
        }else{
	        
	        this.show=false;
	        
        }
        


        
        //console.log(this.rankings);
    }, error => {
      console.log(error);
    }) 
  }*/

  
}
