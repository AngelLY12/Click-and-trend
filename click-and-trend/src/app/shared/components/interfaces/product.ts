import { Image } from "./Image";

export interface Product {
    gender?: string;
    category?: string;
    subCategory?: string;
    title?: string;
    cost?: number;
    desc?: string;
    image?: Image;
    quantity?: number;

}

export interface ProductItemCart {
  product: Product;
  quantity: number;
}

