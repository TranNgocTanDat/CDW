import { useState } from "react";
import { UserTable } from "@/components/users/UserTable";
import { AddUserModal } from "@/components/users/AddUserModal";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/services/userApi";
import type { UserCreationRequest, UserResponse, UserUpdateRequest } from "@/model/User";

export const UserComponent = () => {
  const [open, setOpen] = useState(false);
  const [userEditing, setUserEditing] = useState<UserResponse | null>(null);
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: userApi.getUsers,
    refetchOnWindowFocus: false,
  });

  const addUserMutation = useMutation({
    mutationFn: userApi.addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User added successfully");
    },
  });

  const updateUserMutation = useMutation<
    UserResponse,
    Error,
    [string, UserUpdateRequest]
  >({
    mutationFn: ([id, user]) => userApi.updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User updated successfully");
    },
  });

  const handleSaveUser = async (data: UserCreationRequest, id?: string) => {
    const userToSave = {
      ...data,
      lastName: data.lastName || "",
      dob: data.dob || "",
      password: data.password || "12341234",
    };

    if (id) {
      // Khi gọi mutate, truyền vào mảng [id, user]
      updateUserMutation.mutate([id, userToSave]);
    } else {
      addUserMutation.mutate(userToSave);
    }
  };

  // Xóa người dùng
  const handleDeleteUser = (user: UserResponse) => {
    userApi
      .deleteUser(user.id)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      <Button className="mb-4" onClick={() => setOpen(true)}>
        Thêm người dùng
      </Button>

      <UserTable
        users={users || []}
        onEdit={(user) => {
          setUserEditing(user);
          setOpen(true);
        }}
        onDelete={handleDeleteUser}
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
};
