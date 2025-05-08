import api from "./api";
import type UserResponse from "@/model/UserResponse";
import type UserCreationRequest from "@/model/UserCreationRequest";
import type UserUpdateRequest from "@/model/UserUpdateRequest";
import type { APIResponse } from "@/model/APIResponse";

export default  {
    // getUsers: () => api.get<APIResponse<UserResponse[]>>("/users"),
    // addUser: (user: UserCreationRequest) => api.post<UserResponse>("/users", user),
    // updateUser: (id: string, user: UserUpdateRequest) => api.put<UserResponse>(`/users/${id}`, user),
    
    getUsers: async (): Promise<UserResponse[]> => {
        const response = await api.get<APIResponse<UserResponse[]>>("/users");
        console.log(response)
        return response.data.result; // Trả về mảng người dùng từ `result`
      },
    
      addUser: async (user: UserCreationRequest): Promise<UserResponse> => {
        const response = await api.post<APIResponse<UserResponse>>("/users", user);
        console.log(response)
        return response.data.result; // Trả về người dùng đã được tạo
      },
    
      updateUser: async (id: string, user: UserUpdateRequest): Promise<UserResponse> => {
        const response = await api.put<APIResponse<UserResponse>>(`/users/${id}`, user);
        return response.data.result; // Trả về người dùng đã được cập nhật
      },

      deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
      }

}