import { Timestamp } from "rxjs"

export class review{
    userid?:number
    movieid?:number
    title?:string
    description?:string
    rating?:number
    likes?:number
    created_at?:Timestamp<any>

    constructor(userid?:number,movieid?:number,titlle?:string,description?:string,rating?:number,likes?:number,created_at?:Timestamp<any>){
        this.userid=userid
        this.movieid=movieid
        this.description=description
        this.title=titlle
        this.rating=rating
        this.likes=likes
        this.created_at=created_at
    }

}