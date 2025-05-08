import { useEffect, useState } from "react";
import { UserTable } from "@/components/users/UserTable";
import { AddUserModal } from "@/components/users/AddUserModal";
import { Button } from "@/components/ui/button";
import type UserResponse from "./model/UserResponse";
import type UserCreationRequest from "./model/UserCreationRequest";
import userApi from "./services/userApi";

export default function App() {
  // const [users, setUsers] = useState<UserResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [userEditing, setUserEditing] = useState<UserResponse | null>(null);
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getUsers(); // Lấy danh sách người dùng từ API
          setUsers(response); // Lấy mảng người dùng từ 'result'
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleSaveUser = async (data: UserCreationRequest, id?: string) => {
    try {
      const userToSave = {
        ...data,
        lastName: data.lastName || "",
        dob: data.dob || "",
        password: data.password || "12341234",
      };

      if (id) {
        // UPDATE
        await userApi.updateUser(id, userToSave);
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, ...userToSave, id } : u))
        );
      } else {
        // CREATE
        const response = await userApi.addUser(userToSave);
        if (!response.id) return;
        setUsers((prev) => [...prev, response]);
      }
    } catch (error: any) {
      console.error("Lỗi khi lưu người dùng:", error.message);
      if (error.response) {
        console.error("Chi tiết lỗi:", error.response.data);
      }
    }

    const handleDeleteUser = async (user: UserResponse) => {
      try {
        await userApi.deleteUser(user.id);
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      <Button className="mb-4" onClick={() => setOpen(true)}>
        Thêm người dùng
      </Button>

      <UserTable
        users={users}
        onEdit={(user) => {
          setUserEditing(user);
          setOpen(true);
        }}
        onDelete=(handleDeleteUser)
      />

      <AddUserModal
        open={open}
        onClose={() => {
          setOpen(false);
          setUserEditing(null);
        }}
        onSave={handleSaveUser}
        user={userEditing}
      />
    </div>
  );
}