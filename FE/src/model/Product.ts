// src/model/Product.ts

import type { Category } from "./Category";

export interface Product {
  productId: number;
  category: Category;  // Tham chiếu đến Category
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
}

export interface ProductRequest {
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
  cate_ID: number;  // ID của Category mà sản phẩm thuộc về
}

export interface ProductResponse {
  productId: number;
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
}
