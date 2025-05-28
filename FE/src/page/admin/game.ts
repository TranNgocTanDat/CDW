export interface Game {
    id: string
    slug: string
    title: string
    description: string
    imageUrl: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    releaseDate: string
    developer: string
    publisher: string
    categories: string[]
    platforms: string[]
    isNew?: boolean
    isFeatured?: boolean
    screenshots: string[]
    systemRequirements?: {
      minimum: {
        os: string
        processor: string
        memory: string
        graphics: string
        storage: string
      }
      recommended: {
        os: string
        processor: string
        memory: string
        graphics: string
        storage: string
      }
    }
  }
  
  export const games: Game[] = [
    {
      id: "1",
      slug: "cyber-nexus-2077",
      title: "Cyber Nexus 2077",
      description:
        "An open-world, action-adventure RPG set in a dystopian future where cybernetic enhancements are the norm. Play as a mercenary outlaw and navigate the dangerous streets of Night City.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 29.99,
      originalPrice: 59.99,
      discount: 50,
      rating: 4.5,
      releaseDate: "2023-09-15",
      developer: "CD Project Red",
      publisher: "CD Project",
      categories: ["action", "rpg", "adventure"],
      platforms: ["pc", "ps5", "xbox-series"],
      isFeatured: true,
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 10 (64-bit)",
          processor: "Intel Core i5-3570K or AMD FX-8310",
          memory: "8 GB RAM",
          graphics: "NVIDIA GTX 970 or AMD Radeon RX 470",
          storage: "70 GB available space",
        },
        recommended: {
          os: "Windows 10 (64-bit)",
          processor: "Intel Core i7-4790 or AMD Ryzen 3 3200G",
          memory: "12 GB RAM",
          graphics: "NVIDIA GTX 1060 6GB or AMD Radeon RX 590",
          storage: "70 GB SSD",
        },
      },
    },
    {
      id: "2",
      slug: "eternal-quest-ix",
      title: "Eternal Quest IX",
      description:
        "The latest installment in the legendary JRPG series. Embark on an epic journey across fantastical realms, battle fearsome monsters, and uncover the secrets of the ancient world.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 19.99,
      originalPrice: 39.99,
      discount: 50,
      rating: 4.8,
      releaseDate: "2023-07-22",
      developer: "Square Phoenix",
      publisher: "Square Phoenix",
      categories: ["rpg", "adventure"],
      platforms: ["pc", "ps5", "ps4", "switch"],
      isFeatured: true,
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "3",
      slug: "galaxy-warriors",
      title: "Galaxy Warriors",
      description:
        "A space combat simulator that puts you in the cockpit of advanced starfighters. Defend your faction, complete missions, and dominate the galaxy in intense dogfights.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 24.99,
      originalPrice: 49.99,
      discount: 50,
      rating: 4.2,
      releaseDate: "2023-05-10",
      developer: "Stellar Games",
      publisher: "Cosmic Entertainment",
      categories: ["action", "simulation"],
      platforms: ["pc", "ps5", "xbox-series"],
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "4",
      slug: "medieval-legends",
      title: "Medieval Legends",
      description:
        "A historically-inspired strategy game where you build your kingdom, form alliances, wage wars, and navigate the complex politics of medieval Europe.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 14.99,
      originalPrice: 29.99,
      discount: 50,
      rating: 4.6,
      releaseDate: "2023-03-18",
      developer: "Historical Interactive",
      publisher: "Strategy Masters",
      categories: ["strategy", "simulation"],
      platforms: ["pc"],
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "5",
      slug: "shadow-realm",
      title: "Shadow Realm",
      description:
        "A dark fantasy action-adventure where you play as a cursed hero navigating a world between life and death. Defeat nightmarish creatures and restore balance to the realms.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 59.99,
      rating: 4.9,
      releaseDate: "2023-11-05",
      developer: "Umbra Studios",
      publisher: "Dark Horse Games",
      categories: ["action", "adventure"],
      platforms: ["pc", "ps5", "xbox-series"],
      isNew: true,
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "6",
      slug: "astral-frontiers",
      title: "Astral Frontiers",
      description:
        "An expansive space exploration game where you discover new planets, encounter alien civilizations, and build your own interstellar empire.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 49.99,
      rating: 4.7,
      releaseDate: "2023-10-20",
      developer: "Cosmic Voyages",
      publisher: "Interstellar Games",
      categories: ["adventure", "simulation", "strategy"],
      platforms: ["pc", "ps5", "xbox-series"],
      isNew: true,
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "7",
      slug: "dragons-keep",
      title: "Dragon's Keep",
      description:
        "A fantasy RPG where you play as a dragon hunter in a world overrun by these mythical beasts. Forge alliances, craft weapons, and become the ultimate dragon slayer.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 39.99,
      rating: 4.5,
      releaseDate: "2023-10-12",
      developer: "Mythic Entertainment",
      publisher: "Fantasy Games",
      categories: ["rpg", "action"],
      platforms: ["pc", "ps5", "ps4", "xbox-series", "xbox-one"],
      isNew: true,
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "8",
      slug: "neon-drift",
      title: "Neon Drift",
      description:
        "A high-octane racing game set in a futuristic cyberpunk world. Customize your hover vehicle, compete in dangerous street races, and rise to the top of the underground racing scene.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 29.99,
      rating: 4.3,
      releaseDate: "2023-09-30",
      developer: "Velocity Studios",
      publisher: "Turbo Games",
      categories: ["racing", "action"],
      platforms: ["pc", "ps5", "ps4", "xbox-series", "xbox-one", "switch"],
      isNew: true,
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "9",
      slug: "puzzle-dimensions",
      title: "Puzzle Dimensions",
      description:
        "A mind-bending puzzle game that plays with physics and perspective. Solve increasingly complex challenges across multiple dimensions and realities.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 19.99,
      rating: 4.4,
      releaseDate: "2023-08-15",
      developer: "Mind Games",
      publisher: "Puzzle Masters",
      categories: ["puzzle"],
      platforms: ["pc", "ps4", "xbox-one", "switch"],
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "10",
      slug: "football-champions-24",
      title: "Football Champions 24",
      description:
        "The latest installment in the premier football simulation series. Features updated teams, improved gameplay mechanics, and the most realistic football experience to date.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 59.99,
      rating: 4.1,
      releaseDate: "2023-09-22",
      developer: "Sports Interactive",
      publisher: "Athletic Games",
      categories: ["sports", "simulation"],
      platforms: ["pc", "ps5", "ps4", "xbox-series", "xbox-one"],
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "11",
      slug: "mystic-isles",
      title: "Mystic Isles",
      description:
        "A relaxing adventure game where you explore a series of beautiful islands, solve gentle puzzles, and uncover the secrets of an ancient civilization.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 24.99,
      rating: 4.7,
      releaseDate: "2023-07-05",
      developer: "Serene Studios",
      publisher: "Calm Games",
      categories: ["adventure", "puzzle"],
      platforms: ["pc", "switch"],
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "12",
      slug: "tactical-force",
      title: "Tactical Force",
      description:
        "A team-based tactical shooter that emphasizes strategy and coordination. Lead your squad through high-stakes missions and outmaneuver your opponents.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 14.99,
      originalPrice: 29.99,
      discount: 50,
      rating: 4.3,
      releaseDate: "2023-06-10",
      developer: "Strategic Games",
      publisher: "Tactical Entertainment",
      categories: ["action", "strategy"],
      platforms: ["pc", "ps5", "xbox-series"],
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "13",
      slug: "city-architect",
      title: "City Architect",
      description:
        "A detailed city-building simulation where you design, build, and manage your own metropolis. Balance the needs of your citizens with economic growth and environmental concerns.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 34.99,
      rating: 4.6,
      releaseDate: "2023-05-25",
      developer: "Urban Designs",
      publisher: "Simulation Masters",
      categories: ["simulation", "strategy"],
      platforms: ["pc"],
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "14",
      slug: "monster-tamers",
      title: "Monster Tamers",
      description:
        "Catch, train, and battle with hundreds of unique monsters in this creature-collecting RPG. Explore a vast world and become the ultimate Monster Tamer champion.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 39.99,
      rating: 4.8,
      releaseDate: "2023-04-15",
      developer: "Creature Studios",
      publisher: "Monster Games",
      categories: ["rpg", "adventure"],
      platforms: ["pc", "switch"],
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
    {
      id: "15",
      slug: "rhythm-masters",
      title: "Rhythm Masters",
      description:
        "A music rhythm game featuring tracks from popular artists across multiple genres. Test your timing and coordination with increasingly challenging beat patterns.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 19.99,
      rating: 4.4,
      releaseDate: "2023-03-30",
      developer: "Beat Box Studios",
      publisher: "Music Games",
      categories: ["music", "action"],
      platforms: ["pc", "ps5", "ps4", "xbox-series", "xbox-one", "switch"],
      screenshots: ["/placeholder.svg?height=600&width=1000", "/placeholder.svg?height=600&width=1000"],
    },
    {
      id: "16",
      slug: "survival-island",
      title: "Survival Island",
      description:
        "A survival game where you're stranded on a remote island. Craft tools, build shelter, hunt for food, and explore dangerous territories while trying to find a way home.",
      imageUrl: "/placeholder.svg?height=300&width=200",
      price: 24.99,
      rating: 4.2,
      releaseDate: "2023-02-20",
      developer: "Wilderness Studios",
      publisher: "Survival Games",
      categories: ["adventure", "simulation"],
      platforms: ["pc", "ps4", "xbox-one"],
      screenshots: [
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
        "/placeholder.svg?height=600&width=1000",
      ],
    },
  ]
  