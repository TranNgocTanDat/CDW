import type { APIResponse } from "@/model/APIResponse";
import type { KeyResponse } from "@/model/Key";
import api from "./api";

export default {
    // Lấy tất cả key (chỉ ADMIN được quyền gọi)
    getAllKeys: async (): Promise<KeyResponse[]> => {
        const response = await api.get<APIResponse<KeyResponse[]>>("/keys");
        return response.result;
    },

    // Lấy danh sách key của người dùng hiện tại (đề xuất backend có endpoint /keys/user/me)
    getUserKeys: async (userId: number): Promise<KeyResponse[]> => {
        const response = await api.get<APIResponse<KeyResponse[]>>(`/keys/user/${userId}`);
        return response.result;
    },


    checkGameKey: async (key: string): Promise<boolean> => {
        const encodedKey = encodeURIComponent(key);
        const response = await api.get<boolean>(`/keys/check?key=${encodedKey}`);
        console.log("API response in checkGameKey:", response);
        return response; // Trả về luôn response (true hoặc false)
    },
};
