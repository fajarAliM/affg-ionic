import {Component, Input} from '@angular/core';

@Component({
  selector: 'one-of-two',
  templateUrl: 'one-of-two.html'
})
export class OneOfTwoComponent  {

    @Input() selected: number;
    @Input() options: string[];


  constructor() {
  }
  
  
  changeSelected(){
	  
	  if(this.selected==1){
		  this.selected=2;
		  
	  }else{
		  this.selected=1;
	  }
	  
  }
  
}
