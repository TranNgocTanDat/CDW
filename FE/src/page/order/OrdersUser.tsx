import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { OrderResponse } from "@/model/Order";
import orderApi from "@/services/orderApi";

const OrdersUser: React.FC = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<OrderResponse[]>({
    queryKey: ["myOrders"],
    queryFn: orderApi.getOrderByUser,
  });

  if (isLoading) return <div>Đang tải đơn hàng...</div>;
  if (isError) return <div>Lỗi khi tải đơn hàng.</div>;
  if (!orders || orders.length === 0) return <div>Chưa có đơn hàng nào.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Đơn hàng của bạn</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <div className="mb-4">
              <p>
                <strong>Mã đơn:</strong> {order.id}
              </p>
              <p>
                <strong>Trạng thái:</strong> {order.status}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {order.createdAt}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()}{" "}
                VNĐ
              </p>
            </div>

            <div>
              <strong className="block mb-2">Sản phẩm:</strong>
              <div className="space-y-2">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded p-2 bg-gray-50"
                  >
                    <img
                      src={item.img}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      {/* <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersUser;
