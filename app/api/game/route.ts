import { NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(request: Request) {
    const data = await request.json();
    try {
        const game = await fetch(`${process.env.WORKER_URL}/games`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET}`,
            },
            body: JSON.stringify({
                title: data.title,
                slug: data.slug,
                category_id: data.category_id,
                thumbnail_url: data.thumbnail_url,
                embed_url: data.embed_url,
                metadata: data.metadata,
                content: data.content,
            }),
        }).then((res) => res.json());
        return NextResponse.json(game);
    } catch (error) {
        console.error("Error fetching game:", error);
        return NextResponse.json(
            { error: "Failed to fetch game" },
            { status: 500 }
        );
    }
}
export async function GET(request: Request) {
    try {
        const { results } = await fetch(`${process.env.WORKER_URL}/games`, {
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET}`,
            },
        }).then((res) => res.json());
        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json(
            { error: "Failed to fetch games" },
            { status: 500 }
        );
    }
}
