import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Rajwen Restaurant</h3>
            <p className="text-muted-foreground mb-4">
              Authentic Indian vegetarian cuisine made with love and tradition.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-primary">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-muted-foreground hover:text-primary">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/bucketlist" className="text-muted-foreground hover:text-primary">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Restaurant Street</p>
              <p>City, State 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@rajwen.com</p>
            </address>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Opening Hours</h3>
            <ul className="text-muted-foreground">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rajwen Indian Veg Food Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

