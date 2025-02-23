"use client"

import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
    items: React.ReactNode[]
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const carouselRef = useRef<HTMLDivElement | null>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const handleWheel = (event: React.WheelEvent) => {
        // event.preventDefault()

        if (carouselRef.current) {
            carouselRef.current.scrollLeft += event.deltaY
            updateArrowVisibility()
        }
    }

    const updateArrowVisibility = () => {
        if (carouselRef.current) {
            const hasOverflow = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
            
            // Only show arrows if there's actually overflow content
            setShowLeftArrow(hasOverflow && carouselRef.current.scrollLeft > 0);
            setShowRightArrow(
                hasOverflow && 
                carouselRef.current.scrollLeft < 
                (carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10)
            );
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth * 0.8
            const newScrollPosition = carouselRef.current.scrollLeft + 
                (direction === 'left' ? -scrollAmount : scrollAmount)
            
            carouselRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            })
        }
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(event.pageX - (carouselRef.current?.offsetLeft || 0))
        setScrollLeft(carouselRef.current?.scrollLeft || 0)
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDragging) return
        
        event.preventDefault()
        if (carouselRef.current) {
            const x = event.pageX - (carouselRef.current.offsetLeft || 0)
            const walk = (x - startX) * 2
            carouselRef.current.scrollLeft = scrollLeft - walk
            updateArrowVisibility()
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        const carousel = carouselRef.current
        if (carousel) {
            carousel.addEventListener('scroll', updateArrowVisibility)
            return () => carousel.removeEventListener('scroll', updateArrowVisibility)
        }
    }, [])

    useEffect(() => {
        updateArrowVisibility();
    }, [items]);

    return (
        <div className="relative w-full">
            <div className="relative group">
                {showLeftArrow && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-background to-transparent pl-2 pr-8 py-4 z-10">
                        <button onClick={() => scroll('left')} className="hover:scale-110 transition-transform">
                            <ChevronLeft className="w-6 h-6 text-muted-foreground" />
                        </button>
                    </div>
                )}

                <div
                    ref={carouselRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
                    style={{ 
                        scrollBehavior: isDragging ? 'auto' : 'smooth',
                        width: 'calc(100vw - 96px)', // 96px = 6rem (pl-24)
                        marginRight: '-24px' // Compensate for parent padding
                    }}
                >
                    {items.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {showRightArrow && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background to-transparent pr-2 pl-8 py-4 z-10">
                        <button onClick={() => scroll('right')} className="hover:scale-110 transition-transform">
                            <ChevronRight className="w-6 h-6 text-muted-foreground" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carousel