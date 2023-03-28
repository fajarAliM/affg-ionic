export class User {
    /*public name: string;
    public surname: string;
    public email: string;
    public city: string;
    public id: number;
    public username: string;
    public points: number;
    public LicenceId: number;

    constructor(fields?: any) {
        if (fields) {
            this.name = fields.name;
            this.id = fields.id;
            this.surname = fields.surname;
            this.email = fields.email;
            this.city = fields.city;
            this.username = fields.username;
            this.points = fields.points;
            this.LicenceId = fields.LicenceId;
        }
    }*/
    
    
    /******
	    Con datos de la AFFG
	    *****/
	public name: string;
    public surname: string;
    public email: string;
    public city: string;
    public id: number;
    public username: string;
    public points: number;
    public LicenceId: number;
    public Photo: any;

    constructor(fields?: any) {
        if (fields) {
            this.name = fields.FirstName;
            this.id = 1;
            this.surname = fields.LastName;
            this.email = fields.Mail;
            this.city = fields.Locality;
            this.username = fields.username;
            this.points = 0;
            this.LicenceId = fields.Id;
            this.Photo = fields.Photo;
        }
    }
    

}