"use client"

import { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ShoppingCart, Trash2, ArrowRight, CreditCard, Smartphone, Building2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import type { RootState } from "@/redux/store"
import { setCartItems, removeCartItem, clearCart } from "@/redux/cartSlice"
import cartApi from "@/services/cartApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { CartResponse } from "@/model/Cart"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import orderApi from "@/services/orderApi"

export function CartPage() {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart.cart)
  const items = cartState?.cartItems || []

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<"momo" | "bank" | "credit">("momo")
  const [isProcessing, setIsProcessing] = useState(false)

  // Lấy giỏ hàng từ API
  const { data: cart, isLoading } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (cart) {
      dispatch(setCartItems(cart))
    }
  }, [cart, dispatch])

  const removeItem = (id: number) => {
    dispatch(removeCartItem(id))
  }

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.totalPrice, 0), [items])

  const createOrderMutation = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: (data) => {
      console.log("Order created successfully:", data)
    }
  })

  const choosePaymentMutation = useMutation({
    mutationFn: ({ orderId, method }: { orderId: number; method: string }) =>
        orderApi.choosePaymentMethod(orderId, method),
  })

  const confirmPaymentMutation = useMutation({
    mutationFn: (orderId: number) => orderApi.confirmPayment(orderId),
  })

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      if (!cart || !cart.cartItems.length) {
        alert("Giỏ hàng trống!")
        return
      }

      const newOrder = await createOrderMutation.mutateAsync(undefined, undefined)
      console.log("newOrder", newOrder);
      console.log("newOrder", newOrder.id)
      await choosePaymentMutation.mutateAsync({
        orderId: newOrder.id,
        method: selectedPayment,
      })

      await confirmPaymentMutation.mutateAsync(newOrder.id)

      dispatch(clearCart())
      setShowPaymentModal(false)

      alert(
          `Thanh toán thành công qua ${
              selectedPayment === "momo"
                  ? "Momo"
                  : selectedPayment === "bank"
                      ? "Ngân hàng"
                      : "Thẻ tín dụng"
          }!`
      )
    } catch (error) {
      console.error("Payment error:", error)
      alert("Thanh toán thất bại, vui lòng thử lại!")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value as "momo" | "bank" | "credit")
  }

  if (isLoading) {
    return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading your cart...</h2>
            <p className="text-muted-foreground mt-2">Please wait while we load your cart items.</p>
          </div>
        </div>
    )
  }

  if (!items.length) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">Add some items to your cart to see them here.</p>
          <Button asChild size="lg">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
    )
  }

  return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg border">
              <div className="p-4 md:p-6">
                <div className="hidden md:grid md:grid-cols-6 md:gap-4 md:mb-4 text-sm text-muted-foreground">
                  <div className="md:col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Total</div>
                </div>
                <Separator className="hidden md:block mb-4" />
                <div className="space-y-4">
                  {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4">
                        <div className="flex gap-4 md:col-span-3">
                          <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                                src={item.product.img || "/placeholder.svg"}
                                alt={item.product.productName || "Product image"}
                                className="object-contain"
                            />
                          </div>  
                          <div className="flex flex-col justify-center">
                            <div className="mt-1 text-sm text-muted-foreground md:hidden">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-center">
                          <span className="text-sm">${item.product.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center md:justify-center">
                          <span className="font-medium md:text-right">${item.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end">
                          <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <Separator className="md:col-span-6 md:hidden" />
                      </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t p-4 md:p-6">
                <Button variant="ghost" asChild>
                  <Link to="/">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="ghost" onClick={clearCartHandler}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/create-order" className="w-full">
                  <Button className="w-full">Payment</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold">Chọn phương thức thanh toán</DialogTitle>
              <p className="text-center text-sm text-muted-foreground">
                Tổng thanh toán:{" "}
                <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
              </p>
            </DialogHeader>

            <div className="py-4">
              <RadioGroup value={selectedPayment} onValueChange={handlePaymentChange} className="space-y-3">
                {[
                  {
                    id: "MOMO",
                    icon: <Smartphone className="h-5 w-5 text-pink-600" />,
                    label: "Ví MoMo",
                    desc: "Thanh toán qua ví điện tử",
                    color: "bg-pink-100",
                  },
                  {
                    id: "BANKING",
                    icon: <Building2 className="h-5 w-5 text-blue-600" />,
                    label: "Chuyển khoản ngân hàng",
                    desc: "Thanh toán qua tài khoản ngân hàng",
                    color: "bg-blue-100",
                  },
                  {
                    id: "CREDIT_CARD",
                    icon: <CreditCard className="h-5 w-5 text-green-600" />,
                    label: "Thẻ tín dụng",
                    desc: "Thanh toán qua thẻ Visa/MasterCard",
                    color: "bg-green-100",
                  },
                ].map((method) => (
                    <div key={method.id} className="relative">
                      <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                      <Label
                          htmlFor={method.id}
                          className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${method.color}`}>
                            {method.icon}
                          </div>
                          <div>
                            <div className="font-medium">{method.label}</div>
                            <div className="text-sm text-muted-foreground">{method.desc}</div>
                          </div>
                        </div>
                        <div className="peer-data-[state=checked]:block hidden">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      </Label>
                    </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
