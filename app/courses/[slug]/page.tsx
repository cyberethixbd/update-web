import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Star, PlayCircle, CheckCircle, Lock } from "lucide-react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// This would typically come from a database
const courseData = {
  "ethical-hacking-fundamentals": {
    id: 1,
    title: "Ethical Hacking Fundamentals",
    description:
      "Learn the basics of ethical hacking and penetration testing with hands-on labs and real-world scenarios. This comprehensive course covers everything from reconnaissance to reporting vulnerabilities.",
    price: 49.99,
    level: "Beginner",
    duration: "8 hours",
    students: 1250,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=800",
    instructor: "John Smith",
    instructorBio: "Certified Ethical Hacker with 10+ years of experience in cybersecurity",
    whatYouWillLearn: [
      "Fundamentals of ethical hacking and penetration testing",
      "Information gathering and reconnaissance techniques",
      "Vulnerability assessment and exploitation",
      "Network scanning and enumeration",
      "Web application security testing",
      "Reporting and documentation best practices",
    ],
    curriculum: [
      {
        title: "Introduction to Ethical Hacking",
        lessons: [
          { title: "What is Ethical Hacking?", duration: "15 min", completed: false },
          { title: "Legal and Ethical Considerations", duration: "20 min", completed: false },
          { title: "Setting Up Your Lab Environment", duration: "30 min", completed: false },
        ],
      },
      {
        title: "Information Gathering",
        lessons: [
          { title: "Passive Reconnaissance", duration: "25 min", completed: false },
          { title: "Active Reconnaissance", duration: "30 min", completed: false },
          { title: "Social Engineering Basics", duration: "20 min", completed: false },
        ],
      },
      {
        title: "Vulnerability Assessment",
        lessons: [
          { title: "Network Scanning with Nmap", duration: "35 min", completed: false },
          { title: "Vulnerability Scanners", duration: "25 min", completed: false },
          { title: "Manual Testing Techniques", duration: "40 min", completed: false },
        ],
      },
    ],
  },
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions)
  const course = courseData[params.slug as keyof typeof courseData]

  if (!course) {
    notFound()
  }

  // Check if user has purchased this course (mock data)
  const hasPurchased = false

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{course.level}</Badge>
              <span className="text-sm text-muted-foreground">{course.duration}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-xl text-muted-foreground">{course.description}</p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
          </div>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Curriculum */}
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.curriculum.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <h3 className="font-semibold">{section.title}</h3>
                  <div className="space-y-1">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {hasPurchased ? (
                            <PlayCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold">{course.instructor.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">${course.price}</div>
                  <div className="text-sm text-muted-foreground">One-time payment</div>
                </div>

                {session ? (
                  hasPurchased ? (
                    <Button className="w-full" size="lg">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>
                  )
                ) : (
                  <Button className="w-full" size="lg" asChild>
                    <a href="/auth/login">Login to Enroll</a>
                  </Button>
                )}

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span>Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lifetime Access:</span>
                    <span>Yes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
