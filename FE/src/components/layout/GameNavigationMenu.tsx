"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/services/categoryApi";

// const gameCategories: { title: string; href: string; description: string }[] = [
//   {
//     title: "Action",
//     href: "/categories/action",
//     description: "Fast-paced games focused on challenging players' reaction time and hand-eye coordination.",
//   },
//   {
//     title: "Adventure",
//     href: "/categories/adventure",
//     description: "Story-driven games that emphasize exploration and puzzle-solving in immersive worlds.",
//   },
//   {
//     title: "RPG",
//     href: "/categories/rpg",
//     description: "Role-playing games with character development, rich narratives, and decision-making.",
//   },
//   {
//     title: "Strategy",
//     href: "/categories/strategy",
//     description: "Games that prioritize thoughtful planning and resource management to achieve victory.",
//   },
//   {
//     title: "Simulation",
//     href: "/categories/simulation",
//     description: "Realistic games that simulate real-world activities, vehicles, or life situations.",
//   },
//   {
//     title: "Sports",
//     href: "/categories/sports",
//     description: "Competitive games based on real-world sports and athletic competitions.",
//   },
// ]


const platforms: { title: string; href: string; description: string }[] = [
  {
    title: "PC",
    href: "/platforms/pc",
    description:
      "Games available for Windows, Mac, and Linux desktop computers.",
  },
  {
    title: "PlayStation 5",
    href: "/platforms/ps5",
    description: "The latest generation of Sony's popular gaming console.",
  },
  {
    title: "Xbox Series X/S",
    href: "/platforms/xbox",
    description:
      "Microsoft's newest gaming consoles with next-gen performance.",
  },
  {
    title: "Nintendo Switch",
    href: "/platforms/switch",
    description: "Nintendo's hybrid console for both home and portable gaming.",
  },
];

export function GameNavigationMenu() {
    const { data: gameCategories } = useQuery({
        queryKey: ["gameCategories"],
        queryFn: categoryApi.getCategories,
        refetchOnWindowFocus: false,
      });
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            {!gameCategories ? (
              <p>Đang tải danh mục...</p>
            ) : (
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {gameCategories.map((category) => (
                  <ListItem
                    key={category.cate_ID}
                    title={category.name}
                    href={`/categories/${category.cate_ID}`}
                  >
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platforms</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/platforms"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      All Platforms
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse our complete collection of games across all gaming
                      platforms.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {platforms.map((platform) => (
                <ListItem
                  key={platform.title}
                  title={platform.title}
                  href={platform.href}
                >
                  {platform.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/deals"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      GameVault Deals
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover amazing discounts and special offers on your
                      favorite games.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/deals/weekly-specials" title="Weekly Specials">
                New deals every week with discounts up to 80% off.
              </ListItem>
              <ListItem href="/deals/clearance" title="Clearance">
                Last chance to grab games at rock-bottom prices.
              </ListItem>
              <ListItem href="/deals/pre-order" title="Pre-order Bonuses">
                Special bonuses and discounts when you pre-order upcoming
                titles.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              New Releases
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
