"use client";

import { useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search , UserPlus, Filter } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserCreationRequest, UserResponse } from "@/model/User";
import userApi from "@/services/userApi";
import { AddUserModal } from "@/components/users/AddUserModal";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [userEditing, setUserEditing] = useState<UserResponse | null>(null);

  const { data: users } = useQuery<UserResponse[]>({
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
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  

  return (
    <div className="space-y-6 mx-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
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
          <CardTitle>User Overview</CardTitle>
          <CardDescription>Search and manage all user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>FirstName</TableHead>
                <TableHead>LastName</TableHead>
                <TableHead>Orders</TableHead>
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
                          src={`http://localhost:8080/api${user?.avatarUrl}`}
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
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell> */}
                  {/* <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "suspended" ? "destructive" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-sm">{user.firstName}</TableCell>
                  <TableCell className="text-sm">{user.lastName}</TableCell>
                  <TableCell className="text-sm font-medium">
                    </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => (handleDeleteUser(user))}
                        >
                          Xóa
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
