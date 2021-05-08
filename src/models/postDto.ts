export class PostDto { 
    id: number;
    text: string;
    image: string;
    date=new Date();
    constructor(){
        this.id = 0;
        this.text = "";
        this.image = "";
    }
}
