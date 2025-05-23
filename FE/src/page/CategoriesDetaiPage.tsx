import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import productApi from "@/services/productApi"; // tạo file này nếu chưa có
import { GameCard } from "@/components/home/GameCard";

const CategoryDetailPage = () => {
    const { cateId } = useParams({ from: "/categories/:cateId" });

    const { data: products, isLoading } = useQuery({
        queryKey: ["productsByCategory", cateId],
        queryFn: () => productApi.getProductsByCategory(cateId),
    });

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Games in this Category</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : products?.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <GameCard
                            key={product.product_ID}
                            title={product.productName}
                            imageUrl={product.img}
                            price={product.price}
                            rating={product.stock}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryDetailPage;