"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, Gamepad2, ShoppingBag, BarChart3, Settings  } from "lucide-react"
import type { AdminSection } from "./admin-dashboard"

interface AdminSidebarProps {
  activeSection: AdminSection
  onSectionChange: (section: AdminSection) => void
}

const sidebarItems = [
  {
    id: "overview" as AdminSection,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "users" as AdminSection,
    label: "Users",
    icon: Users,
  },
  {
    id: "games" as AdminSection,
    label: "Games",
    icon: Gamepad2,
  },
  {
    id: "orders" as AdminSection,
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    id: "analytics" as AdminSection,
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "settings" as AdminSection,
    label: "Settings",
    icon: Settings,
  },
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <div className="w-64 border-r bg-muted/10">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-2">
          
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", activeSection === item.id && "bg-primary/10 text-primary")}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
