export class user{
    fname?:string
    lname?:string
    username?:string
    email?:string
    password?:string
    userid?:number
    pic?:any
    constructor(id?:number,fname?:string,lname?:string,username?:string,email?:string,password?:string,pic?:any){
        this.fname=fname
        this.lname=lname
        this.username=username
        this.password=password
        this.email=email
        this.userid=id
        this.pic = pic
    }
}