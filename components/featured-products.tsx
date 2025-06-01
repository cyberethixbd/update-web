"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

// This would typically come from a database
const products = [
  {
    id: 1,
    title: "WiFi Pineapple",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "wifi-pineapple",
  },
  {
    id: 2,
    title: "Rubber Ducky USB",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "rubber-ducky-usb",
  },
  {
    id: 3,
    title: "Network Toolkit Pro",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "network-toolkit-pro",
  },
  {
    id: 4,
    title: "Ethical Hacking eBook",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "ethical-hacking-ebook",
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: `product-${product.id}`,
      title: product.title,
      price: product.price,
      image: product.image,
      type: "product",
      slug: product.slug,
    })
  }

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square w-full overflow-hidden p-4 flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="object-contain w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base line-clamp-1">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="font-bold">${product.price}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full" onClick={() => handleAddToCart(product)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
