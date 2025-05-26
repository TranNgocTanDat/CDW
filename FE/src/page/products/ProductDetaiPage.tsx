import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productApi from "@/services/productApi";
import { useCart } from "@/page/cart/components/cart-context";

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const id = productId ? Number(productId) : undefined;

    const { addItem } = useCart();
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [keyInput, setKeyInput] = useState("");

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["productDetail", id],
        queryFn: () => {
            if (!id) throw new Error("Product ID is missing");
            return productApi.getProductById(id);
        },
        enabled: !!id,
    });

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product) {
            addItem({
                id: String(product.productId || product.product_ID),
                title: product.productName,
                price: product.price,
                imageUrl: product.img,
                slug: "", // nếu có slug thì truyền vào
            });
            alert("Added to cart!");
        }
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

    if (error) {
        const errorMessage = (error as Error)?.message || "Unknown error";
        return (
            <p className="text-red-500 text-center mt-8">
                Error loading product: {errorMessage}
            </p>
        );
    }

    if (isLoading) return <p className="text-center mt-8">Loading product...</p>;

    if (!product) return <p className="text-center mt-8">Product not found.</p>;

    return (
        <>
            <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={product.img || "/placeholder.svg"}
                        alt={product.productName}
                        className="w-full md:w-1/2 object-cover rounded"
                    />

                    <div className="flex flex-col justify-between md:w-1/2">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
                            <p className="text-gray-700 mb-6">
                                {product.description || "No description available."}
                            </p>
                            <p className="text-xl font-semibold mb-4 text-green-600">
                                Price: ${product.price.toFixed(2)}
                            </p>
                            <p className="mb-6">Stock: {product.stock ?? "N/A"}</p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded shadow"
                                onClick={handleDownloadClick}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
};

export default ProductDetailPage;
