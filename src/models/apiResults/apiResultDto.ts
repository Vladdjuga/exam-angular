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

export class ResultLoginDto extends ResultDto{
    token:string='';
}
