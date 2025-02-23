'use client'

import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import NoGame from '../NoGame'
interface Game {
    id: string
    title: string
    thumbnail_url: string
    slug: string
}

const GameGrid = ({ categoryId }: { categoryId: string }) => {
    const [games, setGames] = useState<Game[]>([])
    const [error, setError] = useState(false)
    const [visibleGames, setVisibleGames] = useState(12)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`/api/categories/game/${categoryId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch games')
                }
                const data = await response.json()
                setGames(data)
                setError(false)
            } catch (error) {
                console.error('Error fetching games:', error)
                setError(true)
            }
        }
        fetchGames()
    }, [categoryId])
    if (error || !games || games.length === 0) {
        return <NoGame />
    }

    return (
        <div className="space-y-8 pt-16">

            <div className="relative w-full px-4 sm:px-8 md:px-16 lg:pl-24">
                {/* Category Title & Info */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-100 mb-2">Popular Games</h1>
                    <p className="text-gray-400">Discover and play the most exciting games</p>
                </div>

                Game Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {games && games.slice(0, visibleGames).map((game) => (
                        <GameCard key={game.id} {...game} />
                    ))}
                </div>

                {/* Load More Button */}
                {visibleGames < games.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setVisibleGames(prev => prev + 12)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            Load More Games
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GameGrid