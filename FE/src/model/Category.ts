import type { Product } from "./Product";

export interface Category {
  cate_ID: number;
  name: string;
  description: string;
  productList: Product[]; 
}

export interface CategoryRequest {
    name: string;
    description: string;
  }

export interface CategoryResponse {
  cate_ID: number;
  name: string;
  description: string;
  productList: Product[];
}