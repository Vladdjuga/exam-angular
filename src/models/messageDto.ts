import { FriendDto } from "./accountDtos";

export class MessageDto { 
    id: string;
    text: string;
    file: string;
    user: FriendDto=new FriendDto();
    date: Date=new Date();
    constructor(){
        this.id = "";
        this.text = "";
        this.file = "";
    }
}
