"use client"
import GameDetailSections from "@/components/games/GameDetail"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Maximize2, ThumbsUp, ThumbsDown, Play, X } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import Logo from "@/public/images/logo.png"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BackToTop } from "@/components/BackToTop"
import { Progress } from "@/components/ui/progress"
export const runtime = 'edge'

interface Game {
    id: string
    title: string
    thumbnail_url: string
    embed_url: string
    slug: string
    category_id: string
    metadata: any
    content: string
    created_at: Date
    updated_at: Date
}

// Add this near the top of the file, after other interfaces
interface FullscreenElement extends HTMLElement {
    requestFullscreen: (options?: FullscreenOptions) => Promise<void>
    webkitRequestFullscreen: () => Promise<void>
    mozRequestFullScreen: () => Promise<void>
    msRequestFullscreen: () => Promise<void>
}

interface FullscreenDocument extends Document {
    exitFullscreen: () => Promise<void>
    webkitExitFullscreen: () => Promise<void>
    mozCancelFullScreen: () => Promise<void>
    msExitFullscreen: () => Promise<void>
}

interface GamePageProps {
    params: {
        slug: string
    }
}



// New mock data for sidebars
const popularGames: Game[] = [
    {
        id: "4",
        title: "Space Warriors",
        thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
        embed_url: "https://frivez.com/games/cartoon-strike/index.html",
        slug: "space-warriors",
        category_id: "1",
        metadata: {},
        content: "",
        created_at: new Date(),
        updated_at: new Date(),
    }
    // Add more games...
]

const relatedGames: Game[] = [
    {
        id: "5",
        title: "Medieval Conquest",
        thumbnail_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
        embed_url: "https://frivez.com/games/cartoon-strike/index.html",
        slug: "medieval-conquest",
        category_id: "1",
        metadata: {},
        content: "",
        created_at: new Date(),
        updated_at: new Date(),
    },
]

// Separate GameCard component for sidebars
const SidebarGameCard = ({ game }: { game: Game }) => (
    <div
        className="relative group cursor-pointer hover:scale-105 transition-transform duration-200"
        role="article"
        aria-label={`${game.title} game card`}
    >
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            {/* if the slug is block-breaker-google, redirect to the home page */}
            <Link href={game.slug === 'block-breaker-google' ? '/' : `/${game.slug}`}>
                <img
                    src={game.thumbnail_url || ''}
                    alt={game.title}
                    className="object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* should put the center of the card */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                        <h3 className="text-sm font-medium text-white truncate">{game.title}</h3>
                    </div>
                </div>
            </Link>
        </div>
    </div>
)

// Sidebar Section Component
const SidebarSection = ({ title, games }: { title: string, games: Game[] }) => (
    <section
        className="bg-card rounded-lg border shadow-sm"
        aria-label={title}
    >
        <div className="">
            <div className="grid gap-4">
                {games.map((game) => (
                    <SidebarGameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    </section>
)

// Update the GameOverlay component to be more mobile-friendly
const GameOverlay = ({ onPlay, gameData }: { onPlay: () => void, gameData: Game }) => (
    <div className="absolute inset-0 backdrop-blur-lg flex flex-col items-center justify-center">
        <div className="absolute inset-0">
            <img
                src={gameData.thumbnail_url || ''}
                alt={`${gameData.title} game background`}
                className="w-full h-full object-cover opacity-20"
            />
        </div>

        <div className="relative z-20 flex flex-col items-center space-y-4 sm:space-y-6 px-4 py-6 sm:py-8 text-center">
            <div className="w-full max-w-[200px] sm:max-w-[280px] aspect-video rounded-lg overflow-hidden shadow-lg border border-white/10">
                <img
                    src={gameData.thumbnail_url || ''}
                    alt={`${gameData.title} game preview`}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-white">
                {gameData.title}
            </h2>

            <button
                onClick={onPlay}
                className="w-full max-w-[160px] sm:max-w-[200px] group relative flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
                <Play className="w-4 h-4" />
                <span className="font-medium text-sm sm:text-base">Play Game</span>
                <span className="absolute inset-0 rounded-lg animate-pulse bg-purple-500/20"></span>
            </button>
        </div>
    </div>
)

// Update the LoadingIndicator component
const LoadingIndicator = () => (
    <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center z-10">
        <div className="w-64 space-y-4">
            <h3 className="text-center text-sm text-muted-foreground mb-2">Loading game...</h3>
            <Progress value={33} className="h-2 bg-purple-950/50">
                <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-progress" />
            </Progress>
        </div>
    </div>
)

interface ScreenSize {
    width: number
    height: number
}

export default function GamePage({ params }: GamePageProps) {
    const [isGameLoading, setIsGameLoading] = useState(true)
    const [showOverlay, setShowOverlay] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [game, setGame] = useState<Game | null>(null)
    const [screenSize, setScreenSize] = useState<ScreenSize>({ width: 0, height: 0 })
    const [isMobile, setIsMobile] = useState(false)
    const [blockGames, setBlockGames] = useState<Game[]>([])
    useEffect(() => {
        const fetchGame = async () => {
            const game = await fetch(`/api/game/${params.slug}`, {
                method: 'GET',
            }).then(res => res.json())
            if (!game) {
                notFound()
            }
            setGame(game)
        }
        fetchGame()
    }, [])
    useEffect(() => {
        const fetchBlockGames = async () => {
            const blockGames = await fetch(`/api/game/block-game`, {
                method: 'GET',
            }).then(res => res.json())
            setBlockGames(blockGames)
        }
        fetchBlockGames()
    }, [])
    // Reference to the game container
    const gameContainerRef = useRef<HTMLDivElement>(null)
    const handlePlay = () => {
        setShowOverlay(false)
        setIsLoading(true)
        // Simulate loading time - replace with real loading logic if available
        setTimeout(() => {
            setIsLoading(false)
            setIsGameLoading(false)
        }, 2000)
    }
    const toggleFullscreen = () => {
        if (isMobile) {
            // For mobile, we'll use CSS to make it full viewport
            const gameFrame = gameContainerRef.current
            if (gameFrame) {
                gameFrame.style.position = isFullscreen ? 'relative' : 'fixed'
                gameFrame.style.top = isFullscreen ? 'auto' : '0'
                gameFrame.style.left = isFullscreen ? 'auto' : '0'
                gameFrame.style.width = isFullscreen ? '100%' : `${screenSize.width}px`
                gameFrame.style.height = isFullscreen ? '400px' : `${screenSize.height}px`
                gameFrame.style.zIndex = isFullscreen ? 'auto' : '50'
            }
            setIsFullscreen(!isFullscreen)
        } else {
            // Existing desktop fullscreen logic
            const element = gameContainerRef.current as unknown as FullscreenElement
            const doc = document as FullscreenDocument

            if (!isFullscreen) {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                }
            } else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen()
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen()
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen()
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen()
                }
            }
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                !!(document.fullscreenElement ||
                    (document as any).webkitFullscreenElement ||
                    (document as any).mozFullScreenElement ||
                    (document as any).msFullscreenElement)
            )
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
        }
    }, [])

    // Add this useEffect to detect screen size and mobile
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            setScreenSize({ width, height })
            setIsMobile(width <= 768) // Standard mobile breakpoint
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    if (!game) {
        return <div>Loading...</div>
    }
    return (
        <main className="container mx-auto max-w-5xl px-4 pt-16 sm:pt-20 pb-4 sm:pb-8" role="main" aria-label={`${game.title} game page`}>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent text-center my-12">
                Welcome to {game.title}
            </h2>
            <div className="grid grid-cols-1 
                md:grid-cols-[1fr,180px]
                2xl:grid-cols-[1fr,240px] 
                gap-6"
            >
                {/* Left Sidebar */}
                {/* <aside
                    className="hidden 2xl:block"
                    role="complementary"
                    aria-label="Popular games"
                >
                    <SidebarSection title="Popular Games" games={popularGames} />
                </aside> */}

                {/* Main Content */}
                <Card className="w-full">
                    <CardContent className="p-6">
                        {/* Game Cover Section */}
                        <div
                            className={`relative ${isFullscreen && isMobile ? 'fixed inset-0 z-50 bg-black' : 'h-[500px]'} rounded-t-lg overflow-hidden mt-4 sm:mt-0`}
                            ref={gameContainerRef}
                        >
                            {showOverlay && (
                                <GameOverlay
                                    onPlay={handlePlay}
                                    gameData={game}
                                />
                            )}
                            {isLoading && <LoadingIndicator />}
                            {!isGameLoading && (
                                <>
                                    <iframe
                                        src={game.embed_url || ''}
                                        className={`w-full h-full`}
                                        sandbox="allow-scripts allow-same-origin"
                                        allow="gamepad *;"
                                    />
                                    {isMobile && isFullscreen && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleFullscreen}
                                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                                            aria-label="Exit fullscreen"
                                        >
                                            <X className="h-6 w-6" />
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Action Bar - Add more spacing */}
                        <div className="p-4 sm:p-6 border-b">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <img src={Logo.src} alt="Google Block Breaker games" className="h-16 sm:h-24" />
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 sm:px-3"
                                                        onClick={toggleFullscreen}
                                                    >
                                                        <Maximize2 className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <GameDetailSections content={game.content} />
                    </CardContent>
                </Card>

                {/* Right Sidebar */}
                {/* <aside
                    className="hidden md:block"
                    role="complementary"
                    aria-label="Related games"
                >
                    <SidebarSection title="More Block Breaker Games" games={blockGames} />
                </aside> */}
            </div>
            <BackToTop />
        </main>
    )
}

