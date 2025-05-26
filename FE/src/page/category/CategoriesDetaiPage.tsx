import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/services/categoryApi.ts"; // hoặc productApi nếu gọi API sản phẩm
import { GameCard } from "@/components/home/GameCard";

const CategoryDetailPage = () => {
  const { cateId } = useParams<{ cateId: string }>();
  const categoryId = cateId ? Number(cateId) : undefined;

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: () => {
      if (categoryId === undefined) throw new Error("Category ID is missing");
      return categoryApi.getCategoryById(categoryId);
    },
    enabled: !!categoryId,
  });

  if (error) {
    const errorMessage = (error as Error)?.message || "Unknown error";
    return (
      <p className="text-red-500">Error loading products: {errorMessage}</p>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">
        Games in category: {category?.name}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : category?.productList?.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category?.productList?.map((product) => {
            console.log("productList in category:", category?.productList);
            return (
              <GameCard
                    key={`${product.productId}-${product.productName}`}
                    productId={product.productId}
                    productName={product.productName}
                    img={product.img}
                    price={product.price}
                    stock={product.stock}
                    description={""} categoryName={""}              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
