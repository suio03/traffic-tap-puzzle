import GamePage from "./[slug]/page"
export default function Home() {
    return (
        <div className="space-y-8 pt-16">
            <GamePage params={{ slug: "traffic-tap-puzzle" }} />
        </div>
    )
}
