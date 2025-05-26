import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { RootState } from "@/redux/store"; 
import { setCartItems, removeCartItem, clearCart } from "@/redux/cartSlice";
import cartApi from "@/services/cartApi";
import { useQuery } from "@tanstack/react-query";
import type { CartResponse } from "@/model/Cart";

export function CartPage() {
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart.cart);
const items = cartState?.cartItems || [];


const { data: cart, isLoading } = useQuery<CartResponse>({
  queryKey: ["cart"],
  queryFn: cartApi.getCart,
  refetchOnWindowFocus: false,
});

  useEffect(() => {
    if (cart) {
      dispatch(setCartItems(cart));
    }
  }, [cart, dispatch]);


  const removeItem = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading your cart...</h2>
          <p className="text-muted-foreground mt-2">Please wait while we load your cart items.</p>
        </div>
      </div>
    );
  }

  if (!items.length ) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 mb-6">Add some items to your cart to see them here.</p>
        <Button asChild size="lg">
          <Link to="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Your Cart 
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4 md:p-6">
              <div className="hidden md:grid md:grid-cols-6 md:gap-4 md:mb-4 text-sm text-muted-foreground">
                <div className="md:col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              <Separator className="hidden md:block mb-4" />
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4">
                    <div className="flex gap-4 md:col-span-3">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product.img || "/placeholder.svg"}
                          alt={item.product.productName}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        {/* <Link to={/products/${item.product.slug}} className="font-medium hover:underline">
                          {item.product.title}
                        </Link> */}
                        <div className="mt-1 text-sm text-muted-foreground md:hidden">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center">
                      <span className="text-sm">${item.product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center md:justify-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end">
                      <span className="font-medium md:text-right">${item.totalPrice.toFixed(2)}</span>
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
              <Button asChild className="w-full">
                <Link to="/">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 