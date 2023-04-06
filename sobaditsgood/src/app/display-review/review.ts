
export class review{
    date?:string
    title?:string = ""
    description?:string =""
    movieid?:number = 0
    rating?:number =0
    username?:string
    likes?:number
    starReview?: boolean[] = [false,false,false,false,false];
    constructor(username?:string,title?:string,description?:string,movieid?:number,rating?:number,date?:string, likes?:number, starReview?:boolean[]){
        this.date = date
        this.title = title
        this.description= description
        this.movieid= movieid
        this.rating=rating
        this.username=username
        this.likes = likes 
        this.starReview = starReview
    }
  }
