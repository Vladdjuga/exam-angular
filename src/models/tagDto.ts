import { ProductDto } from "./productDto";

export class tagDto { 
    id: number;
    name: string;
    product: ProductDto; 
    constructor(){
        this.id = 0;
        this.name = "";
        this.product = new ProductDto();
    }
}