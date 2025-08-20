import { FeaturedGameCarousel } from "@/components/home/FeaturedGameCarousel";
import { GameCard } from "@/components/home/GameCard";
import { CategoryCard } from "@/components/home/catgoryCard";
import { Button } from "@/components/ui/button";
import categoryApi from "@/services/categoryApi";
import productApi from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: gameCategories } = useQuery({
    queryKey: ["gameCategories"],
    queryFn: categoryApi.getCategories,
    refetchOnWindowFocus: false,
  });

  const { data: games } = useQuery({
    queryKey: ["games", { limit: 2, offset: 1 }],
    queryFn: () => productApi.getProducts(4, 1),
    refetchOnWindowFocus: false,
  });

  const { data: gamesSlide } = useQuery({
    queryKey: ["gamesSlide", { limit: 1, offset: 0 }],
    queryFn: () => productApi.getProducts(1, 0),
    refetchOnWindowFocus: false,
  });
  return (
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        {gamesSlide?.map((game) => (
          <div
            key={game.productId}
            className="h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${game.img}')`,
              // "url('https://images3.alphacoders.com/136/1369675.jpeg')",
            }}
          >
            <div className="container relative z-20 flex h-full flex-col justify-center ">
              <div className="max-w-[600px] space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  {game.productName}
                </h1>
                <p className="text-lg text-white/90">{game.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Mua ngay
                  </Button>
                  <Link to={`/products/${game.productId}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-whitebg-white/10"
                    >
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured Games</h2>
          <Link
            to=""
            className="flex items-center text-sm font-medium text-primary"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        {games && <FeaturedGameCarousel featuredGames={games} />}
      </section>
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-primary"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {!gameCategories ? (
            <p>Đang tải danh mục...</p>
          ) : (
            gameCategories
              .slice(0, 4)
              .map((category) => (
                <CategoryCard key={category.cate_ID} category={category} />
              ))
          )}
        </div>
      </section>
      <section className="bg-muted py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Special Offers
            </h2>
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-primary"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!games ? (
              <p>Đang tải danh mục...</p>
            ) : (
              games.map((game) => (
                <GameCard
                  key={game.productId}
                  productName={game.productName}
                  img={game.img || "/placeholder.svg?height=300&width=200"}
                  price={game.price}
                  stock={game.stock}
                  productId={game.productId}
                  categoryName={game.categoryName}
                  description={game.description}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">New Releases</h2>
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-primary"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!gamesSlide ? (
            <p>Đang tải danh mục...</p>
          ) : (
            gamesSlide.map((game) => (
              <GameCard
                key={game.productId}
                productName={game.productName}
                img={game.img || "/placeholder.svg?height=300&width=200"}
                price={game.price}
                stock={game.stock}
                productId={game.productId}
                categoryName={game.categoryName}
                description={game.description}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};
export default HomePage;
