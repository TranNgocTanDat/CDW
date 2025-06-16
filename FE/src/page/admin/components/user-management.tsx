"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, Filter } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserCreationRequest, UserResponse } from "@/model/User";
import userApi from "@/services/userApi";
import { AddUserModal } from "@/components/users/AddUserModal";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const queryClient = useQueryClient();

  const {
    data: users
  } = useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: userApi.getUsers,
    refetchOnWindowFocus: false,
  });

  const addUserMutation = useMutation({
    mutationFn: userApi.addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("Thêm người dùng thành công");
    },
  });

  const filteredUsers = (users ?? []).filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUser = async (data: UserCreationRequest) => {
    const userToSave = {
      ...data,
      lastName: data.lastName || "",
      dob: data.dob || "",
      password: data.password || "12341234",
    };

    addUserMutation.mutate(userToSave);
  };

  const handleDeleteUser = (user: UserResponse) => {
    userApi
      .deleteUser(user.id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        console.log("Xoá người dùng thành công");
      })
      .catch((error) => {
        console.error("Lỗi xoá người dùng:", error);
      });
  };

  return (
    <div className="space-y-6 mx-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản người dùng và phân quyền
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <AddUserModal
        open={open}
        onClose={() => {
          setOpen(false);
          setUserEditing(null);
        }}
        onSave={handleSaveUser}
        user={userEditing}
      />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý tất cả tài khoản người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Bộ lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Họ</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.username
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{user.firstName}</TableCell>
                  <TableCell className="text-sm">{user.lastName}</TableCell>
                  <TableCell className="text-sm font-medium"></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user)}
                        >
                          Xoá
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem className={user.status === "active" ? "text-red-600" : "text-green-600"}>
                          {user.status === "active" ? "Suspend User" : "Activate User"}
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
