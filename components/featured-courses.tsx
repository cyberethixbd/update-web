"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

// This would typically come from a database
const courses = [
  {
    id: 1,
    title: "Ethical Hacking Fundamentals",
    description: "Learn the basics of ethical hacking and penetration testing",
    price: 49.99,
    level: "Beginner",
    image: "/placeholder.svg?height=200&width=400",
    slug: "ethical-hacking-fundamentals",
  },
  {
    id: 2,
    title: "Advanced Web Application Security",
    description: "Master techniques to secure web applications from attacks",
    price: 79.99,
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=400",
    slug: "advanced-web-application-security",
  },
  {
    id: 3,
    title: "Network Penetration Testing",
    description: "Learn how to identify and exploit network vulnerabilities",
    price: 69.99,
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=400",
    slug: "network-penetration-testing",
  },
]

export default function FeaturedCourses() {
  const { addItem } = useCart()

  const handleAddToCart = (course: any) => {
    addItem({
      id: `course-${course.id}`,
      title: course.title,
      price: course.price,
      image: course.image,
      type: "course",
      slug: course.slug,
    })
  }

  return (
    <>
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <Badge variant="outline">{course.level}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{course.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center gap-2">
            <p className="font-bold">${course.price}</p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/courses/${course.slug}`}>View</Link>
              </Button>
              <Button size="sm" onClick={() => handleAddToCart(course)}>
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
