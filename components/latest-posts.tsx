import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

// This would typically come from a database or CMS
const posts = [
  {
    id: 1,
    title: "Top 10 Common Web Application Vulnerabilities",
    excerpt: "Learn about the most common security flaws in web applications and how to prevent them.",
    date: "2025-05-15",
    category: "Web Security",
    image: "/placeholder.svg?height=200&width=400",
    slug: "top-10-common-web-application-vulnerabilities",
  },
  {
    id: 2,
    title: "Introduction to Buffer Overflow Attacks",
    excerpt: "Understanding how buffer overflow attacks work and techniques to exploit them ethically.",
    date: "2025-05-10",
    category: "Exploit Development",
    image: "/placeholder.svg?height=200&width=400",
    slug: "introduction-to-buffer-overflow-attacks",
  },
  {
    id: 3,
    title: "Setting Up Your Ethical Hacking Lab",
    excerpt: "A step-by-step guide to creating your own virtual lab environment for practicing ethical hacking.",
    date: "2025-05-05",
    category: "Getting Started",
    image: "/placeholder.svg?height=200&width=400",
    slug: "setting-up-your-ethical-hacking-lab",
  },
]

export default function LatestPosts() {
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <Badge variant="outline">{post.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href={`/blog/${post.slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
