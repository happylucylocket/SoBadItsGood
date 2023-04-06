
export class review{
    date?:string
    title?:string = ""
    description?:string =""
    movieid?:number = 0
    rating?:number 
    username?:string
    likes?:number
    constructor(username?:string,title?:string,description?:string,movieid?:number,rating?:number,date?:string, likes?:number){
        this.date = date
        this.title = title
        this.description= description
        this.movieid= movieid
        this.rating=rating
        this.username=username
        this.likes = likes 
    }
  }
