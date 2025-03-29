import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rajwen Indian Veg Food Restaurant",
  description: "Authentic Indian Vegetarian Cuisine",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {/* Add padding to bottom of main content on mobile for bottom nav */}
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            {/* Hide footer on small screens to avoid overlap with bottom nav */}
            <div className="md:block hidden">
              <Footer />
            </div>
            {/* Simplified footer for mobile */}
            <div className="md:hidden block pb-16 pt-8 bg-gray-100">
              <div className="container px-4 mx-auto text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Rajwen Restaurant. All rights reserved.</p>
              </div>
            </div>
          </div>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  )
}