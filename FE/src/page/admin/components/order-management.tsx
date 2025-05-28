"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Filter, Download } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    items: [
      { name: "Cyber Nexus 2077", quantity: 1, price: 29.99 },
      { name: "Shadow Realm", quantity: 1, price: 59.99 },
    ],
    total: 89.98,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-12-01",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    items: [{ name: "Eternal Quest IX", quantity: 2, price: 19.99 }],
    total: 39.98,
    status: "processing",
    paymentMethod: "PayPal",
    orderDate: "2023-12-01",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    items: [{ name: "Dragon's Keep", quantity: 1, price: 39.99 }],
    total: 39.99,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-30",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    items: [{ name: "Neon Drift", quantity: 1, price: 29.99 }],
    total: 29.99,
    status: "refunded",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-30",
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    items: [
      { name: "Tactical Force", quantity: 1, price: 14.99 },
      { name: "City Architect", quantity: 1, price: 34.99 },
    ],
    total: 49.98,
    status: "pending",
    paymentMethod: "Bank Transfer",
    orderDate: "2023-11-29",
  },
  {
    id: "ORD-006",
    customer: "Emily Davis",
    email: "emily@example.com",
    items: [
      { name: "Astral Frontiers", quantity: 1, price: 49.99 },
      { name: "Monster Tamers", quantity: 1, price: 39.99 },
    ],
    total: 89.98,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-29",
  },
  {
    id: "ORD-007",
    customer: "David Lee",
    email: "david@example.com",
    items: [{ name: "Football Champions 24", quantity: 1, price: 59.99 }],
    total: 59.99,
    status: "processing",
    paymentMethod: "PayPal",
    orderDate: "2023-11-28",
  },
  {
    id: "ORD-008",
    customer: "Lisa Wang",
    email: "lisa@example.com",
    items: [
      { name: "Puzzle Dimensions", quantity: 1, price: 19.99 },
      { name: "Rhythm Masters", quantity: 1, price: 19.99 },
      { name: "Mystic Isles", quantity: 1, price: 24.99 },
    ],
    total: 64.97,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-28",
  },
  {
    id: "ORD-009",
    customer: "Robert Chen",
    email: "robert@example.com",
    items: [{ name: "Survival Island", quantity: 1, price: 24.99 }],
    total: 24.99,
    status: "cancelled",
    paymentMethod: "PayPal",
    orderDate: "2023-11-27",
  },
  {
    id: "ORD-010",
    customer: "Amanda Taylor",
    email: "amanda@example.com",
    items: [
      { name: "Galaxy Warriors", quantity: 1, price: 24.99 },
      { name: "Medieval Legends", quantity: 1, price: 14.99 },
    ],
    total: 39.98,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-27",
  },
  {
    id: "ORD-011",
    customer: "Kevin Martinez",
    email: "kevin@example.com",
    items: [{ name: "Cyber Nexus 2077", quantity: 1, price: 29.99 }],
    total: 29.99,
    status: "processing",
    paymentMethod: "Bank Transfer",
    orderDate: "2023-11-26",
  },
  {
    id: "ORD-012",
    customer: "Rachel Green",
    email: "rachel@example.com",
    items: [
      { name: "Shadow Realm", quantity: 1, price: 59.99 },
      { name: "Dragon's Keep", quantity: 1, price: 39.99 },
      { name: "Eternal Quest IX", quantity: 1, price: 19.99 },
    ],
    total: 119.97,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-26",
  },
  {
    id: "ORD-013",
    customer: "James Wilson",
    email: "james@example.com",
    items: [{ name: "Astral Frontiers", quantity: 2, price: 49.99 }],
    total: 99.98,
    status: "pending",
    paymentMethod: "PayPal",
    orderDate: "2023-11-25",
  },
  {
    id: "ORD-014",
    customer: "Nicole Brown",
    email: "nicole@example.com",
    items: [{ name: "Neon Drift", quantity: 1, price: 29.99 }],
    total: 29.99,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-25",
  },
  {
    id: "ORD-015",
    customer: "Steven Garcia",
    email: "steven@example.com",
    items: [
      { name: "Tactical Force", quantity: 1, price: 14.99 },
      { name: "Puzzle Dimensions", quantity: 1, price: 19.99 },
    ],
    total: 34.98,
    status: "refunded",
    paymentMethod: "PayPal",
    orderDate: "2023-11-24",
  },
  {
    id: "ORD-016",
    customer: "Michelle Rodriguez",
    email: "michelle@example.com",
    items: [{ name: "Monster Tamers", quantity: 1, price: 39.99 }],
    total: 39.99,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-24",
  },
  {
    id: "ORD-017",
    customer: "Daniel Kim",
    email: "daniel@example.com",
    items: [
      { name: "Football Champions 24", quantity: 1, price: 59.99 },
      { name: "City Architect", quantity: 1, price: 34.99 },
    ],
    total: 94.98,
    status: "processing",
    paymentMethod: "Bank Transfer",
    orderDate: "2023-11-23",
  },
  {
    id: "ORD-018",
    customer: "Jessica Thompson",
    email: "jessica@example.com",
    items: [{ name: "Rhythm Masters", quantity: 1, price: 19.99 }],
    total: 19.99,
    status: "completed",
    paymentMethod: "PayPal",
    orderDate: "2023-11-23",
  },
  {
    id: "ORD-019",
    customer: "Christopher Lee",
    email: "christopher@example.com",
    items: [
      { name: "Survival Island", quantity: 1, price: 24.99 },
      { name: "Mystic Isles", quantity: 1, price: 24.99 },
    ],
    total: 49.98,
    status: "cancelled",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-22",
  },
  {
    id: "ORD-020",
    customer: "Ashley Davis",
    email: "ashley@example.com",
    items: [{ name: "Galaxy Warriors", quantity: 1, price: 24.99 }],
    total: 24.99,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-22",
  },
  {
    id: "ORD-021",
    customer: "Matthew Anderson",
    email: "matthew@example.com",
    items: [
      { name: "Medieval Legends", quantity: 2, price: 14.99 },
      { name: "Tactical Force", quantity: 1, price: 14.99 },
    ],
    total: 44.97,
    status: "pending",
    paymentMethod: "PayPal",
    orderDate: "2023-11-21",
  },
  {
    id: "ORD-022",
    customer: "Stephanie White",
    email: "stephanie@example.com",
    items: [{ name: "Cyber Nexus 2077", quantity: 1, price: 29.99 }],
    total: 29.99,
    status: "completed",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-21",
  },
  {
    id: "ORD-023",
    customer: "Ryan Johnson",
    email: "ryan@example.com",
    items: [
      { name: "Shadow Realm", quantity: 1, price: 59.99 },
      { name: "Astral Frontiers", quantity: 1, price: 49.99 },
    ],
    total: 109.98,
    status: "processing",
    paymentMethod: "Bank Transfer",
    orderDate: "2023-11-20",
  },
  {
    id: "ORD-024",
    customer: "Lauren Miller",
    email: "lauren@example.com",
    items: [{ name: "Dragon's Keep", quantity: 1, price: 39.99 }],
    total: 39.99,
    status: "completed",
    paymentMethod: "PayPal",
    orderDate: "2023-11-20",
  },
  {
    id: "ORD-025",
    customer: "Brandon Clark",
    email: "brandon@example.com",
    items: [
      { name: "Eternal Quest IX", quantity: 1, price: 19.99 },
      { name: "Puzzle Dimensions", quantity: 1, price: 19.99 },
      { name: "Rhythm Masters", quantity: 1, price: 19.99 },
    ],
    total: 59.97,
    status: "refunded",
    paymentMethod: "Credit Card",
    orderDate: "2023-11-19",
  },
]

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6 mx-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage customer orders and transactions</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,567</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,398</div>
            <p className="text-xs text-muted-foreground">89.2% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunded Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">122</div>
            <p className="text-xs text-muted-foreground">7.8% refund rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage and track all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.slice(0, 15).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-xs">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "pending"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{order.paymentMethod}</TableCell>
                  <TableCell className="text-sm">{order.orderDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Track Delivery</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Refund Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4">
        <Button variant="outline">Load More Orders</Button>
      </div>
    </div>
  )
}
