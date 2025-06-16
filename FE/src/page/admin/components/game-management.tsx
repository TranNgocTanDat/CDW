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
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [productEditing, setProductEditing] = useState<ProductResponse | null>(null);
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: products
  } = useQuery<ProductResponse[]>({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
    refetchOnWindowFocus: false,
  });

  const filteredGames = (products ?? []).filter((game) =>
    game.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductRequest }) =>
      productApi.updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleSaveProduct = async (data: ProductRequest, id?: number) => {
    try {
      if (id) {
        await updateProductMutation.mutateAsync({ id, data });
      } else {
        await createProductMutation.mutateAsync(data);
      }

      setOpen(false);
      setProductEditing(null);
    } catch (error) {
      console.error("Lưu thất bại", error);
    }
  };

  return (
    <div className="space-y-6 mx-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý trò chơi</h1>
          <p className="text-muted-foreground">
            Quản lý danh mục và kho trò chơi của bạn
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm trò chơi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh mục trò chơi</CardTitle>
          <CardDescription>Quản lý tất cả trò chơi trong cửa hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm trò chơi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên trò chơi</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Đánh giá</TableHead>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setProductEditing(game);
                            setOpen(true);
                          }}
                        >
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>Xem phân tích</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Nhân bản</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (
                              confirm("Bạn có chắc chắn muốn xóa trò chơi này?")
                            ) {
                              deleteProductMutation.mutate(game.productId);
                            }
                          }}
                        >
                          Xóa
                        </DropdownMenuItem>
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
