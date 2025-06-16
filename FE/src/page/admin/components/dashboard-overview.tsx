"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Gamepad2,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { OrderResponse } from "@/model/Order";
import orderApi from "@/services/orderApi";
import type { ProductResponse } from "@/model/Product";
import productApi from "@/services/productApi";
import { games } from "../game";
import type { UserResponse } from "@/model/User";
import userApi from "@/services/userApi";

// Top game bán chạy
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
];

export function DashboardOverview() {
  const { data: orders } = useQuery<OrderResponse[]>({
    queryKey: ["orders"],
    queryFn: () => orderApi.getAllOrders(),
    // refetchInterval: 500
  });

  const count = orders?.length;

  const countPrice = orders?.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  const countGames = games?.length;

  const { data: products } = useQuery<ProductResponse[]>({
    queryKey: ["products"],
    queryFn: productApi.getAllProducts,
    refetchOnWindowFocus: false,
  });
  const { data: users } = useQuery<UserResponse[]>({
    queryKey: ["users"],
    queryFn: userApi.getUsers,
    refetchOnWindowFocus: false,
  });

  const countUsers = users?.length || 0;

  return (
    <div className="space-y-6 mx-3">
      <div>
        <h1 className="text-3xl font-bold">Tổng quan bảng điều khiển</h1>
        <p className="text-muted-foreground">
          Chào mừng trở lại! Đây là tóm tắt hiệu suất cửa hàng game của bạn.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countPrice}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">+23.1%</span>
              <span>so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countUsers}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">+18.3%</span>
              <span>so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số game</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countGames}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span>
              <span>so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span>
              <span>so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Những đơn hàng mới nhất và trạng thái của chúng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(orders ?? []).slice(0, 8).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.username}</p>
                    {order.orderItems.map((item, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        {item.productName}
                      </p>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {order.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.totalPrice}</p>
                    <Badge
                      variant={
                        order.status === "Đã hoàn tất"
                          ? "default"
                          : order.status === "Đang xử lý"
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
              Xem tất cả đơn hàng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game bán chạy nhất</CardTitle>
            <CardDescription>
              Những game có hiệu suất tốt nhất trong tháng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(products ?? []).map((game, index) => (
                <div
                  key={game.productName}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <p className="text-sm font-medium">{game.productName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {game.stock} sao
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {game.stock} lượt bán
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Xem phân tích
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
