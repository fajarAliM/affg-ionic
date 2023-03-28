import { Component, Input } from '@angular/core';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'lineahoyo',
  templateUrl: 'lineahoyo.html'
})
export class LineahoyoComponent {

	@Input('jugadores') jugadores : Array<any> = [];  

	@Input('num_hoyo') num_hoyo : string;
	@Input('color') color : string;

  constructor(public global: GlobalProvider) {

  } 

}
