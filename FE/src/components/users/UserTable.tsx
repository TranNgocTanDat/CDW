import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { UserResponse } from "@/model/User";

type Props = {
  users: UserResponse[];
  onEdit: (user: UserResponse) => void; // Hàm gọi lại khi chỉnh sửa người dùng
  onDelete: (user: UserResponse) => void; // Hàm gọi lại khi xóa người dùng
};

export const UserTable = ({ users, onEdit, onDelete }: Props) => {
  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            const key = user.id || `${user.username}-${index}`;
            return (
              <TableRow key={key}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button size="sm" onClick={() => onEdit(user)}>
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(user)}
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
