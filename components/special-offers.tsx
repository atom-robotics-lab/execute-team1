import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SpecialOffers() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/10 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Limited Time
              </div>
              <h3 className="text-2xl font-bold">Buy One, Get One 50% Off</h3>
              <p className="text-muted-foreground">On all headphones and earbuds. Offer valid until supplies last.</p>
              <Link href="/category/electronics">
                <Button>Shop Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                New Arrivals
              </div>
              <h3 className="text-2xl font-bold">Summer Collection 2023</h3>
              <p className="text-muted-foreground">Discover the latest fashion trends for the summer season.</p>
              <Link href="/category/clothing">
                <Button variant="outline">Explore Collection</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

