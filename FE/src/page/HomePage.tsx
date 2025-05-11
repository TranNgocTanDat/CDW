import { FeaturedGameCarousel } from "@/components/home/FeaturedGameCarousel";
import { GameCard } from "@/components/home/GameCard";
import { CategoryCard } from "@/components/home/catgoryCard";
import { Button } from "@/components/ui/button";
import categoryApi from "@/services/categoryApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const HomePage = () => {
  const { data: gameCategories } = useQuery({
    queryKey: ["gameCategories"],
    queryFn: categoryApi.getCategories,
    refetchOnWindowFocus: false,
  });
  return (
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div
          className="h-[500px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images3.alphacoders.com/136/1369675.jpeg')",
          }}
        >
          <div className="container relative z-20 flex h-full flex-col justify-center ">
            <div className="max-w-[600px] space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Discover Your Next Gaming Adventure
              </h1>
              <p className="text-lg text-white/90">
                Explore thousands of games with exclusive deals and instant
                downloads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  View Deals
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured Games</h2>
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-primary"
          >
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <FeaturedGameCarousel />
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
            gameCategories.map((category) => (
              <CategoryCard
                key={category.cate_ID}
                name={category.name}
                // imageUrl={
                //   category.imageUrl || "/placeholder.svg?height=200&width=200"
                // }
                // count={category.count || 0}
              />
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
            <GameCard
              title="Cyber Nexus 2077"
              imageUrl="/placeholder.svg?height=300&width=200"
              price={29.99}
              originalPrice={59.99}
              discount={50}
              rating={4.5}
            />
            <GameCard
              title="Eternal Quest IX"
              imageUrl="/placeholder.svg?height=300&width=200"
              price={19.99}
              originalPrice={39.99}
              discount={50}
              rating={4.8}
            />
            <GameCard
              title="Galaxy Warriors"
              imageUrl="/placeholder.svg?height=300&width=200"
              price={24.99}
              originalPrice={49.99}
              discount={50}
              rating={4.2}
            />
            <GameCard
              title="Medieval Legends"
              imageUrl="/placeholder.svg?height=300&width=200"
              price={14.99}
              originalPrice={29.99}
              discount={50}
              rating={4.6}
            />
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
          <GameCard
            title="Shadow Realm"
            imageUrl="/placeholder.svg?height=300&width=200"
            price={59.99}
            rating={4.9}
            isNew={true}
          />
          <GameCard
            title="Astral Frontiers"
            imageUrl="/placeholder.svg?height=300&width=200"
            price={49.99}
            rating={4.7}
            isNew={true}
          />
          <GameCard
            title="Dragon's Keep"
            imageUrl="/placeholder.svg?height=300&width=200"
            price={39.99}
            rating={4.5}
            isNew={true}
          />
          <GameCard
            title="Neon Drift"
            imageUrl="/placeholder.svg?height=300&width=200"
            price={29.99}
            rating={4.3}
            isNew={true}
          />
        </div>
      </section>
    </main>
  );
};
export default HomePage;
