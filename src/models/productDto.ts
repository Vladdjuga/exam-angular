import { categoryDto } from "./categoryDto";
import { tagDto } from "./tagDto";

export class ProductDto { 
    id: number;
    name: string;
    price: number;
    image: string;
    category: categoryDto;
    constructor(){
        this.id = 0;
        this.name = "";
        this.price = 0;
        this.image = "";
        this.category = new categoryDto();


        
    }
}

