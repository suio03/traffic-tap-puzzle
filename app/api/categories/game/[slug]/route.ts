import { NextResponse } from "next/server";
export const runtime = 'edge';
export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { results } = await fetch(`${process.env.WORKER_URL}/category/game?slug=${params.slug}`, {
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET}`,
            },
            cache: 'no-store'
        }).then((res) => res.json());
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
