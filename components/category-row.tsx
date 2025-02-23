import Carousel from "@/components/games/GameCarousel"  // Changed this line
import GameCard from "./games/GameCard"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Game {
    id: string
    title: string
    thumbnail_url: string
    slug: string
}

interface CategoryRowProps {
    category: string
    href: string
    label: string
}

export function CategoryRow({ category, href, label }: CategoryRowProps) {
    const [games, setGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch(`/api/categories/game/${category}`)
            .then(res => res.json())
            .then(data => {
                setGames(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(`Error fetching ${category} games:`, error)
                setIsLoading(false)
            })
    }, [category])

    if (games.length === 0 && !isLoading) return null
    return (    
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">{label}</h2>
                {games.length >= 16 && (
                    <Link 
                        href={href}
                        className={cn(
                            "text-sm text-muted-foreground hover:text-primary transition-colors",
                            "hover:underline"
                        )}
                    >
                        View all
                    </Link>
                )}
            </div>
            
            {isLoading ? (
                <div className="flex gap-4 px-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="w-64 h-36 rounded-lg" />
                    ))}
                </div>
            ) : (
                <Carousel 
                    items={games.map((game) => (
                        <GameCard key={game.id} {...game} />
                    ))}
                />
            )}
        </section>
    )
}