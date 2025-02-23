import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/lib/utils'
import Analytics from '@/components/analytics'
import Ads from '@/components/ads'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Traffic Tap Puzzle - Play Traffic Tap Puzzle Game Free Online',
    description: 'Dive into Traffic Tap Puzzle, a challenging logic game where you control traffic at busy intersections. Use power-ups, unlock cars, and avoid collisions to ensure a smooth flow of traffic. Perfect for puzzle enthusiasts!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Analytics />
            {/* <Ads /> */}
            <body className={`${inter.className} bg-background`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem forcedTheme="dark">
                    <div className="min-h-screen">
                        <Header />
                        <div className="flex">
                            {/* <Sidebar /> */}
                            <main className={cn(
                                "flex-1 py-4 ml-16"
                            )}>
                                {children}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}