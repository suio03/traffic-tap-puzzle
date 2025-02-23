import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Game {
    id: string
    title: string
    thumbnail_url: string
    slug: string
}

export default function GameCard(game: Game) {
    return (
        <Link href={`/game/${game.slug}`}>
            <Card className={cn(
                "overflow-hidden transition-transform hover:scale-105 w-48 h-full",
            )}>
                <CardContent className="p-0">
                    <div className="aspect-[16/10] relative w-full bg-black [&:hover>div]:opacity-100 [&:hover>div>h2]:translate-y-0">
                        <Image
                            src={game.thumbnail_url || ''}
                            alt={game.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 p-4">
                            <p className="absolute bottom-1 right-1 text-slate-200 font-semibold text-xs">
                                {game.title}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card> 
        </Link>
    )
}