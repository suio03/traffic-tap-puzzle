import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Set the scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    if (!isVisible) {
        return null
    }

    return (
        <Button
            className="fixed bottom-4 right-4 rounded-full p-2 z-50 
                      transition-all duration-300 ease-in-out
                      hover:scale-110 hover:shadow-lg
                      hover:bg-primary/90 hover:-translate-y-1"
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <ArrowUp className="h-4 w-4" />
            <span className="text-xs">Back to top</span>
        </Button>
    )
}