import { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type UserCreationRequest from "@/model/UserCreationRequest"
import type UserResponse from "@/model/UserResponse"

type Props = {
  open: boolean
  onClose: () => void
  onSave: (user: UserCreationRequest, id?: string) => void
  user?: UserResponse | null
}

export function AddUserModal({ open, onClose, onSave, user }: Props) {
  const [username, setName] = useState("")
  const [firstName, setFirstName] = useState("")

  // Tối ưu hóa useEffect để chỉ gọi setState khi có sự thay đổi
  useEffect(() => {
    if (user) {
      setName(user.username)
      setFirstName(user.firstName)
    } else {
      setName("")
      setFirstName("")
    }
  }, [user])

  // Sử dụng useCallback để đảm bảo handleSave không được tái tạo lại mỗi lần render
  const handleSave = useCallback(() => {
    if (username.trim() === "" || firstName.trim() === "") return
    onSave({
      username, firstName,
      password: "",
      lastName: "",
      dob: ""
    }, user?.id)
    onClose()
  }, [username, firstName, onSave, onClose, user?.id])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Sửa người dùng" : "Thêm người dùng"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              placeholder="Nhập tên"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Nhập email"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Huỷ</Button>
          <Button onClick={handleSave}>
            {user ? "Lưu thay đổi" : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
