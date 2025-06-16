import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { ProductResponse } from "@/model/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import cartApi from "@/services/cartApi";
import { addCartItem } from "@/redux/cartSlice";
import keyApi from "@/services/keyApi";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.target.value);
    console.log("Input changed:", e.target.value);
  };

  const handleKeySubmit = async () => {
    console.log("Submitted key:", keyInput);

    if (!keyInput.trim()) {
      alert("Please enter a key");
      return;
    }
    const isValid = await keyApi.checkGameKey(keyInput.trim());
    try {

      console.log("API check key result:", isValid);

      if (isValid) {
        // Nội dung file text đơn giản (không phải file Word chuẩn .docx)
        const content = `🎮 Thank you for activating ${product.productName}!\n\nYour key: ${keyInput.trim()}`;
        const blob = new Blob([content], { type: "text/plain" });

        // Tạo link download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${product.productName}.txt`; // Đổi thành .txt cho phù hợp
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Download started!");
      } else {
        alert("Invalid key. Please try again.");
      }
    } catch (error) {
      console.error("Key check failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setShowKeyModal(false);
      setKeyInput("");
    }
  };

  return (
      <>
        <Card
            className="overflow-hidden transition-all duration-300 group p-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-none">
            <img
                src={product.img || "/placeholder.svg"}
                alt={product.productName}
                className={cn(
                    "object-cover w-full h-full transition-transform duration-500",
                    isHovered && "scale-110"
                )}
            />
            <div className="absolute top-2 right-2 z-10">
              <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFavorite(!isFavorite);
                  }}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            {product.stock && (
                <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                  New
                </Badge>
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

            <div
                className={cn(
                    "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300",
                    isHovered && "opacity-100"
                )}
            >
              <Button className="bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleDownloadClick}>
                Download
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <Link to={`/products/${product.productId}`} className="block">
              <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
                {product.productName}
              </h3>
            </Link>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.stock}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              {product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              )}
            </div>
          </CardFooter>
        </Card>

        {showKeyModal && (
            <div
                className="fixed inset-0 bg-grey bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50"
                onClick={() => setShowKeyModal(false)}
            >
              <div
                  className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg"
                  onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Enter your key</h2>
                <input
                    type="text"
                    value={keyInput}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    placeholder="Enter your key here"
                />
                <div className="flex justify-end gap-2">
                  <button
                      className="px-4 py-2 border rounded"
                      onClick={() => setShowKeyModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
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
