export class InviteDto { 
    id: number;
    user1: string;
    user2: string;
    constructor(){
        this.id = 0;
        this.user1 = "";
        this.user2 = "";
    }
}
