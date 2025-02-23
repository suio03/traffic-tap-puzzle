import React from 'react'
import { FolderOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const NoGame = () => {
    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="bg-purple-100 p-4 rounded-full">
                    <FolderOpen className="w-12 h-12 text-purple-500" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-800">
                    No Games Available Yet
                </h3>

                <p className="text-gray-600 max-w-md">
                    We're working on adding exciting new games to this category. Check back soon for updates or explore other categories!
                </p>

                <div className="pt-4">
                    <a
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                    >
                        Browse Featured Games
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}

export default NoGame