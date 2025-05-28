"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Gamepad2, ShoppingBag, DollarSign, TrendingUp, TrendingDown, Clock, Star } from "lucide-react"

// Cập nhật thống kê tổng quan
const stats = [
  {
    title: "Total Revenue",
    value: "$67,845",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Users",
    value: "3,247",
    change: "+18.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Games",
    value: "127",
    change: "+8.2%",
    trend: "up",
    icon: Gamepad2,
  },
  {
    title: "Total Orders",
    value: "1,567",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingBag,
  },
]

// Cập nhật danh sách đơn hàng gần đây trong dashboard overview
const recentOrders = [
  {
    id: "ORD-025",
    customer: "Brandon Clark",
    game: "Eternal Quest IX",
    amount: "$59.97",
    status: "refunded",
    date: "1 hour ago",
  },
  {
    id: "ORD-024",
    customer: "Lauren Miller",
    game: "Dragon's Keep",
    amount: "$39.99",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: "ORD-023",
    customer: "Ryan Johnson",
    game: "Shadow Realm + Astral Frontiers",
    amount: "$109.98",
    status: "processing",
    date: "3 hours ago",
  },
  {
    id: "ORD-022",
    customer: "Stephanie White",
    game: "Cyber Nexus 2077",
    amount: "$29.99",
    status: "completed",
    date: "4 hours ago",
  },
  {
    id: "ORD-021",
    customer: "Matthew Anderson",
    game: "Medieval Legends + Tactical Force",
    amount: "$44.97",
    status: "pending",
    date: "5 hours ago",
  },
]

const topGames = [
  {
    name: "Cyber Nexus 2077",
    sales: 245,
    revenue: "$7,351",
    rating: 4.5,
  },
  {
    name: "Shadow Realm",
    sales: 189,
    revenue: "$11,331",
    rating: 4.9,
  },
  {
    name: "Dragon's Keep",
    sales: 156,
    revenue: "$6,244",
    rating: 4.5,
  },
  {
    name: "Eternal Quest IX",
    sales: 134,
    revenue: "$2,678",
    rating: 4.8,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6 mx-3" >
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your game store performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.game}</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Games</CardTitle>
            <CardDescription>Best performing games this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topGames.map((game, index) => (
                <div key={game.name} className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                      <p className="text-sm font-medium">{game.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{game.rating}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{game.sales} sales</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{game.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
