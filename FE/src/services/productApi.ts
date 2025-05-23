import api from "./api";
import type { APIResponse } from "@/model/APIResponse";
import type { Product } from "@/model/Product";

const productApi = {
    // Lấy danh sách sản phẩm theo category ID
    getProductsByCategory: async (categoryId: string | number): Promise<Product[]> => {
        const response = await api.get<APIResponse<Product[]>>(`/products/category/${categoryId}`);
        return response.result;
    },

    // Nếu cần, có thể thêm nhiều hàm API khác như getProductById, createProduct,...
};

export default productApi;