"use client"

import React, { useState } from "react"
import {
  CreditCard, Wallet, Building2, Shield, ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import cartApi from "@/services/cartApi"
import orderApi from "@/services/orderApi"
import { useQuery} from "@tanstack/react-query"
import type { CartItemResponse } from "@/model/Cart"

export default function CheckoutPage() {

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
  })

  const cartItems = cart?.cartItems || []

  const [selectedPayment, setSelectedPayment] = useState<"momo" | "bank" | "credit">("momo")
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  const [agreeTerms, setAgreeTerms] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax
  const mapPaymentMethod = (method: string) => {
    switch (method) {
      case "momo":
        return "MOMO"
      case "credit":
        return "CREDIT_CARD"
      case "banking":
        return "BANK_TRANSFER"
      default:
        return "MOMO"
    }
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert("Bạn cần đồng ý với điều khoản dịch vụ.")
      return
    }

    try {
      // 1. Tạo đơn hàng
      const createdOrder = await orderApi.createOrder()
      console.log("✅ Đơn hàng đã tạo:", createdOrder)

      // 2. Chọn phương thức thanh toán (chỉ 1 lần)
      const chosenPayment = await orderApi.choosePaymentMethod(
          createdOrder.id,
          mapPaymentMethod(selectedPayment)
      )
      console.log("✅ Đã thanh toán:", chosenPayment)
      await orderApi.confirmPayment(createdOrder.id)
      alert("🎉 Thanh toán thành công!")
    } catch (err) {
      console.error("❌ Lỗi thanh toán:", err)
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.")
    }
  }

  if (isLoading) return <div className="text-white p-4">Đang tải giỏ hàng...</div>
  if (error) return <div className="text-red-500 p-4">Lỗi khi tải giỏ hàng.</div>

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/cart" className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại giỏ hàng
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Thanh toán</h1>
              <p className="text-slate-400">Hoàn tất đơn hàng của bạn</p>
            </div>
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Thông tin khách hàng</CardTitle>
                    <CardDescription className="text-slate-400">
                      Nhập thông tin để nhận hóa đơn và hỗ trợ
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-slate-300">Họ</Label>
                        <Input
                            id="firstName"
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="Nguyễn"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-slate-300">Tên</Label>
                        <Input
                            id="lastName"
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                            placeholder="Văn A"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email *</Label>
                      <Input
                          id="email"
                          type="email"
                          required
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-slate-300">Số điện thoại</Label>
                      <Input
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="0123456789"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Phương thức thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedPayment} onValueChange={(value) => setSelectedPayment(value as "momo" | "bank" | "credit")} className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                        <RadioGroupItem value="credit" id="CREDIT_CARD" />
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        <Label htmlFor="card" className="text-white flex-1 cursor-pointer">
                          Thẻ tín dụng / Thẻ ghi nợ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                        <RadioGroupItem value="momo" id="MOMO" />
                        <Wallet className="w-5 h-5 text-slate-400" />
                        <Label htmlFor="momo" className="text-white flex-1 cursor-pointer">
                          Ví MoMo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                        <RadioGroupItem value="banking" id="BANKING" />
                        <Building2 className="w-5 h-5 text-slate-400" />
                        <Label htmlFor="banking" className="text-white flex-1 cursor-pointer">
                          Chuyển khoản ngân hàng
                        </Label>
                      </div>
                    </RadioGroup>

               
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Đơn hàng ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item: CartItemResponse) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                              src={item.product.img || "/placeholder.svg"}
                              alt={item.product.productName}
                              className="w-16 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{item.product.productName}</h4>
                            <p className="text-slate-400 text-xs">{item.product.categoryName}</p>
                          </div>
                          <p className="text-white font-medium">{formatPrice(item.totalPrice)}</p>
                        </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Tóm tắt đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Tạm tính</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>VAT (10%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>Tổng cộng</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>Thanh toán được bảo mật bằng SSL 256-bit</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start space-x-2">
                  <Checkbox
                      id="terms"
                      className="border-slate-600"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
                  />
                  <Label htmlFor="terms" className="text-slate-400 text-sm leading-relaxed">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-blue-400 hover:underline">Điều khoản dịch vụ</a> và{" "}
                    <a href="#" className="text-blue-400 hover:underline">Chính sách bảo mật</a>
                  </Label>
                </div>

                <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
                    size="lg"
                    type="submit"
                >
                  Thanh toán {formatPrice(total)}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}
