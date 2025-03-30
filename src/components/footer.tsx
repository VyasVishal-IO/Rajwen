import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-green-100 py-12 border-t border-green-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-green-800">Rajwen Restaurant</h3>
            <p className="text-gray-700 mb-4">
              Authentic pure vegetarian Indian cuisine served with love and tradition.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="https://www.instagram.com/rajwenin?igsh=MWs2bXVjNW1jaTEzdQ==" className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div className="md:mx-auto">
            <h3 className="font-bold text-xl mb-4 text-green-800">Location & Contact</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span>Shop No. 14, Rajwen Happiness Food Court, PDPU Road, Raysan, Gandhinagar, Gujarat</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <Link href="tel:+918200192146" className="hover:text-green-700">+91 8200192146</Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <Link href="mailto:rajwen0807@gmail.com" className="hover:text-green-700">rajwen0807@gmail.com</Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                href="https://g.co/kgs/C3WVWqD" 
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                target="_blank"
              >
                <MapPin className="h-4 w-4 mr-1" />
                View on Google Maps
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4 text-green-800">Opening Hours</h3>
            <div className="flex items-start mb-3">
              <Clock className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <div className="text-gray-700">
                <p className="font-medium">Monday - Sunday</p>
                <p className="text-lg">4:00 PM - 2:00 AM</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold text-lg mb-3 text-green-800">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-green-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-gray-700 hover:text-green-700">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/bucketlist" className="text-gray-700 hover:text-green-700">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-gray-700 hover:text-green-700">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 mt-10 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Rajwen Pure Veg & Authentic Indian Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}