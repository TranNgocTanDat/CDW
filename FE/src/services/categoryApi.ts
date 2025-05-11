import type { APIResponse } from "@/model/APIResponse";
import type { Category } from "@/model/Category";
import api from "./api";

export default {
    getCategories: async () => {
        const response = await api.get<APIResponse<Category[]>>("/categories");
        return response.result;
    },

    getCategoryById: async (id: number) => {
        const response = await api.get<APIResponse<Category>>(`/categories/${id}`);
        return response.result;
    },
}