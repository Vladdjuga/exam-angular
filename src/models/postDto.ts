import { ProfileDto } from './accountDtos';

export class PostDto { 
    id: number;
    text: string;
    image: string;
    date=new Date();
    user=new ProfileDto();
    constructor(){
        this.id = 0;
        this.text = "";
        this.image = "";
    }
}
