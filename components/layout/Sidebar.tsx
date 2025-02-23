"use client"
import TwoPlayers from "@/public/images/categories/2players.svg"
import Music from "@/public/images/categories/Music.svg"
import Action from "@/public/images/categories/Action.svg"
import Adventure from "@/public/images/categories/Adventure.svg"
import Puzzle from "@/public/images/categories/Puzzle.svg"
import Basketball from "@/public/images/categories/Basketball.svg"
import Beauty from "@/public/images/categories/Beauty.svg"
import Bike from "@/public/images/categories/Bike.svg"
import Card from "@/public/images/categories/Card.svg"
import Car from "@/public/images/categories/Car.svg"
import Casual from "@/public/images/categories/Casual.svg"
import Clicker from "@/public/images/categories/Clicker.svg"
import Controller from "@/public/images/categories/Controller.svg"
import Horror from "@/public/images/categories/Horror.svg"
import DressUp from "@/public/images/categories/DressUp.svg"
import Escape from "@/public/images/categories/Escape.svg"
import FPShooter from "@/public/images/categories/FPS.svg"
import Driving from "@/public/images/categories/Driving.svg"
import Home from "@/public/images/categories/Home.svg"
import Mahjong from "@/public/images/categories/Mahjong.svg"
import Minecraft from "@/public/images/categories/Minecraft.svg"
import New from "@/public/images/categories/New.svg"
import Pool from "@/public/images/categories/Pool.svg"
import Recent from "@/public/images/categories/Recent.svg"
import Soccer from "@/public/images/categories/Soccer.svg"
import Sports from "@/public/images/categories/Sports.svg"
import TowerDefense from "@/public/images/categories/TowerDefense.svg"
import Trending from "@/public/images/categories/Trending.svg"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const homeItems = [
    { icon: Home, label: "Home", href: "/" },
    // { icon: Recent, label: "Recent", href: "/recent" },
    // { icon: New, label: "New", href: "/new" },
    // { icon: Trending, label: "Trending", href: "/trending" },
]

export const menuItems = [
    // { icon: TwoPlayers, label: "2 Players", href: "/2players", slug: "2players" },
    { icon: Action, label: "Action", href: "/action", slug: "action" },
    { icon: Adventure, label: "Adventure", href: "/adventure", slug: "adventure" },
    { icon: Puzzle, label: "Puzzle", href: "/puzzle", slug: "puzzle" },
    { icon: Music, label: "Music", href: "/music", slug: "music" },
    // { icon: Basketball, label: "Basketball", href: "/basketball", slug: "basketball" },
    // { icon: Beauty, label: "Beauty", href: "/beauty", slug: "beauty" },
    // { icon: Bike, label: "Bike", href: "/bike", slug: "bike" },
    // { icon: Card, label: "Card", href: "/card", slug: "card" },
    // { icon: Car, label: "Car", href: "/car", slug: "car" },
    { icon: Casual, label: "Casual", href: "/casual", slug: "casual" },
    { icon: Clicker, label: "Clicker", href: "/clicker", slug: "clicker" },
    // { icon: Controller, label: "Controller", href: "/controller", slug: "controller" },
    // { icon: Horror, label: "Horror", href: "/horror", slug: "horror" },
    // { icon: DressUp, label: "Dress Up", href: "/dressup", slug: "dressup" },
    // { icon: Escape, label: "Escape", href: "/escape", slug: "escape" },
    // { icon: FPShooter, label: "FPS", href: "/fps", slug: "fps" },
    // { icon: Driving, label: "Driving", href: "/driving", slug: "driving" },
    // { icon: Mahjong, label: "Mahjong", href: "/mahjong", slug: "mahjong" },
    { icon: Minecraft, label: "Minecraft", href: "/minecraft", slug: "minecraft" },
    // { icon: Pool, label: "Pool", href: "/pool", slug: "pool" },
    // { icon: Soccer, label: "Soccer", href: "/soccer", slug: "soccer" },
    // { icon: Sports, label: "Sports", href: "/sports", slug: "sports" },
    // { icon: TowerDefense, label: "Tower Defense", href: "/towerdefense", slug: "towerdefense" },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border",
                "transition-all duration-300 group hover:w-60",
                "w-16",
                "hidden md:block",
                "z-20",
                "group-hover:z-50",
                "overflow-hidden hover:overflow-y-auto"
            )}
        >
            <div className="flex flex-col h-full">
                <nav className={cn(
                    "flex-1 p-2",
                    "pr-3"
                )}>
                    {/* Home Items */}
                    {homeItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <TooltipProvider key={item.href} delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 z-50",
                                                "hover:scale-105",
                                                "mb-1",
                                                isActive
                                                    ? "bg-purple-600 text-white"
                                                    : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            <img className={cn(
                                                "h-5 w-5 flex-shrink-0",
                                                "transition-transform duration-300",
                                                "hover:rotate-6"
                                            )} src={item.icon.src} alt={item.label} />
                                            <span className={cn(
                                                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                                "whitespace-nowrap"
                                            )}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })}

                    {/* Divider */}
                    <div className="my-2 mx-2 border-t border-border" />

                    {/* Menu Items */}
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <TooltipProvider key={item.href} delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 z-50",
                                                "hover:scale-105",
                                                "mb-1",
                                                isActive
                                                    ? "bg-purple-600 text-white"
                                                    : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            <img className={cn(
                                                "h-5 w-5 flex-shrink-0",
                                                "transition-transform duration-300",
                                                "hover:rotate-6"
                                            )} src={item.icon.src} alt={item.label} />
                                            <span className={cn(
                                                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                                "whitespace-nowrap"
                                            )}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}