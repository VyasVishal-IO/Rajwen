"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Menu, 
  ShoppingCart, 
  UserIcon, 
  LogOut, 
  Heart, 
  ShieldCheck, 
  Home, 
  Search,
  BookOpen,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { user, isLoading, isAdmin, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0) // Replace with actual cart count logic
  const pathname = usePathname()
  
  // Track scroll position for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Menu", href: "/menu", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Cart", href: "/bucketlist", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Account", href: user ? "/profile" : "/auth", icon: <UserIcon className="h-5 w-5" /> },
  ]

  // Determine if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Top navbar component
  const TopNavbar = () => (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm" 
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Logo and hamburger for desktop */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild className="md:flex hidden">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] max-w-sm border-r">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Rajwen Logo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-bold">Rajwen</span>
                  </SheetTitle>
                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link 
                        href={link.href} 
                        className="flex items-center text-base font-medium hover:text-primary transition-colors"
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  {user && (
                    <>
                      <div className="border-t my-2" />
                      <SheetClose asChild>
                        <Link 
                          href="/profile#liked" 
                          className="flex items-center text-base font-medium hover:text-primary transition-colors"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Liked Items
                        </Link>
                      </SheetClose>
                      {isAdmin && (
                        <SheetClose asChild>
                          <Link 
                            href="/admin" 
                            className="flex items-center text-base font-medium hover:text-primary transition-colors"
                          >
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Link>
                        </SheetClose>
                      )}
                      <div className="border-t my-2" />
                      <SheetClose asChild>
                        <Button 
                          variant="destructive" 
                          className="w-full mt-2"
                          onClick={logout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile top nav with Logo and pill-style home button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/" className="bg-blue-600 text-white rounded-full py-2 pl-3 pr-5 flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
            </div>

            {/* Desktop Logo */}
            <Link href="/" className="hidden md:flex items-center gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Rajwen Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl">Rajwen</span>
            </Link>
          </div>

          {/* Center section: Navigation for desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "relative group text-sm font-medium transition-colors",
                  isActive(link.href) ? "text-primary" : "hover:text-primary"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute inset-x-0 -bottom-1 h-0.5 bg-primary transition-transform",
                  isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          {/* Right section: desktop actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search button (mobile and desktop) */}
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Cart button (desktop only) */}
            <Link href="/bucketlist" className="hidden md:block">
              <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs px-1"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* User dropdown (desktop only) */}
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full h-9 w-9 overflow-hidden transition-transform hover:scale-110"
                    >
                      <Avatar className="h-9 w-9 border-2 border-primary/10">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2 border-b">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.displayName || "User"}</span>
                        <span className="text-xs text-muted-foreground truncate">{user.email || ""}</span>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bucketlist" className="flex items-center cursor-pointer">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        <span>My Cart</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile#liked" className="flex items-center cursor-pointer">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>Liked Items</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center cursor-pointer">
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            <span>Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout} 
                      className="flex items-center text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button 
                  asChild 
                  variant="default" 
                  size="sm" 
                  className="rounded-full"
                >
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  // Bottom mobile navbar
  const BottomMobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="grid grid-cols-4 h-16">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs font-medium transition-colors",
              isActive(link.href) 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className={cn(
              "p-1 rounded-full mb-1",
              isActive(link.href) ? "bg-primary/10" : ""
            )}>
              {link.icon}
            </div>
            <span>{link.name}</span>
            {link.name === "Cart" && cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 ml-4 min-w-5 h-5 flex items-center justify-center text-xs px-1"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <TopNavbar />
      <BottomMobileNav />
    </>
  )
}