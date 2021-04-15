export class ResultDto { 
    isSuccess: boolean;
    message: string;
    constructor(){
        this.isSuccess = true;
        this.message = "";
    }
}

export class ResultCollectionDto extends ResultDto{
    data: Array<any>=[]; 
}
