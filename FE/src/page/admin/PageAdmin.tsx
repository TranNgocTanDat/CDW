import { AdminDashboard } from "./components/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | GameVault",
  description: "Manage your game store",
}

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AdminDashboard />
      </main>
    </div>
  )
}
