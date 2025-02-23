"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { homeItems, menuItems } from "./Sidebar"

interface MobileSidebarProps {
    setIsOpen: (open: boolean) => void
}

export default function MobileSidebar({ setIsOpen }: MobileSidebarProps) {
    const pathname = usePathname()

    const handleClick = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col h-full py-4">
            <nav className="flex-1 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                {/* Home Items */}
                {homeItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClick}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1",
                            pathname === item.href
                                ? "bg-purple-600 text-white"
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <img className="h-5 w-5" src={item.icon.src} alt={item.label} />
                        <span>{item.label}</span>
                    </Link>
                ))}

                {/* Divider */}
                <div className="my-2 mx-2 border-t border-border" />

                {/* Menu Items */}
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClick}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1",
                            pathname === item.href
                                ? "bg-purple-600 text-white"
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <img className="h-5 w-5" src={item.icon.src} alt={item.label} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}