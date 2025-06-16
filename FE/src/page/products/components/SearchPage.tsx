import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productApi from "@/services/productApi";
import type { ProductResponse } from "@/model/Product";

const SearchResultPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";

  const { data, isLoading } = useQuery<ProductResponse[]>({
    queryKey: ["search", keyword],
    queryFn: () => productApi.searchGames(keyword),
    enabled: !!keyword,
  });

  return (
    <div className="container py-8">
      <h2 className="text-xl font-bold mb-4">Search results for "{keyword}"</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <div
              key={product.productId}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold">{product.productName}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <p className="font-medium mt-2">{product.price.toLocaleString()} VND</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResultPage;
