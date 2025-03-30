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
  BookOpen,
  X,
  Bell,
  Settings,
  Coffee,
  Search
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Navbar() {
  const { user, isLoading, isAdmin, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  const pathname = usePathname()
  
  // Track scroll position for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add padding to body when mobile nav is present
  useEffect(() => {
    const updateBodyPadding = () => {
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        document.body.style.paddingBottom = "calc(5rem + env(safe-area-inset-bottom))"
      } else {
        document.body.style.paddingBottom = ""
      }
    }
    
    updateBodyPadding()
    window.addEventListener('resize', updateBodyPadding)
    
    return () => {
      window.removeEventListener('resize', updateBodyPadding)
      document.body.style.paddingBottom = ""
    }
  }, [])

  // Cart and notifications simulation
  useEffect(() => {
    // Fetch cart data
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart)
        setCartCount(cart.length || 0)
      } catch (e) {
        console.error("Failed to parse cart data")
        setCartCount(0)
      }
    }
    
    // Simulate notification check
    const checkNotifications = async () => {
      // Replace with actual API call
      const hasUnread = localStorage.getItem('hasUnreadNotifications') === 'true'
      setHasNewNotifications(hasUnread)
    }
    
    checkNotifications()
    
    // Set up polling for notifications (in a real app)
    const notificationInterval = setInterval(checkNotifications, 60000)
    return () => clearInterval(notificationInterval)
  }, [])

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Menu", href: "/menu", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Cart", href: "/bucketlist", icon: <ShoppingCart className="h-5 w-5" />, badge: cartCount > 0 ? cartCount : null },
    { name: "Account", href: user ? "/profile" : "/auth", icon: <UserIcon className="h-5 w-5" /> },
  ]

  // Determine if a link is active
  const isActive = (href) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Top navbar component
  const TopNavbar = () => (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm" 
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Left section: Logo and desktop navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Side menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full transition-all hover:scale-105 hover:bg-primary/10 ml-0" 
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:max-w-sm border-r">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center border border-primary/10 shadow-sm">
                      <Image
                        src="/Logo.png"
                        alt="Rajwen Logo"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-xl">Rajwen</span>
                  </SheetTitle>
                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-6">
                  <div className="space-y-1">
                    {user && (
                      <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.displayName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold">{user.displayName || "User"}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                              {user.email || ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link 
                          href={link.href} 
                          className={cn(
                            "flex items-center text-base font-medium transition-all rounded-lg p-3",
                            isActive(link.href) 
                              ? "text-primary bg-primary/10" 
                              : "hover:text-primary hover:bg-primary/5"
                          )}
                        >
                          <span className="mr-3">
                            {link.icon}
                          </span>
                          {link.name}
                          {link.name === "Cart" && cartCount > 0 && (
                            <Badge 
                              variant="destructive" 
                              className="ml-auto"
                            >
                              {cartCount > 99 ? "99+" : cartCount}
                            </Badge>
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  
                  {user && (
                    <>
                      <div className="border-t my-3" />
                      <div className="mb-1">
                        <span className="text-xs font-semibold uppercase text-muted-foreground mx-3">
                          Quick Access
                        </span>
                      </div>
                      <div className="space-y-1">
                        <SheetClose asChild>
                          <Link 
                            href="/profile#liked" 
                            className="flex items-center text-base font-medium hover:text-primary transition-all rounded-lg p-3 hover:bg-primary/5"
                          >
                            <Heart className="h-5 w-5 mr-3" />
                            Liked Items
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link 
                            href="/notifications" 
                            className="flex items-center text-base font-medium hover:text-primary transition-all rounded-lg p-3 hover:bg-primary/5"
                          >
                            <div className="relative mr-3">
                              <Bell className="h-5 w-5" />
                              {hasNewNotifications && (
                                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                              )}
                            </div>
                            Notifications
                            {hasNewNotifications && (
                              <Badge className="ml-auto bg-red-500">New</Badge>
                            )}
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link 
                            href="/settings" 
                            className="flex items-center text-base font-medium hover:text-primary transition-all rounded-lg p-3 hover:bg-primary/5"
                          >
                            <Settings className="h-5 w-5 mr-3" />
                            Settings
                          </Link>
                        </SheetClose>
                        {isAdmin && (
                          <SheetClose asChild>
                            <Link 
                              href="/admin" 
                              className="flex items-center text-base font-medium hover:text-primary transition-all rounded-lg p-3 hover:bg-primary/5"
                            >
                              <ShieldCheck className="h-5 w-5 mr-3" />
                              Admin Dashboard
                            </Link>
                          </SheetClose>
                        )}
                      </div>
                      
                      <div className="border-t my-3 pt-2">
                        <SheetClose asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start mt-2 border-destructive text-destructive hover:bg-destructive/10 rounded-lg"
                            onClick={logout}
                          >
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                          </Button>
                        </SheetClose>
                      </div>
                    </>
                  )}
                  
                  {!user && (
                    <div className="mt-4 space-y-2 p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Sign in to access your profile, orders, and favorites</p>
                      <SheetClose asChild>
                        <Button 
                          asChild 
                          variant="default" 
                          className="w-full rounded-lg"
                        >
                          <Link href="/auth">Sign in</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full rounded-lg"
                        >
                          <Link href="/auth?tab=register">Create account</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo for both mobile and desktop */}
            <Link 
              href="/" 
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center border border-primary/10">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-lg lg:text-xl">Rajwen</span>

              
            </Link>
           


            {/* Desktop navigation links - enhanced with animations */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-3">
              {navLinks.slice(0, 2).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn(
                    "relative group px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    isActive(link.href) 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <span className="transition-transform group-hover:scale-110">{link.icon}</span>
                  <span>{link.name}</span>
                  {isActive(link.href) && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>



          {/* Right section: Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
          <Link href="/search">
  <div className="flex justify-end flex-1">
    <Search />
  </div>
</Link>
            {/* Notifications button (desktop only) */}
            {user && (
              <div className="hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/notifications">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="relative rounded-full transition-colors hover:bg-primary/10 h-10 w-10"
                          aria-label="Notifications"
                        >
                          <Bell className="h-5 w-5" />
                          {hasNewNotifications && (
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                          )}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                      {hasNewNotifications && <p className="text-xs text-red-500">New updates</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          
            {/* Cart button (desktop only) */}
            <div className="hidden md:block">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/bucketlist">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative rounded-full transition-all hover:scale-105 hover:bg-primary/10 h-10 w-10"
                        aria-label="Cart"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <AnimatePresence>
                          {cartCount > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute -top-1 -right-1"
                            >
                              <Badge 
                                variant="destructive" 
                                className="min-w-5 h-5 flex items-center justify-center text-xs px-1"
                              >
                                {cartCount > 99 ? "99+" : cartCount}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your cart{cartCount > 0 ? ` (${cartCount} items)` : ""}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* User dropdown (desktop only) */}
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="rounded-full overflow-hidden transition-all hover:scale-105 px-2 pr-3 py-1 h-auto border border-primary/10 shadow-sm hover:bg-primary/5 flex items-center gap-2"
                    >
                      <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden sm:inline-block max-w-[100px] truncate">
                        {user.displayName || "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-lg border-primary/10">
                    <div className="flex items-center gap-3 p-3 border-b mb-2 rounded-lg bg-primary/5">
                      <Avatar className="h-10 w-10 border-2 border-primary/10">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user.displayName || "User"}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {user.email || ""}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 px-1">
                      <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                        <Link href="/profile" className="flex items-center cursor-pointer">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                        <Link href="/notifications" className="flex items-center cursor-pointer">
                          <div className="relative mr-2">
                            <Bell className="h-4 w-4" />
                            {hasNewNotifications && (
                              <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                          <span>Notifications</span>
                          {hasNewNotifications && (
                            <Badge variant="destructive" className="ml-auto scale-75">New</Badge>
                          )}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                        <Link href="/bucketlist" className="flex items-center cursor-pointer">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          <span>My Cart</span>
                          {cartCount > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {cartCount}
                            </Badge>
                          )}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                        <Link href="/profile#liked" className="flex items-center cursor-pointer">
                          <Heart className="h-4 w-4 mr-2" />
                          <span>Liked Items</span>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="my-2" />
                        <div className="px-1">
                          <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                            <Link href="/admin" className="flex items-center cursor-pointer">
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      </>
                    )}
                    <DropdownMenuSeparator className="my-2" />
                    <div className="px-1">
                      <DropdownMenuItem asChild className="rounded-lg py-2 transition-colors">
                        <Link href="/settings" className="flex items-center cursor-pointer">
                          <Settings className="h-4 w-4 mr-2" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={logout} 
                        className="flex items-center text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10 mt-1 rounded-lg py-2 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full hover:bg-primary/5 lg:text-base lg:px-5"
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button 
                  asChild 
                  variant="default" 
                  size="sm" 
                  className="rounded-full shadow-sm lg:text-base lg:px-5"
                >
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )

  // Enhanced Bottom mobile navbar with premium glass effect and improved UI
  const BottomMobileNav = () => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    // Track scroll direction to hide/show nav
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY + 10) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY - 10) {
          setVisible(true);
        }
        setLastScrollY(currentScrollY);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
    
    // Haptic feedback function
    const triggerHaptic = useCallback(() => {
      if ('vibrate' in navigator) {
        navigator.vibrate(5); // Subtle vibration in milliseconds
      }
    }, []);
  
    return (
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: visible ? 0 : 100, 
            opacity: visible ? 1 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            mass: 0.8
          }}
          className="p-2 pb-6 pt-3 px-4 bg-background/95 backdrop-blur-xl shadow-lg border-t border-primary/10 pointer-events-auto"
          style={{
            borderTopLeftRadius: '1.5rem',
            borderTopRightRadius: '1.5rem',
            boxShadow: '0 -10px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="grid grid-cols-4 h-16 gap-2 max-w-md mx-auto">
            {navLinks.map((link) => {
              const isCurrentlyActive = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-xl transition-all",
                    isCurrentlyActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={() => triggerHaptic()}
                  aria-label={link.name}
                >
                  <motion.div 
                    className="flex flex-col items-center justify-center w-full"
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Active background indicator */}
                    {isCurrentlyActive && (
                      <motion.div 
                        layoutId="mobileActiveBackground"
                        className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                        transition={{ type: "spring", duration: 0.3 }}
                      />
                    )}
                    
                    <div className="relative">
                      {/* Icon container with animation */}
                      <motion.div
                        animate={{ 
                          scale: isCurrentlyActive ? 1.1 : 1,
                          y: isCurrentlyActive ? -4 : 0
                        }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="mb-1"
                      >
                        {link.icon}
                      </motion.div>
                      
                      {/* Notification indicators */}
                      <AnimatePresence>
                        {link.name === "Cart" && cartCount > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2"
                          >
                            <Badge 
                              variant="destructive" 
                              className="min-w-5 h-5 flex items-center justify-center text-xs px-1 rounded-full"
                            >
                              {cartCount > 99 ? "99+" : cartCount}
                            </Badge>
                          </motion.div>
                        )}


                        
                        
                        {link.name === "Account" && user && hasNewNotifications && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-background"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Label text */}
                    <motion.span 
                      className={cn(
                        "text-xs font-medium transition-all",
                        isCurrentlyActive ? "font-semibold" : "font-normal"
                      )}
                      animate={{ 
                        opacity: isCurrentlyActive ? 1 : 0.8
                      }}
                    >
                      {link.name}
                    </motion.span>
                    
                    {/* Active indicator line */}
                    {isCurrentlyActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 h-1 w-10 bg-primary rounded-full"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <TopNavbar />
      <BottomMobileNav />
      
    </>
  )
}