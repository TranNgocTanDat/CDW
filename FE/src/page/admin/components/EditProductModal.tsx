"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type {  ProductRequest, ProductResponse } from "@/model/Product";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductRequest, id?: number) => void;
  product?: ProductResponse | null;
}

export function AddEditProductModal({ open, onClose, onSave, product }: Props) {
  const [form, setForm] = useState<ProductRequest>({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
    img: "",
    cate_ID: undefined as unknown as number,
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName,
        description: product.description,
        price: product.price,
        stock: product.stock,
        img: product.img,
        cate_ID:  product?.cate_ID ?? undefined as unknown as number, // Assuming categoryId is available in product
      });
    } else {
      setForm({
        productName: "",
        description: "",
        price: 0,
        stock: 0,
        img: "",
        cate_ID: undefined as unknown as number,
      });
    }
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Edit" : "Add"} Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          />
          <Input
            placeholder="Category"
            value={form.cate_ID}
            onChange={(e) => setForm({ ...form, cate_ID: Number(e.target.value) })}
          />
          <Input
            placeholder="Image URL"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
          />
          <div className="flex justify-end">
            <Button onClick={() => onSave(form, product?.productId)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
