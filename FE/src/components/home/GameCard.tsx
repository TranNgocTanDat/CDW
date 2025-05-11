"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"

interface GameCardProps {
  title: string
  imageUrl: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  isNew?: boolean
}

export function GameCard({ title, imageUrl, price, originalPrice, discount, rating, isNew }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all duration-300 group p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className={cn("object-cover transition-transform duration-500", isHovered && "scale-110")}
        />
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        {discount && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">-{discount}%</Badge>}
        {isNew && <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">New</Badge>}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
          )}
        >
          <Button className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <Link to="/" className="block">
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">{title}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm ml-1">{rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
