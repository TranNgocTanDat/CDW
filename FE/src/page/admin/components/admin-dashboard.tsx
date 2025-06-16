import { useState } from "react"
import { DashboardOverview } from "./dashboard-overview"
import { UserManagement } from "./user-management"
import { GameManagement } from "./game-management"
import { OrderManagement } from "./order-management"
import { AdminSidebar } from "./admin-sidebar"
import { cn } from "@/lib/utils"
import { Bell, ChevronDown, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { logout } from "@/redux/authSlice"

export type AdminSection = "overview" | "users" | "games" | "orders" | "analytics" | "settings"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview")
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Xóa token khỏi localStorage

    queryClient.removeQueries({ queryKey: ["me"] });

    navigate("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "games":
        return <GameManagement />
      case "orders":
        return <OrderManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
      <header
          className={cn(
            "h-16 border-b sticky top-0 z-30 flex items-center justify-between px-6",
            // theme === "dark" ? "bg-gray-900 border-gray-800",
          )}
        >
          <div className="flex items-center gap-4">
            <h1 className={cn("text-xl font-semibold md:hidden", )}>
              Triple D
            </h1>
          
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn("relative", )}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
              <Grid size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
            </Button>
            <div className="hidden md:block h-8 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className={cn("hidden md:inline text-sm", )}>
                    Admin
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="container py-6">{renderContent()}</div>
      </div>
    </div>
  )
}
