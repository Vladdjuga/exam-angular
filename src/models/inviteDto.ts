import { FriendDto } from "./accountDtos";

export class InviteDto { 
    id: number;
    friend1: FriendDto;
    friend2: FriendDto;
    constructor(){
        this.id = 0;
        this.friend1 = new FriendDto();
        this.friend2 = new FriendDto();
    }
}
