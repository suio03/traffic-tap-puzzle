"use client"
import Link from "next/link"
import { Search, Bell, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import MobileSidebar from "./MobileSidebar"
import Logo04 from "@/public/images/logo.svg"
import Logo05 from "@/public/images/logo.png"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex items-center justify-between h-full px-4 mx-auto max-w-[1920px]">
                <div className="flex items-center gap-2">
                    {/* <Dialog open={open} onOpenChange={setOpen}>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>
                                <MobileSidebar setIsOpen={setOpen} />
                            </SheetContent>
                        </Sheet>
                    </Dialog> */}
                    <Link href="/">
                        <img src={Logo05.src} alt="CZFun Games" className="h-16" />
                    </Link>
                </div>
            </div>
        </header>
    )
}