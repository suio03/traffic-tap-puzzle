import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const apiUrl = `${process.env.WORKER_URL}/games?slug=${params.slug}`

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET}`,
                'Accept': 'application/json',
            }
        })

        
        // Always log the response content for debugging
        const responseText = await response.text()

        // Try to parse as JSON
        try {
            const data = JSON.parse(responseText)
            return NextResponse.json(data)
        } catch (parseError) {
            console.error('JSON parse error:', parseError)
            return NextResponse.json(
                { error: "Invalid response from worker" },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json(
            { error: "Failed to fetch game data" },
            { status: 500 }
        )
    }
}
