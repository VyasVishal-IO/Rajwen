// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { useParams } from "next/navigation"
// // // // import { doc, getDoc } from "firebase/firestore"
// // // // import { db } from "@/lib/firebase"
// // // // import Image from "next/image"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { formatDate } from "@/lib/utils"
// // // // import Link from "next/link"
// // // // import { ArrowLeft } from "lucide-react"

// // // // interface UserProfile {
// // // //   uid: string
// // // //   displayName: string
// // // //   email: string
// // // //   photoURL: string
// // // //   createdAt: any
// // // // }

// // // // export default function UserProfilePage() {
// // // //   const { id } = useParams()
// // // //   const [profile, setProfile] = useState<UserProfile | null>(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState<string | null>(null)

// // // //   useEffect(() => {
// // // //     const fetchUserProfile = async () => {
// // // //       try {
// // // //         const userDoc = await getDoc(doc(db, "users", id as string))

// // // //         if (userDoc.exists()) {
// // // //           setProfile(userDoc.data() as UserProfile)
// // // //         } else {
// // // //           setError("User not found")
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching user profile:", error)
// // // //         setError("Failed to load user profile")
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }

// // // //     fetchUserProfile()
// // // //   }, [id])

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (error || !profile) {
// // // //     return (
// // // //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// // // //         <Card className="w-full max-w-md">
// // // //           <CardHeader>
// // // //             <CardTitle>Error</CardTitle>
// // // //             <CardDescription>{error || "User not found"}</CardDescription>
// // // //           </CardHeader>
// // // //           <CardFooter>
// // // //             <Button asChild className="w-full">
// // // //               <Link href="/menu">Back to Menu</Link>
// // // //             </Button>
// // // //           </CardFooter>
// // // //         </Card>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto py-10 px-4">
// // // //       <Button asChild variant="ghost" className="mb-6">
// // // //         <Link href="/menu">
// // // //           <ArrowLeft className="mr-2 h-4 w-4" />
// // // //           Back to Menu
// // // //         </Link>
// // // //       </Button>

// // // //       <Card className="max-w-2xl mx-auto">
// // // //         <CardHeader className="text-center">
// // // //           <div className="flex justify-center mb-4">
// // // //             <div className="relative h-24 w-24 rounded-full overflow-hidden">
// // // //               <Image
// // // //                 src={profile.photoURL || "/placeholder.svg?height=96&width=96"}
// // // //                 alt={profile.displayName || "User"}
// // // //                 fill
// // // //                 className="object-cover"
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //           <CardTitle>{profile.displayName}</CardTitle>
// // // //           <CardDescription>Community Member</CardDescription>
// // // //         </CardHeader>
// // // //         <CardContent className="space-y-4">
// // // //           <div>
// // // //             <p className="text-sm font-medium text-muted-foreground">Member Since</p>
// // // //             <p>{profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}</p>
// // // //           </div>

// // // //           <div className="border-t pt-4">
// // // //             <p className="text-center text-muted-foreground">
// // // //               This is a public profile. Users can only see basic information.
// // // //             </p>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   )
// // // // }

// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useParams } from "next/navigation"
// // // import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
// // // import { db } from "@/lib/firebase"
// // // import { useAuth } from "@/components/auth-provider"
// // // import Image from "next/image"
// // // import Link from "next/link"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // // import { Badge } from "@/components/ui/badge"
// // // import { formatDate, formatPrice } from "@/lib/utils"
// // // import { ArrowLeft, User, Heart, ShoppingBag, Star, Calendar, Mail, UserPlus, UserCheck } from "lucide-react"
// // // import toast from "react-hot-toast"

// // // interface UserProfile {
// // //   uid: string
// // //   displayName: string
// // //   email: string
// // //   photoURL: string
// // //   createdAt: any
// // //   followers?: string[]
// // //   following?: string[]
// // //   likedItems?: string[]
// // // }

// // // interface MenuItem {
// // //   id: string
// // //   name: string
// // //   description: string
// // //   price: number
// // //   category: string
// // //   imageUrl: string
// // //   rating: number
// // // }

// // // export default function UserProfilePage() {
// // //   const { id } = useParams()
// // //   const { user } = useAuth()
// // //   const [profile, setProfile]  {
// // //   const { id } = useParams()
// // //   const { user } = useAuth()
// // //   const [profile, setProfile] = useState<UserProfile | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState<string | null>(null)
// // //   const [likedItems, setLikedItems] = useState<MenuItem[]>([])
// // //   const [orders, setOrders] = useState<any[]>([])
// // //   const [isFollowing, setIsFollowing] = useState(false)
// // //   const [followerCount, setFollowerCount] = useState(0)
// // //   const [followingCount, setFollowingCount] = useState(0)

// // //   useEffect(() => {
// // //     const fetchUserProfile = async () => {
// // //       try {
// // //         const userDoc = await getDoc(doc(db, "users", id as string))

// // //         if (userDoc.exists()) {
// // //           const userData = userDoc.data() as UserProfile
// // //           setProfile(userData)
          
// // //           // Check if current user is following this profile
// // //           if (user && userData.followers) {
// // //             setIsFollowing(userData.followers.includes(user.uid))
// // //             setFollowerCount(userData.followers.length || 0)
// // //           }
          
// // //           if (userData.following) {
// // //             setFollowingCount(userData.following.length || 0)
// // //           }
          
// // //           // Fetch liked items if any
// // //           if (userData.likedItems && userData.likedItems.length > 0) {
// // //             const likedItemsData = await Promise.all(
// // //               userData.likedItems.map(async (itemId) => {
// // //                 const itemDoc = await getDoc(doc(db, "menuItems", itemId))
// // //                 if (itemDoc.exists()) {
// // //                   return { id: itemDoc.id, ...itemDoc.data() }
// // //                 }
// // //                 return null
// // //               })
// // //             )
            
// // //             setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
// // //           }
          
// // //           // Fetch orders if any
// // //           if (userData.orders) {
// // //             setOrders(userData.orders)
// // //           }
// // //         } else {
// // //           setError("User not found")
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching user profile:", error)
// // //         setError("Failed to load user profile")
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }

// // //     fetchUserProfile()
// // //   }, [id, user])

// // //   const handleFollowToggle = async () => {
// // //     if (!user) {
// // //       toast.error("Please sign in to follow users")
// // //       return
// // //     }
    
// // //     if (user.uid === id) {
// // //       toast.error("You cannot follow yourself")
// // //       return
// // //     }
    
// // //     try {
// // //       const userRef = doc(db, "users", id as string)
// // //       const currentUserRef = doc(db, "users", user.uid)
      
// // //       if (isFollowing) {
// // //         // Unfollow
// // //         await updateDoc(userRef, {
// // //           followers: arrayRemove(user.uid)
// // //         })
        
// // //         await updateDoc(currentUserRef, {
// // //           following: arrayRemove(id)
// // //         })
        
// // //         setIsFollowing(false)
// // //         setFollowerCount(prev => Math.max(0, prev - 1))
// // //         toast.success(`Unfollowed ${profile?.displayName}`)
// // //       } else {
// // //         // Follow
// // //         await updateDoc(userRef, {
// // //           followers: arrayUnion(user.uid)
// // //         })
        
// // //         await updateDoc(currentUserRef, {
// // //           following: arrayUnion(id)
// // //         })
        
// // //         setIsFollowing(true)
// // //         setFollowerCount(prev => prev + 1)
// // //         toast.success(`Following ${profile?.displayName}`)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating follow status:", error)
// // //       toast.error("Failed to update follow status")
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error || !profile) {
// // //     return (
// // //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// // //         <Card className="w-full max-w-md">
// // //           <CardHeader>
// // //             <CardTitle>Error</CardTitle>
// // //             <CardDescription>{error || "User not found"}</CardDescription>
// // //           </CardHeader>
// // //           <CardFooter>
// // //             <Button asChild className="w-full">
// // //               <Link href="/menu">Back to Menu</Link>
// // //             </Button>
// // //           </CardFooter>
// // //         </Card>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="container mx-auto py-10 px-4 max-w-3xl">
// // //       <Button asChild variant="ghost" className="mb-6">
// // //         <Link href="/search">
// // //           <ArrowLeft className="mr-2 h-4 w-4" />
// // //           Back to Search
// // //         </Link>
// // //       </Button>

// // //       <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
// // //         <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
// // //           <div className="absolute -bottom-12 left-6">
// // //             <Avatar className="h-24 w-24 border-4 border-white">
// // //               <AvatarImage 
// // //                 src={profile.photoURL || "/placeholder.svg?height=96&width=96"} 
// // //                 alt={profile.displayName || "User"} 
// // //               />
// // //               <AvatarFallback className="bg-primary/10 text-primary">
// // //                 <User className="h-12 w-12" />
// // //               </AvatarFallback>
// // //             </Avatar>
// // //           </div>
// // //         </div>
        
// // //         <div className="pt-14 pb-4 px-6">
// // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// // //             <div>
// // //               <h2 className="text-xl font-bold">{profile.displayName}</h2>
// // //               <div className="flex items-center text-muted-foreground text-sm gap-2">
// // //                 <Mail className="h-3.5 w-3.5" />
// // //                 <span>{profile.email}</span>
// // //               </div>
// // //               <p className="text-sm mt-1 flex items-center text-muted-foreground">
// // //                 <Calendar className="h-3.5 w-3.5 mr-1" />
// // //                 Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
// // //               </p>
// // //             </div>
            
// // //             <div className="mt-4 md:mt-0 flex flex-col gap-2">
// // //               <div className="flex gap-4 text-sm">
// // //                 <div className="flex flex-col items-center">
// // //                   <span className="font-bold">{followerCount}</span>
// // //                   <span className="text-muted-foreground">Followers</span>
// // //                 </div>
// // //                 <div className="flex flex-col items-center">
// // //                   <span className="font-bold">{followingCount}</span>
// // //                   <span className="text-muted-foreground">Following</span>
// // //                 </div>
// // //                 <div className="flex flex-col items-center">
// // //                   <span className="font-bold">{likedItems.length}</span>
// // //                   <span className="text-muted-foreground">Favorites</span>
// // //                 </div>
// // //               </div>
              
// // //               {user && user.uid !== id && (
// // //                 <Button 
// // //                   onClick={handleFollowToggle}
// // //                   variant={isFollowing ? "outline" : "default"}
// // //                   className={isFollowing ? "border-primary text-primary hover:bg-primary/10" : ""}
// // //                 >
// // //                   {isFollowing ? (
// // //                     <>
// // //                       <UserCheck className="mr-2 h-4 w-4" />
// // //                       Following
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <UserPlus className="mr-2 h-4 w-4" />
// // //                       Follow
// // //                     </>
// // //                   )}
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <Tabs defaultValue="favorites" className="mt-6">
// // //         <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-none border-none p-1 mb-4 border">
// // //           <TabsTrigger 
// // //             value="favorites" 
// // //             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
// // //           >
// // //             <Heart className="h-4 w-4 mr-2" />
// // //             Favorites
// // //           </TabsTrigger>
// // //           <TabsTrigger 
// // //             value="orders" 
// // //             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
// // //           >
// // //             <ShoppingBag className="h-4 w-4 mr-2" />
// // //             Recent Orders
// // //           </TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="favorites">
// // //           <Card className="border-none shadow-sm">
// // //             <CardHeader className="pb-2">
// // //               <CardTitle className="text-lg font-medium flex items-center">
// // //                 <Heart className="h-5 w-5 mr-2 text-red-500" />
// // //                 {profile.displayName}'s Favorite Items
// // //               </CardTitle>
// // //               <CardDescription>
// // //                 Dishes that {profile.displayName} loves
// // //               </CardDescription>
// // //             </CardHeader>
            
// // //             <CardContent>
// // //               {likedItems.length === 0 ? (
// // //                 <div className="text-center py-12 px-4">
// // //                   <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                     <Heart className="h-8 w-8 text-red-400" />
// // //                   </div>
// // //                   <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
// // //                   <p className="text-muted-foreground mb-4">
// // //                     {profile.displayName} hasn't liked any items yet
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// // //                   {likedItems.map((item) => (
// // //                     <Link href={`/menu/item/${item.id}`} key={item.id}>
// // //                       <div className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
// // //                         <div className="relative h-24 w-24 bg-gray-100">
// // //                           <Image
// // //                             src={item.imageUrl || "/placeholder.svg?height=96&width=96"}
// // //                             alt={item.name}
// // //                             fill
// // //                             className="object-cover group-hover:scale-105 transition-transform"
// // //                           />
// // //                         </div>
// // //                         <div className="flex-1 p-3">
// // //                           <div className="flex items-start justify-between">
// // //                             <h3 className="font-medium group-hover:text-primary transition-colors">
// // //                               {item.name}
// // //                             </h3>
// // //                             <Badge className="bg-primary hover:bg-primary text-white">
// // //                               {formatPrice(item.price)}
// // //                             </Badge>
// // //                           </div>
// // //                           <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
// // //                             {item.description}
// // //                           </p>
// // //                           <div className="flex items-center mt-2">
// // //                             <div className="flex items-center text-yellow-500 text-sm">
// // //                               <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
// // //                               <span className="ml-1 text-gray-700">{item.rating.toFixed(1)}</span>
// // //                             </div>
// // //                             <span className="mx-2 text-gray-300">•</span>
// // //                             <span className="text-sm text-muted-foreground capitalize">
// // //                               {item.category}
// // //                             </span>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </Link>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </CardContent>
// // //           </Card>
// // //         </TabsContent>

// // //         <TabsContent value="orders">
// // //           <Card className="border-none shadow-sm">
// // //             <CardHeader className="pb-2">
// // //               <CardTitle className="text-lg font-medium flex items-center">
// // //                 <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
// // //                 Recent Orders
// // //               </CardTitle>
// // //               <CardDescription>
// // //                 {profile.displayName}'s recent orders
// // //               </CardDescription>
// // //             </CardHeader>
            
// // //             <CardContent>
// // //               {orders.length === 0 ? (
// // //                 <div className="text-center py-12 px-4">
// // //                   <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                     <ShoppingBag className="h-8 w-8 text-primary" />
// // //                   </div>
// // //                   <h3 className="text-lg font-medium mb-2">No orders yet</h3>
// // //                   <p className="text-muted-foreground mb-4">
// // //                     {profile.displayName} hasn't placed any orders yet
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-4 mt-4">
// // //                   {orders.slice(0, 3).map((order) => (
// // //                     <div key={order.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
// // //                       <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
// // //                         <div className="flex justify-between items-center">
// // //                           <div className="flex items-center">
// // //                             <Calendar className="h-4 w-4 text-primary mr-2" />
// // //                             <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
// // //                           </div>
// // //                           <Badge className={
// // //                             order.status === "Delivered" ? "bg-green-500" : 
// // //                             order.status === "Processing" ? "bg-orange-500" : 
// // //                             "bg-blue-500"
// // //                           }>
// // //                             {order.status}
// // //                           </Badge>
// // //                         </div>
// // //                         <div className="mt-1 flex justify-between">
// // //                           <h3 className="font-medium">Order #{order.id}</h3>
// // //                           <span className="text-primary font-medium">{formatPrice(order.total)}</span>
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="p-4">
// // //                         <div className="space-y-2">
// // //                           {order.items.slice(0, 3).map((item: any, index: number) => (
// // //                             <div key={index} className="flex justify-between items-center">
// // //                               <div className="flex items-center">
// // //                                 <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-2">
// // //                                   {item.quantity}
// // //                                 </span>
// // //                                 <span className="text-gray-800">{item.name}</span>
// // //                               </div>
// // //                               <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
// // //                             </div>
// // //                           ))}
// // //                           {order.items.length > 3 && (
// // //                             <p className="text-sm text-muted-foreground text-center mt-2">
// // //                               +{order.items.length - 3} more items
// // //                             </p>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
                  
// // //                   {orders.length > 3 && (
// // //                     <p className="text-sm text-center text-muted-foreground">
// // //                       Showing 3 of {orders.length} orders
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </CardContent>
// // //           </Card>
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   )
// // // }

// // "use client"

// // import { useState, useEffect } from "react"
// // import { useParams } from "next/navigation"
// // import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
// // import { db } from "@/lib/firebase"
// // import { useAuth } from "@/components/auth-provider"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Badge } from "@/components/ui/badge"
// // import { formatDate, formatPrice } from "@/lib/utils"
// // import { ArrowLeft, User, Heart, ShoppingBag, Star, Calendar, Mail, UserPlus, UserCheck } from "lucide-react"
// // import toast from "react-hot-toast"

// // interface UserProfile {
// //   uid: string
// //   displayName: string
// //   email: string
// //   photoURL: string
// //   createdAt: any
// //   followers?: string[]
// //   following?: string[]
// //   likedItems?: string[]
// //   orders?: any[]
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

// // export default function UserProfilePage() {
// //   const { id } = useParams()
// //   const { user } = useAuth()
// //   const [profile, setProfile] = useState<UserProfile | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const [likedItems, setLikedItems] = useState<MenuItem[]>([])
// //   const [orders, setOrders] = useState<any[]>([])
// //   const [isFollowing, setIsFollowing] = useState(false)
// //   const [followerCount, setFollowerCount] = useState(0)
// //   const [followingCount, setFollowingCount] = useState(0)

// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       try {
// //         const userDoc = await getDoc(doc(db, "users", id as string))

// //         if (userDoc.exists()) {
// //           const userData = userDoc.data() as UserProfile
// //           setProfile(userData)
          
// //           // Check if current user is following this profile
// //           if (user && userData.followers) {
// //             setIsFollowing(userData.followers.includes(user.uid))
// //             setFollowerCount(userData.followers.length || 0)
// //           }
          
// //           if (userData.following) {
// //             setFollowingCount(userData.following.length || 0)
// //           }
          
// //           // Fetch liked items if any
// //           if (userData.likedItems && userData.likedItems.length > 0) {
// //             const likedItemsData = await Promise.all(
// //               userData.likedItems.map(async (itemId) => {
// //                 const itemDoc = await getDoc(doc(db, "menuItems", itemId))
// //                 if (itemDoc.exists()) {
// //                   return { id: itemDoc.id, ...itemDoc.data() }
// //                 }
// //                 return null
// //               })
// //             )
            
// //             setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
// //           }
          
// //           // Fetch orders if any
// //           if (userData.orders) {
// //             setOrders(userData.orders)
// //           }
// //         } else {
// //           setError("User not found")
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user profile:", error)
// //         setError("Failed to load user profile")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchUserProfile()
// //   }, [id, user])

// //   const handleFollowToggle = async () => {
// //     if (!user) {
// //       toast.error("Please sign in to follow users")
// //       return
// //     }
    
// //     if (user.uid === id) {
// //       toast.error("You cannot follow yourself")
// //       return
// //     }
    
// //     try {
// //       const userRef = doc(db, "users", id as string)
// //       const currentUserRef = doc(db, "users", user.uid)
      
// //       if (isFollowing) {
// //         // Unfollow
// //         await updateDoc(userRef, {
// //           followers: arrayRemove(user.uid)
// //         })
        
// //         await updateDoc(currentUserRef, {
// //           following: arrayRemove(id)
// //         })
        
// //         setIsFollowing(false)
// //         setFollowerCount(prev => Math.max(0, prev - 1))
// //         toast.success(`Unfollowed ${profile?.displayName}`)
// //       } else {
// //         // Follow
// //         await updateDoc(userRef, {
// //           followers: arrayUnion(user.uid)
// //         })
        
// //         await updateDoc(currentUserRef, {
// //           following: arrayUnion(id)
// //         })
        
// //         setIsFollowing(true)
// //         setFollowerCount(prev => prev + 1)
// //         toast.success(`Following ${profile?.displayName}`)
// //       }
// //     } catch (error) {
// //       console.error("Error updating follow status:", error)
// //       toast.error("Failed to update follow status")
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// //       </div>
// //     )
// //   }

// //   if (error || !profile) {
// //     return (
// //       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
// //         <Card className="w-full max-w-md">
// //           <CardHeader>
// //             <CardTitle>Error</CardTitle>
// //             <CardDescription>{error || "User not found"}</CardDescription>
// //           </CardHeader>
// //           <CardFooter>
// //             <Button asChild className="w-full">
// //               <Link href="/menu">Back to Menu</Link>
// //             </Button>
// //           </CardFooter>
// //         </Card>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto py-10 px-4 max-w-3xl">
// //       <Button asChild variant="ghost" className="mb-6">
// //         <Link href="/search">
// //           <ArrowLeft className="mr-2 h-4 w-4" />
// //           Back to Search
// //         </Link>
// //       </Button>

// //       <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
// //         <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
// //           <div className="absolute -bottom-12 left-6">
// //             <Avatar className="h-24 w-24 border-4 border-white">
// //               <AvatarImage 
// //                 src={profile.photoURL || "/placeholder.svg?height=96&width=96"} 
// //                 alt={profile.displayName || "User"} 
// //               />
// //               <AvatarFallback className="bg-primary/10 text-primary">
// //                 <User className="h-12 w-12" />
// //               </AvatarFallback>
// //             </Avatar>
// //           </div>
// //         </div>
        
// //         <div className="pt-14 pb-4 px-6">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //             <div>
// //               <h2 className="text-xl font-bold">{profile.displayName}</h2>
// //               <div className="flex items-center text-muted-foreground text-sm gap-2">
// //                 <Mail className="h-3.5 w-3.5" />
// //                 <span>{profile.email}</span>
// //               </div>
// //               <p className="text-sm mt-1 flex items-center text-muted-foreground">
// //                 <Calendar className="h-3.5 w-3.5 mr-1" />
// //                 Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
// //               </p>
// //             </div>
            
// //             <div className="mt-4 md:mt-0 flex flex-col gap-2">
// //               <div className="flex gap-4 text-sm">
// //                 <div className="flex flex-col items-center">
// //                   <span className="font-bold">{followerCount}</span>
// //                   <span className="text-muted-foreground">Followers</span>
// //                 </div>
// //                 <div className="flex flex-col items-center">
// //                   <span className="font-bold">{followingCount}</span>
// //                   <span className="text-muted-foreground">Following</span>
// //                 </div>
// //                 <div className="flex flex-col items-center">
// //                   <span className="font-bold">{likedItems.length}</span>
// //                   <span className="text-muted-foreground">Favorites</span>
// //                 </div>
// //               </div>
              
// //               {user && user.uid !== id && (
// //                 <Button 
// //                   onClick={handleFollowToggle}
// //                   variant={isFollowing ? "outline" : "default"}
// //                   className={isFollowing ? "border-primary text-primary hover:bg-primary/10" : ""}
// //                 >
// //                   {isFollowing ? (
// //                     <>
// //                       <UserCheck className="mr-2 h-4 w-4" />
// //                       Following
// //                     </>
// //                   ) : (
// //                     <>
// //                       <UserPlus className="mr-2 h-4 w-4" />
// //                       Follow
// //                     </>
// //                   )}
// //                 </Button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <Tabs defaultValue="favorites" className="mt-6">
// //         <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-none border-none p-1 mb-4 border">
// //           <TabsTrigger 
// //             value="favorites" 
// //             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
// //           >
// //             <Heart className="h-4 w-4 mr-2" />
// //             Favorites
// //           </TabsTrigger>
// //           <TabsTrigger 
// //             value="orders" 
// //             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
// //           >
// //             <ShoppingBag className="h-4 w-4 mr-2" />
// //             Recent Orders
// //           </TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="favorites">
// //           <Card className="border-none shadow-sm">
// //             <CardHeader className="pb-2">
// //               <CardTitle className="text-lg font-medium flex items-center">
// //                 <Heart className="h-5 w-5 mr-2 text-red-500" />
// //                 {profile.displayName}'s Favorite Items
// //               </CardTitle>
// //               <CardDescription>
// //                 Dishes that {profile.displayName} loves
// //               </CardDescription>
// //             </CardHeader>
            
// //             <CardContent>
// //               {likedItems.length === 0 ? (
// //                 <div className="text-center py-12 px-4">
// //                   <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <Heart className="h-8 w-8 text-red-400" />
// //                   </div>
// //                   <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
// //                   <p className="text-muted-foreground mb-4">
// //                     {profile.displayName} hasn't liked any items yet
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
// //                   {likedItems.map((item) => (
// //                     <Link href={`/menu/item/${item.id}`} key={item.id}>
// //                       <div className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
// //                         <div className="relative h-24 w-24 bg-gray-100">
// //                           <Image
// //                             src={item.imageUrl || "/placeholder.svg?height=96&width=96"}
// //                             alt={item.name}
// //                             fill
// //                             className="object-cover group-hover:scale-105 transition-transform"
// //                           />
// //                         </div>
// //                         <div className="flex-1 p-3">
// //                           <div className="flex items-start justify-between">
// //                             <h3 className="font-medium group-hover:text-primary transition-colors">
// //                               {item.name}
// //                             </h3>
// //                             <Badge className="bg-primary hover:bg-primary text-white">
// //                               {formatPrice(item.price)}
// //                             </Badge>
// //                           </div>
// //                           <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
// //                             {item.description}
// //                           </p>
// //                           <div className="flex items-center mt-2">
// //                             <div className="flex items-center text-yellow-500 text-sm">
// //                               <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
// //                               <span className="ml-1 text-gray-700">{item.rating.toFixed(1)}</span>
// //                             </div>
// //                             <span className="mx-2 text-gray-300">•</span>
// //                             <span className="text-sm text-muted-foreground capitalize">
// //                               {item.category}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </TabsContent>

// //         <TabsContent value="orders">
// //           <Card className="border-none shadow-sm">
// //             <CardHeader className="pb-2">
// //               <CardTitle className="text-lg font-medium flex items-center">
// //                 <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
// //                 Recent Orders
// //               </CardTitle>
// //               <CardDescription>
// //                 {profile.displayName}'s recent orders
// //               </CardDescription>
// //             </CardHeader>
            
// //             <CardContent>
// //               {orders.length === 0 ? (
// //                 <div className="text-center py-12 px-4">
// //                   <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <ShoppingBag className="h-8 w-8 text-primary" />
// //                   </div>
// //                   <h3 className="text-lg font-medium mb-2">No orders yet</h3>
// //                   <p className="text-muted-foreground mb-4">
// //                     {profile.displayName} hasn't placed any orders yet
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4 mt-4">
// //                   {orders.slice(0, 3).map((order) => (
// //                     <div key={order.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
// //                       <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
// //                         <div className="flex justify-between items-center">
// //                           <div className="flex items-center">
// //                             <Calendar className="h-4 w-4 text-primary mr-2" />
// //                             <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
// //                           </div>
// //                           <Badge className={
// //                             order.status === "Delivered" ? "bg-green-500" : 
// //                             order.status === "Processing" ? "bg-orange-500" : 
// //                             "bg-blue-500"
// //                           }>
// //                             {order.status}
// //                           </Badge>
// //                         </div>
// //                         <div className="mt-1 flex justify-between">
// //                           <h3 className="font-medium">Order #{order.id}</h3>
// //                           <span className="text-primary font-medium">{formatPrice(order.total)}</span>
// //                         </div>
// //                       </div>
                      
// //                       <div className="p-4">
// //                         <div className="space-y-2">
// //                           {order.items.slice(0, 3).map((item: any, index: number) => (
// //                             <div key={index} className="flex justify-between items-center">
// //                               <div className="flex items-center">
// //                                 <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-2">
// //                                   {item.quantity}
// //                                 </span>
// //                                 <span className="text-gray-800">{item.name}</span>
// //                               </div>
// //                               <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
// //                             </div>
// //                           ))}
// //                           {order.items.length > 3 && (
// //                             <p className="text-sm text-muted-foreground text-center mt-2">
// //                               +{order.items.length - 3} more items
// //                             </p>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
                  
// //                   {orders.length > 3 && (
// //                     <p className="text-sm text-center text-muted-foreground">
// //                       Showing 3 of {orders.length} orders
// //                     </p>
// //                   )}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { useAuth } from "@/components/auth-provider"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { formatDate, formatPrice } from "@/lib/utils"
// import {
//   ArrowLeft,
//   Heart,
//   ShoppingBag,
//   Star,
//   Calendar,
//   Mail,
//   UserPlus,
//   UserCheck,
//   Users,
//   Clock,
//   MapPin,
//   Share2,
// } from "lucide-react"
// import toast from "react-hot-toast"
// import { format } from "date-fns"

// interface UserProfile {
//   uid: string
//   displayName: string
//   email: string
//   photoURL: string
//   createdAt: any
//   followers?: string[]
//   following?: string[]
//   likedItems?: string[]
//   phone?: string
//   address?: string
//   birthday?: string
//   anniversary?: string
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

// export default function UserProfilePage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const { user } = useAuth()
//   const [profile, setProfile] = useState<UserProfile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [likedItems, setLikedItems] = useState<MenuItem[]>([])
//   const [orders, setOrders] = useState<any[]>([])
//   const [isFollowing, setIsFollowing] = useState(false)
//   const [followerCount, setFollowerCount] = useState(0)
//   const [followingCount, setFollowingCount] = useState(0)
//   const [followers, setFollowers] = useState<UserProfile[]>([])
//   const [following, setFollowing] = useState<UserProfile[]>([])
//   const [isLoadingFollow, setIsLoadingFollow] = useState(false)
//   const [activeTab, setActiveTab] = useState("favorites")

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userDoc = await getDoc(doc(db, "users", id as string))

//         if (userDoc.exists()) {
//           const userData = userDoc.data() as UserProfile
//           setProfile(userData)

//           // Check if current user is following this profile
//           if (user && userData.followers) {
//             setIsFollowing(userData.followers.includes(user.uid))
//             setFollowerCount(userData.followers.length || 0)
//           }

//           if (userData.following) {
//             setFollowingCount(userData.following.length || 0)
//           }

//           // Fetch liked items if any
//           if (userData.likedItems && userData.likedItems.length > 0) {
//             const likedItemsData = await Promise.all(
//               userData.likedItems.map(async (itemId) => {
//                 const itemDoc = await getDoc(doc(db, "menuItems", itemId))
//                 if (itemDoc.exists()) {
//                   return { id: itemDoc.id, ...itemDoc.data() }
//                 }
//                 return null
//               }),
//             )

//             setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
//           }

//           // Fetch orders if any
//           if (userData.orders) {
//             setOrders(userData.orders)
//           }

//           // Fetch followers
//           if (userData.followers && userData.followers.length > 0) {
//             const followersData = await Promise.all(
//               userData.followers.map(async (followerId) => {
//                 const followerDoc = await getDoc(doc(db, "users", followerId))
//                 if (followerDoc.exists()) {
//                   return { uid: followerDoc.id, ...followerDoc.data() }
//                 }
//                 return null
//               }),
//             )

//             setFollowers(followersData.filter(Boolean) as UserProfile[])
//           }

//           // Fetch following
//           if (userData.following && userData.following.length > 0) {
//             const followingData = await Promise.all(
//               userData.following.map(async (followingId) => {
//                 const followingDoc = await getDoc(doc(db, "users", followingId))
//                 if (followingDoc.exists()) {
//                   return { uid: followingDoc.id, ...followingDoc.data() }
//                 }
//                 return null
//               }),
//             )

//             setFollowing(followingData.filter(Boolean) as UserProfile[])
//           }
//         } else {
//           setError("User not found")
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error)
//         setError("Failed to load user profile")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserProfile()
//   }, [id, user])

//   const handleFollowToggle = async () => {
//     if (!user) {
//       toast.error("Please sign in to follow users")
//       return
//     }

//     if (user.uid === id) {
//       toast.error("You cannot follow yourself")
//       return
//     }

//     setIsLoadingFollow(true)
//     try {
//       const userRef = doc(db, "users", id as string)
//       const currentUserRef = doc(db, "users", user.uid)

//       if (isFollowing) {
//         // Unfollow
//         await updateDoc(userRef, {
//           followers: arrayRemove(user.uid),
//         })

//         await updateDoc(currentUserRef, {
//           following: arrayRemove(id),
//         })

//         setIsFollowing(false)
//         setFollowerCount((prev) => Math.max(0, prev - 1))

//         // Update followers list
//         setFollowers((prev) => prev.filter((f) => f.uid !== user.uid))

//         toast.success(`Unfollowed ${profile?.displayName}`)
//       } else {
//         // Follow
//         await updateDoc(userRef, {
//           followers: arrayUnion(user.uid),
//         })

//         await updateDoc(currentUserRef, {
//           following: arrayUnion(id),
//         })

//         setIsFollowing(true)
//         setFollowerCount((prev) => prev + 1)

//         // Update followers list
//         const currentUserDoc = await getDoc(currentUserRef)
//         if (currentUserDoc.exists()) {
//           setFollowers((prev) => [...prev, { uid: user.uid, ...currentUserDoc.data() } as UserProfile])
//         }

//         toast.success(`Following ${profile?.displayName}`)
//       }
//     } catch (error) {
//       console.error("Error updating follow status:", error)
//       toast.error("Failed to update follow status")
//     } finally {
//       setIsLoadingFollow(false)
//     }
//   }

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: `${profile?.displayName}'s Profile`,
//           text: `Check out ${profile?.displayName}'s profile on Rajwen Restaurant!`,
//           url: window.location.href,
//         })
//         .catch((error) => console.log("Error sharing", error))
//     } else {
//       // Fallback for browsers that don't support the Web Share API
//       navigator.clipboard.writeText(window.location.href)
//       toast.success("Profile link copied to clipboard!")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   if (error || !profile) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Error</CardTitle>
//             <CardDescription>{error || "User not found"}</CardDescription>
//           </CardHeader>
//           <CardFooter>
//             <Button asChild className="w-full">
//               <Link href="/menu">Back to Menu</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-10 px-4 max-w-4xl">
//       <Button asChild variant="ghost" className="mb-6">
//         <Link href="/search">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Search
//         </Link>
//       </Button>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//         <div className="relative h-40 bg-gradient-to-r from-primary/80 to-primary">
//           <div className="absolute -bottom-16 left-6">
//             <Avatar className="h-32 w-32 border-4 border-white">
//               <AvatarImage
//                 src={profile.photoURL || "/placeholder.svg?height=128&width=128"}
//                 alt={profile.displayName || "User"}
//               />
//               <AvatarFallback className="bg-primary/10 text-primary text-4xl">
//                 {profile.displayName?.charAt(0) || "U"}
//               </AvatarFallback>
//             </Avatar>
//           </div>

//           <div className="absolute top-4 right-4 flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="bg-white/80 backdrop-blur-sm hover:bg-white"
//               onClick={handleShare}
//             >
//               <Share2 className="h-4 w-4 mr-1" />
//               Share
//             </Button>

//             {user && user.uid !== id && (
//               <Button
//                 variant={isFollowing ? "outline" : "default"}
//                 size="sm"
//                 onClick={handleFollowToggle}
//                 disabled={isLoadingFollow}
//                 className={
//                   isFollowing
//                     ? "border-white text-white hover:bg-white/20 bg-transparent"
//                     : "bg-white text-primary hover:bg-white/90"
//                 }
//               >
//                 {isLoadingFollow ? (
//                   <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                 ) : isFollowing ? (
//                   <>
//                     <UserCheck className="mr-1 h-4 w-4" />
//                     Following
//                   </>
//                 ) : (
//                   <>
//                     <UserPlus className="mr-1 h-4 w-4" />
//                     Follow
//                   </>
//                 )}
//               </Button>
//             )}
//           </div>
//         </div>

//         <div className="pt-20 pb-6 px-6">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold">{profile.displayName}</h1>
//               <div className="flex items-center text-muted-foreground text-sm gap-2 mt-1">
//                 <Mail className="h-3.5 w-3.5" />
//                 <span>{profile.email}</span>
//               </div>

//               <div className="flex flex-wrap gap-2 mt-3">
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Clock className="h-3.5 w-3.5 mr-1" />
//                   Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
//                 </div>

//                 {profile.address && (
//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <MapPin className="h-3.5 w-3.5 mr-1" />
//                     {profile.address}
//                   </div>
//                 )}

//                 {profile.birthday && (
//                   <Badge variant="outline" className="flex items-center gap-1 py-1 bg-primary/5">
//                     <Calendar className="h-3 w-3 text-primary" />
//                     <span>Birthday: {format(new Date(profile.birthday), "MMM d")}</span>
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <div className="mt-4 md:mt-0 flex flex-wrap gap-6">
//               <div className="flex flex-col items-center">
//                 <span className="text-2xl font-bold">{followerCount}</span>
//                 <span className="text-sm text-muted-foreground">Followers</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-2xl font-bold">{followingCount}</span>
//                 <span className="text-sm text-muted-foreground">Following</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <span className="text-2xl font-bold">{likedItems.length}</span>
//                 <span className="text-sm text-muted-foreground">Favorites</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
//         <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg shadow-none border-none p-1 mb-4 border">
//           <TabsTrigger
//             value="favorites"
//             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
//           >
//             <Heart className="h-4 w-4 mr-2" />
//             Favorites
//           </TabsTrigger>
//           <TabsTrigger
//             value="orders"
//             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
//           >
//             <ShoppingBag className="h-4 w-4 mr-2" />
//             Recent Orders
//           </TabsTrigger>
//           <TabsTrigger
//             value="connections"
//             className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md"
//           >
//             <Users className="h-4 w-4 mr-2" />
//             Connections
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="favorites">
//           <Card className="border-none shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-medium flex items-center">
//                 <Heart className="h-5 w-5 mr-2 text-red-500" />
//                 {profile.displayName}'s Favorite Items
//               </CardTitle>
//               <CardDescription>Dishes that {profile.displayName} loves</CardDescription>
//             </CardHeader>

//             <CardContent>
//               {likedItems.length === 0 ? (
//                 <div className="text-center py-12 px-4">
//                   <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Heart className="h-8 w-8 text-red-400" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
//                   <p className="text-muted-foreground mb-4">{profile.displayName} hasn't liked any items yet</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//                   {likedItems.map((item) => (
//                     <Link href={`/menu/item/${item.id}`} key={item.id}>
//                       <div className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
//                         <div className="relative h-24 w-24 bg-gray-100">
//                           <Image
//                             src={item.imageUrl || "/placeholder.svg?height=96&width=96"}
//                             alt={item.name}
//                             fill
//                             className="object-cover group-hover:scale-105 transition-transform"
//                           />
//                         </div>
//                         <div className="flex-1 p-3">
//                           <div className="flex items-start justify-between">
//                             <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
//                             <Badge className="bg-primary hover:bg-primary text-white">{formatPrice(item.price)}</Badge>
//                           </div>
//                           <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{item.description}</p>
//                           <div className="flex items-center mt-2">
//                             <div className="flex items-center text-yellow-500 text-sm">
//                               <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
//                               <span className="ml-1 text-gray-700">{item.rating.toFixed(1)}</span>
//                             </div>
//                             <span className="mx-2 text-gray-300">•</span>
//                             <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="orders">
//           <Card className="border-none shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-medium flex items-center">
//                 <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
//                 Recent Orders
//               </CardTitle>
//               <CardDescription>{profile.displayName}'s recent orders</CardDescription>
//             </CardHeader>

//             <CardContent>
//               {orders.length === 0 ? (
//                 <div className="text-center py-12 px-4">
//                   <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <ShoppingBag className="h-8 w-8 text-primary" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-2">No orders yet</h3>
//                   <p className="text-muted-foreground mb-4">{profile.displayName} hasn't placed any orders yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4 mt-4">
//                   {orders.slice(0, 3).map((order) => (
//                     <div
//                       key={order.id}
//                       className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm"
//                     >
//                       <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
//                         <div className="flex justify-between items-center">
//                           <div className="flex items-center">
//                             <Calendar className="h-4 w-4 text-primary mr-2" />
//                             <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
//                           </div>
//                           <Badge
//                             className={
//                               order.status === "Delivered"
//                                 ? "bg-green-500"
//                                 : order.status === "Processing"
//                                   ? "bg-orange-500"
//                                   : "bg-blue-500"
//                             }
//                           >
//                             {order.status}
//                           </Badge>
//                         </div>
//                         <div className="mt-1 flex justify-between">
//                           <h3 className="font-medium">Order #{order.id}</h3>
//                           <span className="text-primary font-medium">{formatPrice(order.total)}</span>
//                         </div>
//                       </div>

//                       <div className="p-4">
//                         <div className="space-y-2">
//                           {order.items.slice(0, 3).map((item: any, index: number) => (
//                             <div key={index} className="flex justify-between items-center">
//                               <div className="flex items-center">
//                                 <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-2">
//                                   {item.quantity}
//                                 </span>
//                                 <span className="text-gray-800">{item.name}</span>
//                               </div>
//                               <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
//                             </div>
//                           ))}
//                           {order.items.length > 3 && (
//                             <p className="text-sm text-muted-foreground text-center mt-2">
//                               +{order.items.length - 3} more items
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {orders.length > 3 && (
//                     <p className="text-sm text-center text-muted-foreground">Showing 3 of {orders.length} orders</p>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="connections">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-none shadow-sm">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg font-medium flex items-center">
//                   <Users className="h-5 w-5 mr-2 text-primary" />
//                   Followers
//                 </CardTitle>
//                 <CardDescription>People who follow {profile.displayName}</CardDescription>
//               </CardHeader>

//               <CardContent>
//                 {followers.length === 0 ? (
//                   <div className="text-center py-8 px-4">
//                     <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <Users className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="text-base font-medium mb-1">No followers yet</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {profile.displayName} doesn't have any followers yet
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3 mt-2">
//                     {followers.map((follower) => (
//                       <Link href={`/profile/${follower.uid}`} key={follower.uid}>
//                         <div className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors">
//                           <Avatar className="h-10 w-10 mr-3">
//                             <AvatarImage
//                               src={follower.photoURL || "/placeholder.svg?height=40&width=40"}
//                               alt={follower.displayName || "User"}
//                             />
//                             <AvatarFallback className="bg-primary/10 text-primary">
//                               {follower.displayName?.charAt(0) || "U"}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <p className="font-medium">{follower.displayName}</p>
//                             <p className="text-xs text-muted-foreground">{follower.email}</p>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card className="border-none shadow-sm">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg font-medium flex items-center">
//                   <Users className="h-5 w-5 mr-2 text-primary" />
//                   Following
//                 </CardTitle>
//                 <CardDescription>People {profile.displayName} follows</CardDescription>
//               </CardHeader>

//               <CardContent>
//                 {following.length === 0 ? (
//                   <div className="text-center py-8 px-4">
//                     <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <Users className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="text-base font-medium mb-1">Not following anyone</h3>
//                     <p className="text-sm text-muted-foreground">{profile.displayName} isn't following anyone yet</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3 mt-2">
//                     {following.map((followedUser) => (
//                       <Link href={`/profile/${followedUser.uid}`} key={followedUser.uid}>
//                         <div className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors">
//                           <Avatar className="h-10 w-10 mr-3">
//                             <AvatarImage
//                               src={followedUser.photoURL || "/placeholder.svg?height=40&width=40"}
//                               alt={followedUser.displayName || "User"}
//                             />
//                             <AvatarFallback className="bg-primary/10 text-primary">
//                               {followedUser.displayName?.charAt(0) || "U"}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <p className="font-medium">{followedUser.displayName}</p>
//                             <p className="text-xs text-muted-foreground">{followedUser.email}</p>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate, formatPrice } from "@/lib/utils"
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Calendar,
  Mail,
  UserPlus,
  UserCheck,
  Users,
  Clock,
  MapPin,
  Share2,
  MessageCircle,
  Info,
  ExternalLink,
  ChevronRight,
} from "lucide-react"
import toast from "react-hot-toast"
import { format } from "date-fns"

interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string
  createdAt: any
  followers?: string[]
  following?: string[]
  likedItems?: string[]
  phone?: string
  address?: string
  birthday?: string
  anniversary?: string
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

export default function UserProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [likedItems, setLikedItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [followers, setFollowers] = useState<UserProfile[]>([])
  const [following, setFollowing] = useState<UserProfile[]>([])
  const [isLoadingFollow, setIsLoadingFollow] = useState(false)
  const [activeTab, setActiveTab] = useState("favorites")
  const [showAllOrders, setShowAllOrders] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id as string))

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile
          setProfile(userData)

          // Check if current user is following this profile
          if (user && userData.followers) {
            setIsFollowing(userData.followers.includes(user.uid))
            setFollowerCount(userData.followers.length || 0)
          }

          if (userData.following) {
            setFollowingCount(userData.following.length || 0)
          }

          // Fetch liked items if any
          if (userData.likedItems && userData.likedItems.length > 0) {
            const likedItemsData = await Promise.all(
              userData.likedItems.map(async (itemId) => {
                const itemDoc = await getDoc(doc(db, "menuItems", itemId))
                if (itemDoc.exists()) {
                  return { id: itemDoc.id, ...itemDoc.data() }
                }
                return null
              }),
            )

            setLikedItems(likedItemsData.filter(Boolean) as MenuItem[])
          }

          // Fetch orders if any
          if (userData.orders) {
            setOrders(userData.orders)
          }

          // Fetch followers
          if (userData.followers && userData.followers.length > 0) {
            const followersData = await Promise.all(
              userData.followers.map(async (followerId) => {
                const followerDoc = await getDoc(doc(db, "users", followerId))
                if (followerDoc.exists()) {
                  return { uid: followerDoc.id, ...followerDoc.data() }
                }
                return null
              }),
            )

            setFollowers(followersData.filter(Boolean) as UserProfile[])
          }

          // Fetch following
          if (userData.following && userData.following.length > 0) {
            const followingData = await Promise.all(
              userData.following.map(async (followingId) => {
                const followingDoc = await getDoc(doc(db, "users", followingId))
                if (followingDoc.exists()) {
                  return { uid: followingDoc.id, ...followingDoc.data() }
                }
                return null
              }),
            )

            setFollowing(followingData.filter(Boolean) as UserProfile[])
          }
        } else {
          setError("User not found")
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [id, user])

  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("Please sign in to follow users")
      return
    }

    if (user.uid === id) {
      toast.error("You cannot follow yourself")
      return
    }

    setIsLoadingFollow(true)
    try {
      const userRef = doc(db, "users", id as string)
      const currentUserRef = doc(db, "users", user.uid)

      if (isFollowing) {
        // Unfollow
        await updateDoc(userRef, {
          followers: arrayRemove(user.uid),
        })

        await updateDoc(currentUserRef, {
          following: arrayRemove(id),
        })

        setIsFollowing(false)
        setFollowerCount((prev) => Math.max(0, prev - 1))

        // Update followers list
        setFollowers((prev) => prev.filter((f) => f.uid !== user.uid))

        toast.success(`Unfollowed ${profile?.displayName}`)
      } else {
        // Follow
        await updateDoc(userRef, {
          followers: arrayUnion(user.uid),
        })

        await updateDoc(currentUserRef, {
          following: arrayUnion(id),
        })

        setIsFollowing(true)
        setFollowerCount((prev) => prev + 1)

        // Update followers list
        const currentUserDoc = await getDoc(currentUserRef)
        if (currentUserDoc.exists()) {
          setFollowers((prev) => [...prev, { uid: user.uid, ...currentUserDoc.data() } as UserProfile])
        }

        toast.success(`Following ${profile?.displayName}`)
      }
    } catch (error) {
      console.error("Error updating follow status:", error)
      toast.error("Failed to update follow status")
    } finally {
      setIsLoadingFollow(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${profile?.displayName}'s Profile`,
          text: `Check out ${profile?.displayName}'s profile on Rajwen Restaurant!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast.success("Profile link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <Skeleton className="h-48 w-full" />
          <div className="pt-20 pb-6 px-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-16 w-16" />
              <Skeleton className="h-16 w-16" />
              <Skeleton className="h-16 w-16" />
            </div>
          </div>
        </div>
        
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-red-500" />
              Error
            </CardTitle>
            <CardDescription>{error || "User not found"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/menu">Back to Menu</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header for mobile */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="p-0">
          <Link href="/search">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="font-medium text-base">{profile.displayName}</h1>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          {user && user.uid !== id && (
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowToggle}
              disabled={isLoadingFollow}
              className={isFollowing ? "border-primary text-primary" : ""}
            >
              {isLoadingFollow ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isFollowing ? (
                <UserCheck className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="container mx-auto py-6 px-4 max-w-5xl">
        {/* Desktop back button */}
        <div className="hidden lg:block mb-6">
          <Button asChild variant="ghost" className="group">
            <Link href="/search">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Search
            </Link>
          </Button>
        </div>

        {/* Profile header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="relative h-48 lg:h-56 bg-gradient-to-r from-primary via-primary/90 to-primary/80">
            {/* Large avatar - positioned differently on mobile vs desktop */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 lg:-bottom-20 lg:left-8 lg:transform-none flex flex-col items-center lg:items-start">
              <Avatar className="h-32 w-32 lg:h-40 lg:w-40 border-4 border-white shadow-md">
                <AvatarImage
                  src={profile.photoURL || "/placeholder.svg?height=160&width=160"}
                  alt={profile.displayName || "User"}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl lg:text-5xl">
                  {profile.displayName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Desktop action buttons */}
            <div className="hidden lg:flex absolute top-6 right-6 gap-3">
              {user && user.uid === id ? (
                <Button
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
              
              <Button
                variant="outline"
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-transparent"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>

              {user && user.uid !== id && (
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollowToggle}
                  disabled={isLoadingFollow}
                  className={
                    isFollowing
                      ? "border-white text-white hover:bg-white/20 bg-transparent"
                      : "bg-white text-primary hover:bg-white/90"
                  }
                >
                  {isLoadingFollow ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isFollowing ? (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Profile info container */}
          <div className="pt-20 pb-6 px-4 lg:pt-6 lg:pl-52 lg:pr-6">
            {/* Mobile-centered / Desktop-left aligned profile info */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                <div className="flex items-center justify-center lg:justify-start text-muted-foreground text-sm gap-2 mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{profile.email}</span>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                  <div className="flex items-center text-sm text-muted-foreground rounded-full bg-gray-100 px-3 py-1">
                    <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                    Member since {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
                  </div>

                  {profile.address && (
                    <div className="flex items-center text-sm text-muted-foreground rounded-full bg-gray-100 px-3 py-1">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                      {profile.address}
                    </div>
                  )}

                  {profile.birthday && (
                    <Badge variant="outline" className="flex items-center gap-1 py-1.5 bg-primary/5 rounded-full">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span>Birthday: {format(new Date(profile.birthday), "MMM d")}</span>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats cards */}
              <div className="flex justify-center lg:justify-end gap-4 lg:gap-6">
                <Link href="#followers" onClick={() => setActiveTab("connections")}>
                  <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-2xl font-bold text-primary">{followerCount}</span>
                    <span className="text-sm text-muted-foreground">Followers</span>
                  </div>
                </Link>
                <Link href="#following" onClick={() => setActiveTab("connections")}>
                  <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-2xl font-bold text-primary">{followingCount}</span>
                    <span className="text-sm text-muted-foreground">Following</span>
                  </div>
                </Link>
                <Link href="#favorites" onClick={() => setActiveTab("favorites")}>
                  <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-2xl font-bold text-primary">{likedItems.length}</span>
                    <span className="text-sm text-muted-foreground">Favorites</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-white-100 rounded-lg shadow-none border-none p-1 mb-6 border">
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2.5"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2.5"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="connections"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2.5"
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Connections</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" id="favorites">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 lg:pb-4">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  {profile.displayName}'s Favorite Items
                </CardTitle>
                <CardDescription>Dishes that {profile.displayName} loves</CardDescription>
              </CardHeader>

              <CardContent>
                {likedItems.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-4">{profile.displayName} hasn't liked any items yet</p>
                    <Button asChild variant="outline">
                      <Link href="/menu">
                        Browse Menu
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {likedItems.map((item) => (
                      <Link href={`/menu/item/${item.id}`} key={item.id}>
                        <div className="group flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                          <div className="relative h-40 w-full bg-gray-100">
                            <Image
                              src={item.imageUrl || "/placeholder.svg?height=160&width=160"}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary/90 hover:bg-primary text-white font-medium">
                                {formatPrice(item.price)}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 h-10">{item.description}</p>
                            <div className="flex items-center mt-3">
                              <div className="flex items-center text-yellow-500 text-sm bg-yellow-50 px-2 py-1 rounded-full">
                                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                <span className="ml-1 text-gray-700 font-medium">{item.rating.toFixed(1)}</span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
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

          <TabsContent value="orders">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 lg:pb-4">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                  Recent Orders
                </CardTitle>
                <CardDescription>{profile.displayName}'s recent orders</CardDescription>
              </CardHeader>

              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">{profile.displayName} hasn't placed any orders yet</p>
                    <Button asChild>
                      <Link href="/menu">
                        Order Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 mt-4">
                    {orders.slice(0, showAllOrders ? orders.length : 3).map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm text-gray-700">{formatDate(order.date.toDate())}</span>
                            </div>
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : order.status === "Processing"
                                    ? "bg-amber-500 hover:bg-amber-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <span className="text-primary font-medium">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="space-y-2">
                            {order.items.slice(0, 3).map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-2">
                                    {item.quantity}
                                  </span>
                                  <span className="text-gray-800">{item.name}</span>
                                </div>
                                <span className="text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <p className="text-sm text-muted-foreground text-center mt-2 py-1 bg-gray-50 rounded-md">
                                +{order.items.length - 3} more items
                              </p>
                            )}
                          </div>
                          
                          <Button variant="ghost" className="w-full mt-3 text-sm font-normal">
                            <ExternalLink className="h-3.5 w-3.5 mr-2" />
                            View Full Order
                          </Button>
                        </div>
                      </div>
                    ))}

                    {orders.length > 3 && !showAllOrders && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={() => setShowAllOrders(true)}
                      >
                        Show All {orders.length} Orders
                      </Button>
                    )}
                    
                    {showAllOrders && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={() => setShowAllOrders(false)}
                      >
                        Show Less
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections" id="connections">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm" id="followers">
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Followers
                  </CardTitle>
                  <CardDescription>People who follow {profile.displayName}</CardDescription>
                </CardHeader>

                <CardContent>
                  {followers.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-medium mb-1">No followers yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {profile.displayName} doesn't have any followers yet
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/search">
                          Find Friends
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[320px] pr-4">
                      <div className="space-y-3 mt-2">
                        {followers.map((follower) => (
                          <Link href={`/profile/${follower.uid}`} key={follower.uid}>
                            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                              <Avatar className="h-12 w-12 mr-3">
                              <AvatarImage
                                  src={follower.photoURL || "/placeholder.svg?height=48&width=48"}
                                  alt={follower.displayName || "User"}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {follower.displayName?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{follower.displayName}</h4>
                                <p className="text-sm text-muted-foreground truncate">{follower.email}</p>
                              </div>
                              {user && user.uid !== follower.uid && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-2"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    // Handle follow/unfollow for this follower
                                  }}
                                >
                                  Follow
                                </Button>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm" id="following">
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Following
                  </CardTitle>
                  <CardDescription>People {profile.displayName} follows</CardDescription>
                </CardHeader>

                <CardContent>
                  {following.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-medium mb-1">Not following anyone</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {profile.displayName} isn't following anyone yet
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/search">
                          Find Friends
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[320px] pr-4">
                      <div className="space-y-3 mt-2">
                        {following.map((followedUser) => (
                          <Link href={`/profile/${followedUser.uid}`} key={followedUser.uid}>
                            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                              <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage
                                  src={followedUser.photoURL || "/placeholder.svg?height=48&width=48"}
                                  alt={followedUser.displayName || "User"}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {followedUser.displayName?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{followedUser.displayName}</h4>
                                <p className="text-sm text-muted-foreground truncate">{followedUser.email}</p>
                              </div>
                              {user && user.uid !== followedUser.uid && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-2"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    // Handle follow/unfollow for this followed user
                                  }}
                                >
                                  Following
                                </Button>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}