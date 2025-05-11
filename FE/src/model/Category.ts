import type { Product } from "./Product";

export interface Category {
  cate_ID: number;
  name: string;
  description: string;
  productList: Product[];  // Mảng chứa các sản phẩm thuộc category này
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