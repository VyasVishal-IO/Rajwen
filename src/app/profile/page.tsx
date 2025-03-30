// // "use client"

// // import { CardFooter } from "@/components/ui/card"

// // import type React from "react"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { doc, getDoc, updateDoc } from "firebase/firestore"
// // import { db } from "@/lib/firebase"
// // import { useAuth } from "@/components/auth-provider"
// // import Image from "next/image"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Calendar } from "@/components/ui/calendar"
// // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// // import { format } from "date-fns"
// // import { CalendarIcon, Heart, ShoppingBag } from "lucide-react"
// // import toast from "react-hot-toast"
// // import Link from "next/link"
// // import { formatDate } from "@/lib/utils"
// // import { Star } from "lucide-react"
// // import { formatPrice } from "@/lib/utils"

// // interface UserProfile {
// //   uid: string
// //   displayName: string
// //   email: string
// //   photoURL: string
// //   phone?: string
// //   address?: string
// //   birthday?: string
// //   anniversary?: string
// //   foodPreferences?: string
// //   allergies?: string
// //   createdAt: any
// // }

// // interface MenuItem {
// //   id: string
// //   name: string
// //   description: string
// //   price: number
// //   category: string
// //   imageUrl: string
// //   rating: number
// // }

// // export default function ProfilePage() {
// //   const router = useRouter()
// //   const { user, isLoading } = useAuth()
// //   const [profile, setProfile] = useState<UserProfile | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [likedItems, setLikedItems] = useState<MenuItem[]>([])
// //   const [orders, setOrders] = useState<any[]>([])
// //   const [birthday, setBirthday] = useState<Date | undefined>()
// //   const [anniversary, setAnniversary] = useState<Date | undefined>()

// //   useEffect(() => {
// //     if (!isLoading && !user) {
// //       router.push("/auth")
// //     }
// //   }, [user, isLoading, router])

// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (!user) return

// //       try {
// //         const userDoc = await getDoc(doc(db, "users", user.uid))

// //         if (userDoc.exists()) {
// //           const userData = userDoc.data() as UserProfile
// //           setProfile(userData)

// //           if (userData.birthday) {
// //             setBirthday(new Date(userData.birthday))
// //           }

// //           if (userData.anniversary) {
// //             setAnniversary(new Date(userData.anniversary))
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user profile:", error)
// //         toast.error("Failed to load profile")
// //       }
// //     }

// //     const fetchLikedItems = async () => {
// //       if (!user) return

// //       try {
// //         const userDoc = await getDoc(doc(db, "users", user.uid))

// //         if (userDoc.exists()) {
// //           const userData = userDoc.data()
// //           const likedItemIds = userData.likedItems || []

// //           if (likedItemIds.length > 0) {
// //             const likedItemsData = await Promise.all(
// //               likedItemIds.map(async (id: string) => {
// //                 const itemDoc = await getDoc(doc(db, "menuItems", id))
// //                 if (itemDoc.exists()) {
// //                   return { id: itemDoc.id, ...itemDoc.data() }
// //                 }
// //                 return null
// //               }),
// //             )

// //             setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Error fetching liked items:", error)
// //       }
// //     }

// //     const fetchOrders = async () => {
// //       if (!user) return

// //       try {
// //         const userDoc = await getDoc(doc(db, "users", user.uid))

// //         if (userDoc.exists()) {
// //           const userData = userDoc.data()
// //           setOrders(userData.orders || [])
// //         }
// //       } catch (error) {
// //         console.error("Error fetching orders:", error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchUserProfile()
// //     fetchLikedItems()
// //     fetchOrders()
// //   }, [user])

// //   const handleUpdateProfile = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!user) return

// //     try {
// //       const userRef = doc(db, "users", user.uid)

// //       const updatedProfile = {
// //         ...profile,
// //         phone: (e.target as any).phone.value,
// //         address: (e.target as any).address.value,
// //         birthday: birthday ? birthday.toISOString() : null,
// //         anniversary: anniversary ? anniversary.toISOString() : null,
// //         foodPreferences: (e.target as any).foodPreferences.value,
// //         allergies: (e.target as any).allergies.value,
// //       }

// //       await updateDoc(userRef, updatedProfile)
// //       setProfile(updatedProfile)
// //       toast.success("Profile updated successfully")
// //     } catch (error) {
// //       console.error("Error updating profile:", error)
// //       toast.error("Failed to update profile")
// //     }
// //   }

// //   if (isLoading || loading) {
// //     return (
// //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// //       </div>
// //     )
// //   }

// //   if (!user || !profile) {
// //     return (
// //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// //         <Card className="w-full max-w-md">
// //           <CardHeader>
// //             <CardTitle>Not Signed In</CardTitle>
// //             <CardDescription>Please sign in to view your profile</CardDescription>
// //           </CardHeader>
// //           <CardFooter>
// //             <Button asChild className="w-full">
// //               <Link href="/auth">Sign In</Link>
// //             </Button>
// //           </CardFooter>
// //         </Card>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto py-10 px-4">
// //       <div className="flex flex-col md:flex-row gap-8">
// //         <div className="md:w-1/3">
// //           <Card>
// //             <CardHeader className="text-center">
// //               <div className="flex justify-center mb-4">
// //                 <div className="relative h-24 w-24 rounded-full overflow-hidden">
// //                   <Image
// //                     src={profile.photoURL || "/placeholder.svg?height=96&width=96"}
// //                     alt={profile.displayName || "User"}
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //               </div>
// //               <CardTitle>{profile.displayName}</CardTitle>
// //               <CardDescription>{profile.email}</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-sm font-medium text-muted-foreground">Member Since</p>
// //                   <p>{profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}</p>
// //                 </div>
// //                 {profile.phone && (
// //                   <div>
// //                     <p className="text-sm font-medium text-muted-foreground">Phone</p>
// //                     <p>{profile.phone}</p>
// //                   </div>
// //                 )}
// //                 {profile.address && (
// //                   <div>
// //                     <p className="text-sm font-medium text-muted-foreground">Address</p>
// //                     <p>{profile.address}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button asChild variant="outline" className="w-full">
// //                 <Link href="/bucketlist">
// //                   <ShoppingBag className="mr-2 h-4 w-4" />
// //                   View Cart
// //                 </Link>
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         </div>

// //         <div className="md:w-2/3">
// //           <Tabs defaultValue="profile">
// //             <TabsList className="grid w-full grid-cols-3">
// //               <TabsTrigger value="profile">Profile Details</TabsTrigger>
// //               <TabsTrigger value="liked">Liked Items</TabsTrigger>
// //               <TabsTrigger value="orders">Order History</TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="profile">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Profile Information</CardTitle>
// //                   <CardDescription>Update your profile information to enhance your dining experience</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-4">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div className="space-y-2">
// //                         <Label htmlFor="phone">Phone Number</Label>
// //                         <Input
// //                           id="phone"
// //                           name="phone"
// //                           defaultValue={profile.phone || ""}
// //                           placeholder="Enter your phone number"
// //                         />
// //                       </div>

// //                       <div className="space-y-2">
// //                         <Label htmlFor="address">Address</Label>
// //                         <Input
// //                           id="address"
// //                           name="address"
// //                           defaultValue={profile.address || ""}
// //                           placeholder="Enter your address"
// //                         />
// //                       </div>

// //                       <div className="space-y-2">
// //                         <Label>Birthday</Label>
// //                         <Popover>
// //                           <PopoverTrigger asChild>
// //                             <Button variant="outline" className="w-full justify-start text-left font-normal">
// //                               <CalendarIcon className="mr-2 h-4 w-4" />
// //                               {birthday ? format(birthday, "PPP") : "Select your birthday"}
// //                             </Button>
// //                           </PopoverTrigger>
// //                           <PopoverContent className="w-auto p-0">
// //                             <Calendar mode="single" selected={birthday} onSelect={setBirthday} initialFocus />
// //                           </PopoverContent>
// //                         </Popover>
// //                       </div>

// //                       <div className="space-y-2">
// //                         <Label>Anniversary</Label>
// //                         <Popover>
// //                           <PopoverTrigger asChild>
// //                             <Button variant="outline" className="w-full justify-start text-left font-normal">
// //                               <CalendarIcon className="mr-2 h-4 w-4" />
// //                               {anniversary ? format(anniversary, "PPP") : "Select your anniversary"}
// //                             </Button>
// //                           </PopoverTrigger>
// //                           <PopoverContent className="w-auto p-0">
// //                             <Calendar mode="single" selected={anniversary} onSelect={setAnniversary} initialFocus />
// //                           </PopoverContent>
// //                         </Popover>
// //                       </div>
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="foodPreferences">Food Preferences</Label>
// //                       <Textarea
// //                         id="foodPreferences"
// //                         name="foodPreferences"
// //                         defaultValue={profile.foodPreferences || ""}
// //                         placeholder="Tell us about your food preferences (e.g., spice level, favorite dishes)"
// //                       />
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="allergies">Allergies</Label>
// //                       <Textarea
// //                         id="allergies"
// //                         name="allergies"
// //                         defaultValue={profile.allergies || ""}
// //                         placeholder="List any food allergies or dietary restrictions"
// //                       />
// //                     </div>
// //                   </form>
// //                 </CardContent>
// //                 <CardFooter>
// //                   <Button type="submit" form="profile-form" className="ml-auto">
// //                     Save Changes
// //                   </Button>
// //                 </CardFooter>
// //               </Card>
// //             </TabsContent>

// //             <TabsContent value="liked">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Liked Items</CardTitle>
// //                   <CardDescription>Items you've liked from our menu</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {likedItems.length === 0 ? (
// //                     <div className="text-center py-8">
// //                       <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
// //                       <h3 className="text-lg font-medium mb-2">No liked items yet</h3>
// //                       <p className="text-muted-foreground mb-4">Browse our menu and like items to see them here</p>
// //                       <Button asChild>
// //                         <Link href="/menu">Browse Menu</Link>
// //                       </Button>
// //                     </div>
// //                   ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       {likedItems.map((item) => (
// //                         <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
// //                           <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
// //                             <Image
// //                               src={item.imageUrl || "/placeholder.svg?height=64&width=64"}
// //                               alt={item.name}
// //                               fill
// //                               className="object-cover"
// //                             />
// //                           </div>
// //                           <div className="flex-1">
// //                             <h3 className="font-medium">{item.name}</h3>
// //                             <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
// //                             <div className="flex items-center justify-between mt-2">
// //                               <div className="flex items-center text-yellow-500 text-sm">
// //                                 <Star className="h-4 w-4 fill-current mr-1" />
// //                                 {item.rating.toFixed(1)}
// //                               </div>
// //                               <Button asChild variant="ghost" size="sm">
// //                                 <Link href={`/menu/item/${item.id}`}>View</Link>
// //                               </Button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             <TabsContent value="orders">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Order History</CardTitle>
// //                   <CardDescription>View your past orders and their details</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {orders.length === 0 ? (
// //                     <div className="text-center py-8">
// //                       <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
// //                       <h3 className="text-lg font-medium mb-2">No orders yet</h3>
// //                       <p className="text-muted-foreground mb-4">
// //                         Your order history will appear here once you place an order
// //                       </p>
// //                       <Button asChild>
// //                         <Link href="/menu">Browse Menu</Link>
// //                       </Button>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-4">
// //                       {orders.map((order) => (
// //                         <div key={order.id} className="border rounded-lg p-4">
// //                           <div className="flex justify-between items-start mb-4">
// //                             <div>
// //                               <h3 className="font-medium">Order #{order.id}</h3>
// //                               <p className="text-sm text-muted-foreground">{formatDate(order.date.toDate())}</p>
// //                             </div>
// //                             <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
// //                               {order.status}
// //                             </div>
// //                           </div>
// //                           <div className="space-y-2">
// //                             {order.items.map((item: any) => (
// //                               <div key={item.id} className="flex justify-between text-sm">
// //                                 <span>
// //                                   {item.name} x{item.quantity}
// //                                 </span>
// //                                 <span>{formatPrice(item.price * item.quantity)}</span>
// //                               </div>
// //                             ))}
// //                           </div>
// //                           <div className="border-t mt-4 pt-4 flex justify-between font-medium">
// //                             <span>Total</span>
// //                             <span>{formatPrice(order.total)}</span>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { doc, getDoc, updateDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { useAuth } from "@/components/auth-provider"
// import Image from "next/image"
// import Link from "next/link"
// import { format } from "date-fns"
// import toast from "react-hot-toast"
// import { formatDate, formatPrice } from "@/lib/utils"

// // UI Components
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"

// // Icons
// import { 
//   CalendarIcon, 
//   Heart, 
//   ShoppingBag, 
//   Star, 
//   MapPin, 
//   Phone, 
//   Cake, 
//   Gift, 
//   Clock, 
//   User,
//   Calendar as CalendarIconOutline,
//   Settings,
//   ChevronRight,
//   Bookmark,
//   History,
//   ArrowRight
// } from "lucide-react"

// interface UserProfile {
//   uid: string
//   displayName: string
//   email: string
//   photoURL: string
//   phone?: string
//   address?: string
//   birthday?: string
//   anniversary?: string
//   foodPreferences?: string
//   allergies?: string
//   createdAt: any
// }

// interface MenuItem {
//   id: string
//   name: string
//   description: string
//   price: number
//   category: string
//   imageUrl: string
//   rating: number
// }

// export default function ProfilePage() {
//   const router = useRouter()
//   const { user, isLoading } = useAuth()
//   const [profile, setProfile] = useState<UserProfile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [likedItems, setLikedItems] = useState<MenuItem[]>([])
//   const [orders, setOrders] = useState<any[]>([])
//   const [birthday, setBirthday] = useState<Date | undefined>()
//   const [anniversary, setAnniversary] = useState<Date | undefined>()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/auth")
//     }
//   }, [user, isLoading, router])

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!user) return

//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid))

//         if (userDoc.exists()) {
//           const userData = userDoc.data() as UserProfile
//           setProfile(userData)

//           if (userData.birthday) {
//             setBirthday(new Date(userData.birthday))
//           }

//           if (userData.anniversary) {
//             setAnniversary(new Date(userData.anniversary))
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error)
//         toast.error("Failed to load profile")
//       }
//     }

//     const fetchLikedItems = async () => {
//       if (!user) return

//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid))

//         if (userDoc.exists()) {
//           const userData = userDoc.data()
//           const likedItemIds = userData.likedItems || []

//           if (likedItemIds.length > 0) {
//             const likedItemsData = await Promise.all(
//               likedItemIds.map(async (id: string) => {
//                 const itemDoc = await getDoc(doc(db, "menuItems", id))
//                 if (itemDoc.exists()) {
//                   return { id: itemDoc.id, ...itemDoc.data() }
//                 }
//                 return null
//               }),
//             )

//             setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching liked items:", error)
//       }
//     }

//     const fetchOrders = async () => {
//       if (!user) return

//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid))

//         if (userDoc.exists()) {
//           const userData = userDoc.data()
//           setOrders(userData.orders || [])
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserProfile()
//     fetchLikedItems()
//     fetchOrders()
//   }, [user])

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!user) return

//     try {
//       const userRef = doc(db, "users", user.uid)

//       const updatedProfile = {
//         ...profile,
//         phone: (e.target as any).phone.value,
//         address: (e.target as any).address.value,
//         birthday: birthday ? birthday.toISOString() : null,
//         anniversary: anniversary ? anniversary.toISOString() : null,
//         foodPreferences: (e.target as any).foodPreferences.value,
//         allergies: (e.target as any).allergies.value,
//       }

//       await updateDoc(userRef, updatedProfile)
//       setProfile(updatedProfile)
//       toast.success("Profile updated successfully")
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       toast.error("Failed to update profile")
//     }
//   }

//   if (isLoading || loading) {
//     return (
//       <div className="min-h-screen bg-white flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     )
//   }

//   if (!user || !profile) {
//     return (
//       <div className="min-h-screen bg-white flex justify-center items-center p-4">
//         <Card className="w-full max-w-md border-none shadow-lg">
//           <CardHeader className="text-center pb-2">
//             <CardTitle className="text-2xl font-bold text-green-600">Not Signed In</CardTitle>
//             <CardDescription>Please sign in to view your profile</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center pt-4 pb-8">
//             <Image 
//               src="/logo-placeholder.svg" 
//               alt="Restaurant Logo" 
//               width={120} 
//               height={120}
//               className="opacity-50"
//             />
//           </CardContent>
//           <CardFooter>
//             <Button 
//               asChild 
//               className="w-full bg-green-600 hover:bg-green-700 text-white"
//             >
//               <Link href="/auth">Sign In</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4  max-w-3xl">
//         {/* Profile Header Section */}
//         <div className="bg-white rounded-xl shadow-none overflow-hidden mb-4">
//           <div className="relative h-32 bg-gradient-to-r from-green-500 to-green-600">
//             <div className="absolute -bottom-12 left-6">
//               <Avatar className="h-24 w-24 border-4 border-white">
//                 <AvatarImage 
//                   src={profile.photoURL || "/placeholder.svg?height=96&width=96"} 
//                   alt={profile.displayName || "User"} 
//                 />
//                 <AvatarFallback className="bg-green-100 text-green-600">
//                   <User className="h-12 w-12" />
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//           </div>
          
//           <div className="pt-14 pb-4 px-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">{profile.displayName}</h2>
//                 <p className="text-gray-500 text-sm">{profile.email}</p>
//                 <p className="text-sm mt-1 flex items-center text-gray-500">
//                   <Clock className="h-3 w-3 mr-1" />
//                   Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
//                 </p>
//               </div>
              
//               <div className="mt-4 md:mt-0 flex space-x-2">
//                 <Button 
//                   asChild 
//                   variant="outline" 
//                   size="sm" 
//                   className="text-green-600 border-green-600 hover:bg-green-50"
//                 >
//                   <Link href="/menu">
//                     <ArrowRight className="mr-1 h-4 w-4" />
//                     Browse Menu
//                   </Link>
//                 </Button>
//                 <Button 
//                   asChild 
//                   size="sm" 
//                   className="bg-orange-500 hover:bg-orange-600 text-white"
//                 >
//                   <Link href="/bucketlist">
//                     <ShoppingBag className="mr-1 h-4 w-4" />
//                     My Cart
//                   </Link>
//                 </Button>
//               </div>
//             </div>
            
//             {/* Quick Info Pills */}
//             <div className="flex flex-wrap gap-2 mt-4">
//               {profile.phone && (
//                 <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
//                   <Phone className="h-3 w-3 text-green-600" />
//                   <span>{profile.phone}</span>
//                 </Badge>
//               )}
//               {profile.address && (
//                 <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
//                   <MapPin className="h-3 w-3 text-green-600" />
//                   <span>{profile.address}</span>
//                 </Badge>
//               )}
//               {birthday && (
//                 <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
//                   <Cake className="h-3 w-3 text-green-600" />
//                   <span>{format(birthday, "MMM d")}</span>
//                 </Badge>
//               )}
//               {anniversary && (
//                 <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
//                   <Gift className="h-3 w-3 text-green-600" />
//                   <span>{format(anniversary, "MMM d")}</span>
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <Tabs defaultValue="profile" className="mt-6">
//           <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg shadow-none border-none p-1 mb-4 border">
//             <TabsTrigger 
//               value="profile" 
//               className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
//             >
//               <User className="h-4 w-4 mr-2" />
//               Profile
//             </TabsTrigger>
//             <TabsTrigger 
//               value="liked" 
//               className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
//             >
//               <Heart className="h-4 w-4 mr-2" />
//               Favorites
//             </TabsTrigger>
//             <TabsTrigger 
//               value="orders" 
//               className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
//             >
//               <History className="h-4 w-4 mr-2" />
//               Orders
//             </TabsTrigger>
//           </TabsList>

//           {/* Profile Edit Tab */}
//           <TabsContent value="profile">
//             <Card className="border-none shadow-sm">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-medium text-green-600 flex items-center">
//                   <User className="h-5 w-5 mr-2" />
//                   Personal Information
//                 </CardTitle>
//                 <CardDescription>
//                   Customize your profile to enhance your dining experience
//                 </CardDescription>
//               </CardHeader>
              
//               <CardContent>
//                 <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-6">
//                   {/* Contact Section */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="phone" className="text-sm">Phone Number</Label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                           <Input
//                             id="phone"
//                             name="phone"
//                             defaultValue={profile.phone || ""}
//                             placeholder="Enter your phone number"
//                             className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="address" className="text-sm">Delivery Address</Label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                           <Input
//                             id="address"
//                             name="address"
//                             defaultValue={profile.address || ""}
//                             placeholder="Enter your address"
//                             className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Separator className="my-4" />
                  
//                   {/* Special Dates Section */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 mb-3">Special Dates</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm">Birthday</Label>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button 
//                               variant="outline" 
//                               className="w-full justify-start text-left font-normal border-gray-200"
//                             >
//                               <Cake className="mr-2 h-4 w-4 text-green-500" />
//                               {birthday ? format(birthday, "MMMM d, yyyy") : "Select your birthday"}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0">
//                             <Calendar 
//                               mode="single" 
//                               selected={birthday} 
//                               onSelect={setBirthday} 
//                               initialFocus 
//                               className="border-none"
//                               classNames={{
//                                 day_selected: "bg-green-500 text-white",
//                                 day_today: "bg-orange-100 text-orange-600"
//                               }}
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </div>

//                       <div className="space-y-2">
//                         <Label className="text-sm">Anniversary</Label>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button 
//                               variant="outline" 
//                               className="w-full justify-start text-left font-normal border-gray-200"
//                             >
//                               <Gift className="mr-2 h-4 w-4 text-orange-500" />
//                               {anniversary ? format(anniversary, "MMMM d, yyyy") : "Select your anniversary"}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0">
//                             <Calendar 
//                               mode="single" 
//                               selected={anniversary} 
//                               onSelect={setAnniversary} 
//                               initialFocus 
//                               className="border-none"
//                               classNames={{
//                                 day_selected: "bg-orange-500 text-white",
//                                 day_today: "bg-green-100 text-green-600"
//                               }}
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Separator className="my-4" />
                  
//                   {/* Preferences Section */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 mb-3">Dining Preferences</h3>
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="foodPreferences" className="text-sm">Food Preferences</Label>
//                         <Textarea
//                           id="foodPreferences"
//                           name="foodPreferences"
//                           defaultValue={profile.foodPreferences || ""}
//                           placeholder="Tell us about your food preferences (e.g., spice level, favorite cuisines)"
//                           className="min-h-24 border-gray-200 focus:border-green-500 focus:ring-green-500"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="allergies" className="text-sm">Allergies & Restrictions</Label>
//                         <Textarea
//                           id="allergies"
//                           name="allergies"
//                           defaultValue={profile.allergies || ""}
//                           placeholder="List any food allergies or dietary restrictions"
//                           className="min-h-24 border-gray-200 focus:border-green-500 focus:ring-green-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </CardContent>
              
//               <CardFooter className="pt-2 pb-4">
//                 <Button 
//                   type="submit" 
//                   form="profile-form" 
//                   className="ml-auto bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   Save Changes
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           {/* Liked Items Tab */}
//           <TabsContent value="liked">
//             <Card className="border-none shadow-sm">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg font-medium text-green-600 flex items-center">
//                   <Heart className="h-5 w-5 mr-2 text-orange-500" />
//                   Your Favorite Items
//                 </CardTitle>
//                 <CardDescription>
//                   Items you've liked from our menu for quick access
//                 </CardDescription>
//               </CardHeader>
              
//               <CardContent>
//                 {likedItems.length === 0 ? (
//                   <div className="text-center py-16 px-4">
//                     <div className="bg-orange-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Heart className="h-10 w-10 text-orange-400" />
//                     </div>
//                     <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
//                     <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                       Browse our menu and heart your favorite dishes to save them for later
//                     </p>
//                     <Button 
//                       asChild 
//                       className="bg-green-600 hover:bg-green-700 text-white"
//                     >
//                       <Link href="/menu">Explore Our Menu</Link>
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//                     {likedItems.map((item) => (
//                       <Link href={`/menu/item/${item.id}`} key={item.id}>
//                         <div className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
//                           <div className="relative h-24 w-24 bg-gray-100">
//                             <Image
//                               src={item.imageUrl || "/placeholder.svg?height=96&width=96"}
//                               alt={item.name}
//                               fill
//                               className="object-cover group-hover:scale-105 transition-transform"
//                             />
//                           </div>
//                           <div className="flex-1 p-3">
//                             <div className="flex items-start justify-between">
//                               <h3 className="font-medium text-green-800 group-hover:text-green-600 transition-colors">
//                                 {item.name}
//                               </h3>
//                               <Badge className="bg-orange-500 hover:bg-orange-500 text-white">
//                                 {formatPrice(item.price)}
//                               </Badge>
//                             </div>
//                             <p className="text-sm text-gray-500 line-clamp-1 mt-1">
//                               {item.description}
//                             </p>
//                             <div className="flex items-center mt-2">
//                               <div className="flex items-center text-yellow-500 text-sm">
//                                 <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
//                                 <span className="ml-1 text-gray-700">{item.rating.toFixed(1)}</span>
//                               </div>
//                               <span className="mx-2 text-gray-300">•</span>
//                               <span className="text-sm text-gray-500">
//                                 {item.category}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Order History Tab */}
//           <TabsContent value="orders">
//             <Card className="border-none shadow-sm">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg font-medium text-green-600 flex items-center">
//                   <History className="h-5 w-5 mr-2" />
//                   Your Order History
//                 </CardTitle>
//                 <CardDescription>
//                   Track your past orders and reorder your favorites
//                 </CardDescription>
//               </CardHeader>
              
//               <CardContent>
//                 {orders.length === 0 ? (
//                   <div className="text-center py-16 px-4">
//                     <div className="bg-green-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <ShoppingBag className="h-10 w-10 text-green-400" />
//                     </div>
//                     <h3 className="text-lg font-medium mb-2">No orders yet</h3>
//                     <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                       Your order history will appear here once you place your first order
//                     </p>
//                     <Button 
//                       asChild 
//                       className="bg-orange-500 hover:bg-orange-600 text-white"
//                     >
//                       <Link href="/menu">Order Now</Link>
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="space-y-4 mt-4">
//                     {orders.map((order) => (
//                       <div key={order.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
//                         <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3">
//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center">
//                               <CalendarIconOutline className="h-4 w-4 text-green-600 mr-2" />
//                               <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
//                             </div>
//                             <Badge className={
//                               order.status === "Delivered" ? "bg-green-500" : 
//                               order.status === "Processing" ? "bg-orange-500" : 
//                               "bg-blue-500"
//                             }>
//                               {order.status}
//                             </Badge>
//                           </div>
//                           <div className="mt-1 flex justify-between">
//                             <h3 className="font-medium text-green-800">Order #{order.id}</h3>
//                             <span className="text-green-600 font-medium">{formatPrice(order.total)}</span>
//                           </div>
//                         </div>
                        
//                         <div className="p-4">
//                           <div className="space-y-2">
//                             {order.items.map((item: any, index: number) => (
//                               <div key={index} className="flex justify-between items-center">
//                                 <div className="flex items-center">
//                                   <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center mr-2">
//                                     {item.quantity}
//                                   </span>
//                                   <span className="text-gray-800">{item.name}</span>
//                                 </div>
//                                 <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
//                               </div>
//                             ))}
//                           </div>
                          
//                           <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between">
//                             <Button 
//                               variant="ghost" 
//                               size="sm" 
//                               className="text-green-600 hover:text-green-700 hover:bg-green-50 px-2"
//                             >
//                               <Bookmark className="h-4 w-4 mr-1" />
//                               Reorder
//                             </Button>
                            
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="text-green-600 border-green-600 hover:bg-green-50"
//                               asChild
//                             >
//                               <Link href={`/orders/${order.id}`}>
//                                 View Details
//                                 <ChevronRight className="h-4 w-4 ml-1" />
//                               </Link>
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { doc, getDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { formatDate, formatPrice } from "@/lib/utils"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Icons
import {
  Heart,
  ShoppingBag,
  Star,
  MapPin,
  Phone,
  Cake,
  Gift,
  Clock,
  User,
  CalendarIcon as CalendarIconOutline,
  ChevronRight,
  Bookmark,
  History,
  ArrowRight,
  Bell,
} from "lucide-react"

interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string
  phone?: string
  address?: string
  birthday?: string
  anniversary?: string
  foodPreferences?: string
  allergies?: string
  createdAt: any
  followers?: string[]
  following?: string[]
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  rating: number
}

interface Notification {
  id: string
  title: string
  message: string
  sentBy: string
  createdAt: any
}

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedItems, setLikedItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [birthday, setBirthday] = useState<Date | undefined>()
  const [anniversary, setAnniversary] = useState<Date | undefined>()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Get tab from URL if provided
  const tabFromUrl = searchParams.get("tab")
  const defaultTab = tabFromUrl || "profile"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile
          setProfile(userData)

          if (userData.birthday) {
            setBirthday(new Date(userData.birthday))
          }

          if (userData.anniversary) {
            setAnniversary(new Date(userData.anniversary))
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        toast.error("Failed to load profile")
      }
    }

    const fetchLikedItems = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const likedItemIds = userData.likedItems || []

          if (likedItemIds.length > 0) {
            const likedItemsData = await Promise.all(
              likedItemIds.map(async (id: string) => {
                const itemDoc = await getDoc(doc(db, "menuItems", id))
                if (itemDoc.exists()) {
                  return { id: itemDoc.id, ...itemDoc.data() }
                }
                return null
              }),
            )

            setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
          }
        }
      } catch (error) {
        console.error("Error fetching liked items:", error)
      }
    }

    const fetchOrders = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setOrders(userData.orders || [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    const fetchNotifications = async () => {
      if (!user) return

      try {
        // Get user's read notifications
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}
        const userReadNotifications = userData.readNotifications || []

        // Get all notifications for this user
        const notificationsCollection = collection(db, "notifications")
        const notificationsQuery = query(notificationsCollection, where("recipients", "in", ["all", user.uid]))

        const notificationsSnapshot = await getDocs(notificationsQuery)
        type Notification = {
          id: string;
          title: string;
          message: string;
          sentBy: string;
          createdAt: Date;
          read: boolean;
        };
        
        const notificationsList: Notification[] = notificationsSnapshot.docs.map((doc) => {
          const data = doc.data() as Notification; // Ensure data matches Notification type
          return {
            id: doc.id,
            title: data.title,       // Ensure all required properties exist
            message: data.message,
            sentBy: data.sentBy,
            createdAt: data.createdAt, // Ensure correct type
            read: userReadNotifications.includes(doc.id),
          };
        });
        

        setNotifications(notificationsList)
        setUnreadCount(notificationsList.filter((n) => !n.read).length)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
    fetchLikedItems()
    fetchOrders()
    fetchNotifications()
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    try {
      const userRef = doc(db, "users", user.uid)

      const updatedProfile = {
        ...profile,
        phone: (e.target as any).phone.value,
        address: (e.target as any).address.value,
        birthday: birthday ? birthday.toISOString() : null,
        anniversary: anniversary ? anniversary.toISOString() : null,
        foodPreferences: (e.target as any).foodPreferences.value,
        allergies: (e.target as any).allergies.value,
      }

      await updateDoc(userRef, updatedProfile)
      setProfile(updatedProfile)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center p-4">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4 pb-8">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Restaurant Logo"
              width={120}
              height={120}
              className="opacity-50"
            />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Link href="/auth">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Profile Header Section */}
        <div className="bg-white rounded-xl shadow-none overflow-hidden mb-4">
          <div className="relative h-32 bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute -bottom-12 left-6">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage
                  src={profile.photoURL || "/placeholder.svg?height=96&width=96"}
                  alt={profile.displayName || "User"}
                />
                <AvatarFallback className="bg-green-100 text-green-600">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="pt-14 pb-4 px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{profile.displayName}</h2>
                <p className="text-gray-500 text-sm">{profile.email}</p>
                <p className="text-sm mt-1 flex items-center text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Link href="/menu">
                    <ArrowRight className="mr-1 h-4 w-4" />
                    Browse Menu
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/bucketlist">
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    My Cart
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.phone && (
                <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
                  <Phone className="h-3 w-3 text-green-600" />
                  <span>{profile.phone}</span>
                </Badge>
              )}
              {profile.address && (
                <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
                  <MapPin className="h-3 w-3 text-green-600" />
                  <span>{profile.address}</span>
                </Badge>
              )}
              {birthday && (
                <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
                  <Cake className="h-3 w-3 text-green-600" />
                  <span>{format(birthday, "MMM d")}</span>
                </Badge>
              )}
              {anniversary && (
                <Badge variant="outline" className="flex items-center gap-1 py-1 bg-green-50">
                  <Gift className="h-3 w-3 text-green-600" />
                  <span>{format(anniversary, "MMM d")}</span>
                </Badge>
              )}
              <Link href="/notifications">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 py-1 bg-green-50 cursor-pointer hover:bg-green-100"
                >
                  <Bell className="h-3 w-3 text-green-600" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Badge>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue={defaultTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg shadow-none border-none p-1 mb-4 border">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 rounded-md"
            >
              <History className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Profile Edit Tab */}
          <TabsContent value="profile">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-green-600 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>Customize your profile to enhance your dining experience</CardDescription>
              </CardHeader>

              <CardContent>
                <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Contact Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            defaultValue={profile.phone || ""}
                            placeholder="Enter your phone number"
                            className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm">
                          Delivery Address
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="address"
                            name="address"
                            defaultValue={profile.address || ""}
                            placeholder="Enter your address"
                            className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Special Dates Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Special Dates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Birthday</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal border-gray-200"
                            >
                              <Cake className="mr-2 h-4 w-4 text-green-500" />
                              {birthday ? format(birthday, "MMMM d, yyyy") : "Select your birthday"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={birthday}
                              onSelect={setBirthday}
                              initialFocus
                              className="border-none"
                              classNames={{
                                day_selected: "bg-green-500 text-white",
                                day_today: "bg-orange-100 text-orange-600",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Anniversary</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal border-gray-200"
                            >
                              <Gift className="mr-2 h-4 w-4 text-orange-500" />
                              {anniversary ? format(anniversary, "MMMM d, yyyy") : "Select your anniversary"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={anniversary}
                              onSelect={setAnniversary}
                              initialFocus
                              className="border-none"
                              classNames={{
                                day_selected: "bg-orange-500 text-white",
                                day_today: "bg-green-100 text-green-600",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Preferences Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Dining Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="foodPreferences" className="text-sm">
                          Food Preferences
                        </Label>
                        <Textarea
                          id="foodPreferences"
                          name="foodPreferences"
                          defaultValue={profile.foodPreferences || ""}
                          placeholder="Tell us about your food preferences (e.g., spice level, favorite cuisines)"
                          className="min-h-24 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="allergies" className="text-sm">
                          Allergies & Restrictions
                        </Label>
                        <Textarea
                          id="allergies"
                          name="allergies"
                          defaultValue={profile.allergies || ""}
                          placeholder="List any food allergies or dietary restrictions"
                          className="min-h-24 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="pt-2 pb-4">
                <Button
                  type="submit"
                  form="profile-form"
                  className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Liked Items Tab */}
          <TabsContent value="liked">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-green-600 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-orange-500" />
                  Your Favorite Items
                </CardTitle>
                <CardDescription>Items you've liked from our menu for quick access</CardDescription>
              </CardHeader>

              <CardContent>
                {likedItems.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="bg-orange-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-10 w-10 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Browse our menu and heart your favorite dishes to save them for later
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                      <Link href="/menu">Explore Our Menu</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {likedItems.map((item) => (
                      <Link href={`/menu/item/${item.id}`} key={item.id}>
                        <div className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                          <div className="relative h-24 w-24 bg-gray-100">
                            <Image
                              src={item.imageUrl || "/placeholder.svg?height=96&width=96"}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium text-green-800 group-hover:text-green-600 transition-colors">
                                {item.name}
                              </h3>
                              <Badge className="bg-orange-500 hover:bg-orange-500 text-white">
                                {formatPrice(item.price)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">{item.description}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center text-yellow-500 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                <span className="ml-1 text-gray-700">{item.rating.toFixed(1)}</span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{item.category}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-green-600 flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Your Order History
                </CardTitle>
                <CardDescription>Track your past orders and reorder your favorites</CardDescription>
              </CardHeader>

              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="bg-green-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Your order history will appear here once you place your first order
                    </p>
                    <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Link href="/menu">Order Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 mt-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm"
                      >
                        <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <CalendarIconOutline className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
                            </div>
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-500"
                                  : order.status === "Processing"
                                    ? "bg-orange-500"
                                    : "bg-blue-500"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <h3 className="font-medium text-green-800">Order #{order.id}</h3>
                            <span className="text-green-600 font-medium">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="space-y-2">
                            {order.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center mr-2">
                                    {item.quantity}
                                  </span>
                                  <span className="text-gray-800">{item.name}</span>
                                </div>
                                <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 px-2"
                            >
                              <Bookmark className="h-4 w-4 mr-1" />
                              Reorder
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              asChild
                            >
                              <Link href={`/orders/${order.id}`}>
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

