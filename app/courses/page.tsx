import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search } from "lucide-react"

// This would typically come from a database
const courses = [
  {
    id: 1,
    title: "Ethical Hacking Fundamentals",
    description:
      "Learn the basics of ethical hacking and penetration testing with hands-on labs and real-world scenarios.",
    price: 49.99,
    level: "Beginner",
    duration: "8 hours",
    students: 1250,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    slug: "ethical-hacking-fundamentals",
    category: "Fundamentals",
  },
  {
    id: 2,
    title: "Advanced Web Application Security",
    description: "Master techniques to secure web applications from OWASP Top 10 vulnerabilities and advanced attacks.",
    price: 79.99,
    level: "Intermediate",
    duration: "12 hours",
    students: 890,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400",
    slug: "advanced-web-application-security",
    category: "Web Security",
  },
  {
    id: 3,
    title: "Network Penetration Testing",
    description:
      "Learn how to identify and exploit network vulnerabilities using industry-standard tools and methodologies.",
    price: 69.99,
    level: "Intermediate",
    duration: "10 hours",
    students: 756,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400",
    slug: "network-penetration-testing",
    category: "Network Security",
  },
  {
    id: 4,
    title: "Mobile Application Security",
    description: "Discover security flaws in mobile applications and learn how to perform mobile penetration testing.",
    price: 89.99,
    level: "Advanced",
    duration: "14 hours",
    students: 432,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=400",
    slug: "mobile-application-security",
    category: "Mobile Security",
  },
  {
    id: 5,
    title: "Social Engineering Techniques",
    description:
      "Understand psychological manipulation techniques used in cybersecurity attacks and how to defend against them.",
    price: 59.99,
    level: "Beginner",
    duration: "6 hours",
    students: 1100,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=400",
    slug: "social-engineering-techniques",
    category: "Social Engineering",
  },
  {
    id: 6,
    title: "Digital Forensics Essentials",
    description: "Learn the fundamentals of digital forensics and incident response in cybersecurity investigations.",
    price: 74.99,
    level: "Intermediate",
    duration: "11 hours",
    students: 623,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    slug: "digital-forensics-essentials",
    category: "Forensics",
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Ethical Hacking Courses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master cybersecurity skills with our comprehensive courses taught by industry experts
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search courses..." className="pl-10" />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fundamentals">Fundamentals</SelectItem>
                <SelectItem value="web-security">Web Security</SelectItem>
                <SelectItem value="network-security">Network Security</SelectItem>
                <SelectItem value="mobile-security">Mobile Security</SelectItem>
                <SelectItem value="social-engineering">Social Engineering</SelectItem>
                <SelectItem value="forensics">Forensics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.students} students</span>
                  <span>•</span>
                  <span>⭐ {course.rating}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{course.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-2xl font-bold">${course.price}</p>
                <Button asChild>
                  <Link href={`/courses/${course.slug}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
