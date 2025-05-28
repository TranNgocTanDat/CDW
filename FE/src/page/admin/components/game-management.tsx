"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Filter, Star } from "lucide-react"
import { useQuery,  } from "@tanstack/react-query"
import type {  ProductResponse } from "@/model/Product"
import productApi from "@/services/productApi"

export function GameManagement() {

  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: products
  } = useQuery<ProductResponse[]>({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
    refetchOnWindowFocus: false,
  });

  const filteredGames = (products?? []).filter((game) => game.productName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6 mx-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Game Management</h1>
          <p className="text-muted-foreground">Manage your game catalog and inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Game Catalog</CardTitle>
          <CardDescription>Manage all games in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.slice(0, 10).map((game) => (
                <TableRow key={game.productId}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-8 overflow-hidden rounded">
                        <img
                          src={game.img || "/placeholder.svg"}
                          alt={game.productName}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{game.productName}</p>
                        <p className="text-xs text-muted-foreground">{game.productName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{(game.price)}</p>
                      {game.price && (
                        <p className="text-xs text-muted-foreground line-through">{(game.price)}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                        <Badge key={game.categoryName} variant="secondary" className="text-xs">
                          {game.categoryName}
                        </Badge>
                      
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{game.stock}</span>
                    </div>
                  </TableCell>
                  {/* <TableCell className="text-sm">{new Date(game.releaseDate).toLocaleDateString()}</TableCell> */}
                  {/* <TableCell>
                    <Badge variant={game.isNew ? "default" : "secondary"}>{game.isNew ? "New" : "Active"}</Badge>
                  </TableCell> */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Game</DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Game</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
