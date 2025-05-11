import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

interface CategoryCardProps {
  name: string;
  // imageUrl: string;
  // count: number;
}

export function CategoryCard({ name, /*imageUrl, count*/ }: CategoryCardProps) {
  return (
    <Link to="/" className="block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group p-0">
        <div className="relative aspect-square">
          {/* <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            {/* <p className="text-sm text-white/80">{count} games</p> */}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
