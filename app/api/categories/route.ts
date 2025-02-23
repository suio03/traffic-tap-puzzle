import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { results} = await fetch(`${process.env.WORKER_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET}`,
            },
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
