import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, CalendarIcon, Clock } from "lucide-react"

// This would typically come from a database or CMS
const posts = [
  {
    id: 1,
    title: "Top 10 Common Web Application Vulnerabilities in 2024",
    excerpt:
      "Learn about the most common security flaws in web applications and how to prevent them. This comprehensive guide covers OWASP Top 10 and more.",
    content: "Full article content here...",
    date: "2024-05-15",
    category: "Web Security",
    author: "John Smith",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "top-10-common-web-application-vulnerabilities",
    tags: ["OWASP", "Web Security", "Vulnerabilities"],
  },
  {
    id: 2,
    title: "Introduction to Buffer Overflow Attacks",
    excerpt:
      "Understanding how buffer overflow attacks work and techniques to exploit them ethically. Learn the fundamentals of memory corruption vulnerabilities.",
    content: "Full article content here...",
    date: "2024-05-10",
    category: "Exploit Development",
    author: "Sarah Johnson",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "introduction-to-buffer-overflow-attacks",
    tags: ["Buffer Overflow", "Exploit Development", "Memory Corruption"],
  },
  {
    id: 3,
    title: "Setting Up Your Ethical Hacking Lab",
    excerpt:
      "A step-by-step guide to creating your own virtual lab environment for practicing ethical hacking. Includes VirtualBox, Kali Linux, and vulnerable applications.",
    content: "Full article content here...",
    date: "2024-05-05",
    category: "Getting Started",
    author: "Mike Chen",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "setting-up-your-ethical-hacking-lab",
    tags: ["Lab Setup", "Kali Linux", "VirtualBox"],
  },
  {
    id: 4,
    title: "Social Engineering: The Human Element in Cybersecurity",
    excerpt:
      "Explore the psychological aspects of cybersecurity attacks and learn how to defend against social engineering techniques.",
    content: "Full article content here...",
    date: "2024-04-28",
    category: "Social Engineering",
    author: "Lisa Rodriguez",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "social-engineering-human-element-cybersecurity",
    tags: ["Social Engineering", "Psychology", "Defense"],
  },
  {
    id: 5,
    title: "Network Penetration Testing Methodology",
    excerpt:
      "Learn the systematic approach to network penetration testing, from reconnaissance to reporting vulnerabilities.",
    content: "Full article content here...",
    date: "2024-04-20",
    category: "Network Security",
    author: "David Wilson",
    readTime: "18 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "network-penetration-testing-methodology",
    tags: ["Network Security", "Penetration Testing", "Methodology"],
  },
  {
    id: 6,
    title: "Mobile Application Security Testing Guide",
    excerpt:
      "Comprehensive guide to testing mobile applications for security vulnerabilities on both Android and iOS platforms.",
    content: "Full article content here...",
    date: "2024-04-15",
    category: "Mobile Security",
    author: "Emma Thompson",
    readTime: "14 min read",
    image: "/placeholder.svg?height=200&width=400",
    slug: "mobile-application-security-testing-guide",
    tags: ["Mobile Security", "Android", "iOS"],
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Cybersecurity Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest trends, techniques, and insights in ethical hacking and cybersecurity
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-security">Web Security</SelectItem>
                <SelectItem value="network-security">Network Security</SelectItem>
                <SelectItem value="mobile-security">Mobile Security</SelectItem>
                <SelectItem value="social-engineering">Social Engineering</SelectItem>
                <SelectItem value="exploit-development">Exploit Development</SelectItem>
                <SelectItem value="getting-started">Getting Started</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Post */}
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={posts[0].image || "/placeholder.svg"}
                alt={posts[0].title}
                className="object-cover w-full h-64 md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-2">
                Featured
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{posts[0].title}</h2>
              <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <time dateTime={posts[0].date}>
                    {new Date(posts[0].date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{posts[0].readTime}</span>
                </div>
                <span>By {posts[0].author}</span>
              </div>
              <Button asChild>
                <Link href={`/blog/${posts[0].slug}`}>Read More</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
