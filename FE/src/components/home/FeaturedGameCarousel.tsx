"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { useMobile } from "@/hooks/use-moblie";
import type { ProductResponse } from "@/model/Product";
import { Link } from "react-router-dom";

interface FeaturedGameCarouselProps {
  featuredGames: ProductResponse[];
}

export function FeaturedGameCarousel({
  featuredGames,
}: FeaturedGameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useMobile();

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating]
  );

  const goToPrevSlide = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? featuredGames.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNextSlide = useCallback(() => {
    const newIndex =
      currentIndex === featuredGames.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  const currentGame = featuredGames[currentIndex];

  return (
    <div className="relative">
      <Card className="overflow-hidden border-0 rounded-xl py-0">
        <div className="relative aspect-[21/9] md:aspect-[21/9]">
          <img
            src={currentGame.img || "/placeholder.svg"}
            alt={currentGame.productName}
            // fill
            className="object-cover transition-transform duration-500 ease-in-out w-full h-[548px] "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <CardContent className="absolute inset-0 flex items-center p-6 md:p-10">
            <div className="max-w-lg space-y-4">
              {/* {currentGame.badge && (
                <Badge
                  className={
                    currentGame.discount > 0 ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                  }
                >
                  {currentGame.badge}
                </Badge>
              )} */}
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                {currentGame.productName}
              </h3>
              <p className="text-white/80 hidden md:block">
                {currentGame.description}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">
                  ${currentGame.price.toFixed(2)}
                </span>
                {currentGame.price && (
                  <span className="text-sm text-white/70 line-through">
                    ${currentGame.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="bg-primary hover:bg-primary/90">
                  Buy Now
                </Button>
                <Link to={`/products/${currentGame.productId}`}>
                  <Button variant="outline" className="text-whitebg-white/10">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-4"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {!isMobile && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full hover:bg-black/50 z-10"
            onClick={goToPrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full hover:bg-black/50 z-10"
            onClick={goToNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
    </div>
  );
}
