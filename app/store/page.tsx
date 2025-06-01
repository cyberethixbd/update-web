import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, ShoppingCart, Star } from "lucide-react"

// This would typically come from a database
const products = [
  {
    id: 1,
    title: "WiFi Pineapple Mark VII",
    description: "Advanced wireless auditing platform for penetration testing and security assessments.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Hardware",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "wifi-pineapple-mark-vii",
    tags: ["WiFi", "Penetration Testing", "Hardware"],
  },
  {
    id: 2,
    title: "USB Rubber Ducky",
    description: "Keystroke injection tool that looks like an innocent USB flash drive.",
    price: 49.99,
    category: "Hardware",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "usb-rubber-ducky",
    tags: ["USB", "Social Engineering", "Hardware"],
  },
  {
    id: 3,
    title: "Network Toolkit Pro",
    description: "Comprehensive software suite for network analysis and penetration testing.",
    price: 129.99,
    category: "Software",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "network-toolkit-pro",
    tags: ["Software", "Network Analysis", "Tools"],
  },
  {
    id: 4,
    title: "Ethical Hacking Complete Guide",
    description: "Comprehensive eBook covering all aspects of ethical hacking and penetration testing.",
    price: 24.99,
    category: "eBooks",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "ethical-hacking-complete-guide",
    tags: ["eBook", "Guide", "Learning"],
  },
  {
    id: 5,
    title: "Flipper Zero",
    description: "Portable multi-tool for pentesters and geeks in a toy-like body.",
    price: 169.99,
    category: "Hardware",
    rating: 4.5,
    reviews: 78,
    inStock: false,
    image: "/placeholder.svg?height=300&width=300",
    slug: "flipper-zero",
    tags: ["Hardware", "Multi-tool", "RFID"],
  },
  {
    id: 6,
    title: "Kali Linux Toolkit",
    description: "Essential tools and scripts collection for Kali Linux users.",
    price: 39.99,
    category: "Software",
    rating: 4.4,
    reviews: 67,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "kali-linux-toolkit",
    tags: ["Software", "Kali Linux", "Scripts"],
  },
  {
    id: 7,
    title: "OSCP Preparation Bundle",
    description: "Complete preparation materials for OSCP certification including labs and practice exams.",
    price: 89.99,
    category: "Certification",
    rating: 4.8,
    reviews: 145,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "oscp-preparation-bundle",
    tags: ["Certification", "OSCP", "Preparation"],
  },
  {
    id: 8,
    title: "Hardware Hacking Kit",
    description: "Essential tools for hardware hacking and IoT security testing.",
    price: 79.99,
    category: "Hardware",
    rating: 4.6,
    reviews: 92,
    inStock: true,
    image: "/placeholder.svg?height=300&width=300",
    slug: "hardware-hacking-kit",
    tags: ["Hardware", "IoT", "Security Testing"],
  },
]

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Hacker Store</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential tools, hardware, and resources for ethical hackers and cybersecurity professionals
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="ebooks">eBooks</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square w-full overflow-hidden p-4 flex items-center justify-center bg-muted/20">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="object-contain w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                </div>
                <CardTitle className="text-base line-clamp-2">{product.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews})</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/store/${product.slug}`}>View Details</Link>
                  </Button>
                  <Button disabled={!product.inStock} className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
