import { FriendDto } from "./accountDtos";
import { MessageDto } from "./messageDto";

export class ChatDto { 
    id: number;
    user1: FriendDto=new FriendDto();
    user2: FriendDto=new FriendDto();
    messages: Array<MessageDto>=[];
    constructor(){
        this.id = 0;
    }
}
