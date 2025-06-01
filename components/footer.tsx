import Link from "next/link"
import { ShieldCheck, Facebook, Github, Youtube, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://facebook.com/cyberethixbd/" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="https://facebook.com/group/cyberethixbd/" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Facebook Group</span>
            <Facebook className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="https://t.me/cyberethixbd" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Telegram</span>
            <Send className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="https://www.youtube.com/@cyberethixbd" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">YouTube</span>
            <Youtube className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="https://github.com/cyberethixbd" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Cyber Ethix BD</span>
          </Link>
          <p className="text-center text-xs leading-5 text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Cyber Ethix BD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
