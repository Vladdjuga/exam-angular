export class ResultDto { 
    isSuccess: boolean;
    message: string;
    constructor(){
        this.isSuccess = true;
        this.message = "";
    }
}

export class ResultCollectionDto{
    data: Array<any>; 
    constructor(){
        this.data = [];
    }
}
