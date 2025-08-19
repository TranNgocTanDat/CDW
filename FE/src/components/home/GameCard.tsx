import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { ProductResponse } from "@/model/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import cartApi from "@/services/cartApi";
import { addCartItem } from "@/redux/cartSlice";

export function GameCard(product: ProductResponse) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { authenticated } = useSelector((state: RootState) => state.auth);

  const { mutate: addToCart } = useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: (data) => {
      dispatch(addCartItem(data));
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.error("Add to cart failed", err);
    },
  });

  const handleAddToCart = () => {
    if (!authenticated) {
      alert("Please log in to add items to your cart.");
      return;
    }
    addToCart({ productId: product.productId });
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowKeyModal(true);
  };

  const handleKeySubmit = () => {
    if (!keyInput) {
      alert("Please enter a key");
      return;
    }
    alert(`Key submitted: ${keyInput}`);
    setShowKeyModal(false);
    setKeyInput("");
  };


  return (
    <>
      <Card
        className="group relative overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 py-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={product.img || "/placeholder.svg"}
            alt={product.productName}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 ease-in-out",
              isHovered && "scale-105"
            )}
          />

          {/* Favorite & Badge */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isFavorite && "fill-red-500 text-red-500"
                )}
              />
            </Button>
          </div>
          {product.stock && (
            <Badge className="absolute top-3 left-3 bg-green-600 text-white shadow">
              New
            </Badge>
          )}

          {/* Hover Overlay Actions */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 text-white opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
          >
            <Link to="/cart">
              <Button
                className="w-40 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </Link>
            <Button
              className="w-40 bg-secondary hover:bg-secondary/90 text-black"
              onClick={handleDownloadClick}
            >
              Download
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <Link to={`/products/${product.productId}`}>
              <h3 className="text-xl font-bold text-blue-600 line-clamp-1">
                {product.productName}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-400" />
              <span className="text-sm font-semibold">5.0</span>
            </div>
          </div>

          {product.categoryName && (
            <div className="flex gap-2 flex-wrap">
              {product.categoryName.split(",").map((cat) => (
                <span
                  key={cat}
                  className="bg-gray-800 text-xs text-white px-2 py-1 rounded-full"
                >
                  {cat.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.price === 0 ? (
                <span className="text-green-400 text-base font-bold">
                  Free to Play
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              )}
              <span className="line-through text-sm text-gray-400">500000</span>
            </div>
            <span
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                product.stock > 0
                  ? "bg-green-700 text-white"
                  : "bg-gray-600 text-gray-300"
              )}
            >
              {product.stock > 0 ? "Available" : "Coming Soon"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Key Modal */}
      {showKeyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowKeyModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Enter Your Key
            </h2>
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your key here"
            />
            <div className="flex justify-end gap-2">
              <button
                className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setShowKeyModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={handleKeySubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
