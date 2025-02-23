import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Game Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn't find the game you're looking for.
      </p>
      <Button asChild>
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}