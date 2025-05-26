import React, { useState } from "react";
import { Heart, ShoppingCart, Star, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/page/cart/components/cart-context";
import { Link } from "react-router-dom";

interface GameCardProps {
    id: string;  // Bắt buộc phải có id và là string
    title: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    isNew?: boolean;
    slug?: string;
}

export function GameCard({
                             id,
                             title,
                             imageUrl,
                             price,
                             originalPrice,
                             discount,
                             rating,
                             isNew,
                             slug,
                         }: GameCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [keyInput, setKeyInput] = useState("");
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id,
            title,
            price,
            imageUrl,
            slug: slug || "",
        });
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
            <Link
                to={`/products/${id}`}
                className="block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card className="overflow-hidden transition-all duration-300 group cursor-pointer">
                    <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={title}
                            className={cn(
                                "absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500",
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
                                    e.stopPropagation();
                                    setIsFavorite(!isFavorite);
                                }}
                            >
                                <Heart
                                    className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")}
                                />
                                <span className="sr-only">Add to favorites</span>
                            </Button>
                        </div>

                        {discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                -{discount}%
                            </Badge>
                        )}
                        {isNew && (
                            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                                New
                            </Badge>
                        )}

                        <div
                            className={cn(
                                "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300",
                                isHovered && "opacity-100"
                            )}
                        >
                            <Button
                                className="bg-primary hover:bg-primary/90"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAddToCart(e);
                                }}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                            </Button>

                            <Button
                                className="bg-primary hover:bg-primary/90"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDownloadClick(e);
                                }}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </div>

                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{rating}</span>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-bold">${price.toFixed(2)}</span>
                            {originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </Link>

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
                            onChange={(e) => setKeyInput(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Enter your key here"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowKeyModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleKeySubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
