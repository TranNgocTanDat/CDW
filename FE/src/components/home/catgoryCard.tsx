import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/model/Category";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category?: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category?.cate_ID}`} className="block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group p-0">
        <div className="relative aspect-square">
          <img
            src={category?.urlImage}
            alt={category?.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-xl font-semibold text-white">{category?.name}</h3>
            <p className="text-sm text-white/80">{category?.count} games</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
