import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="relative bg-muted/40 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Summer Sale <span className="text-primary">Up to 50% Off</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Discover the latest trends and must-have products at unbeatable prices. Limited time offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/category/electronics">
              <Button size="lg">Shop Electronics</Button>
            </Link>
            <Link href="/category/clothing">
              <Button variant="outline" size="lg">
                Shop Clothing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

