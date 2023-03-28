export class Challenge {
    public id: number;
    public date: string;
    public time: string;
    public course_name: string;
    public course_image: string;
    public course_par: number;
    public course_long: string;
    public course_lat: string;
    public type: string;
    public points: number;
    public holes: number;
    public id_creator: number;
    public publico: Boolean;
    public spots: number;
    public selectedPlayers:Array<any> = [];

    constructor(fields?: any) {
        if (fields) {
	        this.id= fields.id;
		    this.date= fields.date;
		    this.time= fields.time;
		    this.course_name= fields.course_name;
		    this.course_image= fields.course_image;
		    this.type= fields.type;
		    this.points= fields.points;
		    this.holes= fields.holes;
		    this.id_creator= fields.id_creator;
		    this.publico= fields.publico;
		    this.spots= fields.spots;
		    this.course_par= fields.course_par;
		    this.course_long= fields.course_long;
		    this.course_lat= fields.course_lat;
	        this.selectedPlayers= fields.selectedPlayers;
        }
    }
    
    setId(id){
	    this.id=id;
    }
    
    setDate(value){
	    this.date=value;
    }
    

}