import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface GameDetailSectionsProps {
    content: string; // Single markdown content containing all game details
}

const GameDetailSections = ({ content }: GameDetailSectionsProps) => {
    // Add validation to ensure content is actually a string
    if (!content || typeof content !== 'string') {
        console.error('Invalid content received:', content);
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-gray-200">
                        Unable to load game details. Please try again later.
                    </div>
                </CardContent>
            </Card>
        );
    }

    const processedContent = content
        .replace(/\\n/g, '\n') // Replace literal \n with actual line breaks
        .replace(/^content:\s*/, ''); // Remove the "content:" prefix if present

    return (
        <div className="mt-6 space-y-6 max-w-3xl mx-auto">
            <Card>
                <CardContent className="p-6">
                    <div className="prose prose-gray mb-1 text-gray-200  max-w-none">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Customize heading styles to match your previous design
                                h1: ({ children }) => (
                                    <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-8 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-3 font-nacelle text-xl font-semibold text-gray-200 text-transparent">{children}</h3>
                                ),
                                strong: ({ children }) => (
                                    <strong className="text-gray-200">{children}</strong>
                                ),
                            }}
                        >
                            {processedContent}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GameDetailSections