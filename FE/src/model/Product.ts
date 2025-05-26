export interface Product {
  productId: number;  // đổi từ product_ID thành productId
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
  cate_ID: number;  // giữ nguyên nếu backend yêu cầu
}

export interface ProductResponse {
  productId: number;  // đổi từ product_ID thành productId
  category: Category;
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
}
