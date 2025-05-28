"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Wallet, Building2, Shield, Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: string
  title: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  platform: string[]
  discount?: number
}

const cartItems: CartItem[] = [
  {
    id: "1",
    title: "Cyberpunk 2077: Phantom Liberty",
    image: "/placeholder.svg?height=120&width=200",
    price: 899000,
    originalPrice: 1299000,
    quantity: 1,
    platform: ["Windows", "Steam"],
    discount: 31,
  },
  {
    id: "2",
    title: "Baldur's Gate 3",
    image: "/placeholder.svg?height=120&width=200",
    price: 400000,
    originalPrice: 600000,
    quantity: 1,
    platform: ["Windows", "Mac", "Steam"],
    discount: 33,
  },
  {
    id: "3",
    title: "Elden Ring",
    image: "/placeholder.svg?height=120&width=200",
    price: 750000,
    quantity: 1,
    platform: ["Windows", "Steam"],
  },
]

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>(cartItems)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [billingInfo, setBillingInfo] = useState({
    address: "",
    city: "",
    zipCode: "",
    country: "Vietnam",
  })
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)
  const totalDiscount = originalTotal - subtotal
  const tax = subtotal * 0.1 // 10% VAT
  const total = subtotal + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý thanh toán ở đây
    console.log("Processing payment...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại giỏ hàng
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Thanh toán</h1>
            <p className="text-slate-400">Hoàn tất đơn hàng của bạn</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Thông tin khách hàng</CardTitle>
                <CardDescription className="text-slate-400">Nhập thông tin để nhận hóa đơn và hỗ trợ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300">
                      Họ
                    </Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Nguyễn"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300">
                      Tên
                    </Label>
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
                  <Label htmlFor="email" className="text-slate-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300">
                    Số điện thoại
                  </Label>
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
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <Label htmlFor="card" className="text-white flex-1 cursor-pointer">
                      Thẻ tín dụng / Thẻ ghi nợ
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                    <RadioGroupItem value="momo" id="momo" />
                    <Wallet className="w-5 h-5 text-slate-400" />
                    <Label htmlFor="momo" className="text-white flex-1 cursor-pointer">
                      Ví MoMo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:border-slate-500">
                    <RadioGroupItem value="banking" id="banking" />
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <Label htmlFor="banking" className="text-white flex-1 cursor-pointer">
                      Chuyển khoản ngân hàng
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4 p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber" className="text-slate-300">
                        Số thẻ
                      </Label>
                      <Input
                        id="cardNumber"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-slate-300">
                          MM/YY
                        </Label>
                        <Input
                          id="expiry"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="12/25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-slate-300">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-slate-300">
                        Tên trên thẻ
                      </Label>
                      <Input
                        id="cardName"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="NGUYEN VAN A"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Cart Items */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Đơn hàng của bạn ({items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                      <p className="text-slate-400 text-xs">{item.platform.join(", ")}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 border-slate-600"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 border-slate-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatPrice(item.price)}</p>
                      {item.originalPrice && (
                        <div className="flex flex-col items-end">
                          <p className="text-slate-400 text-xs line-through">{formatPrice(item.originalPrice)}</p>
                          {item.discount && (
                            <Badge variant="secondary" className="text-xs bg-green-600 hover:bg-green-700">
                              -{item.discount}%
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-slate-400">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Giảm giá</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
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

            {/* Security Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Thanh toán được bảo mật bằng SSL 256-bit</span>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="border-slate-600" />
              <Label htmlFor="terms" className="text-slate-400 text-sm leading-relaxed">
                Tôi đồng ý với{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Chính sách bảo mật
                </a>
              </Label>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
              size="lg"
              onClick={handleSubmit}
            >
              Thanh toán {formatPrice(total)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
