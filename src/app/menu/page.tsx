// "use client"

// import { useState, useEffect } from "react"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { useAuth } from "@/components/auth-provider"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Heart, ShoppingCart, Search } from "lucide-react"
// import { formatPrice } from "@/lib/utils"
// import toast from "react-hot-toast"
// import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"

// interface MenuItem {
//   id: string
//   name: string
//   description: string
//   price: number
//   category: string
//   imageUrl: string
//   isVegan: boolean
//   isSpicy: boolean
//   rating: number
// }

// export default function MenuPage() {
//   const { user } = useAuth()
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [likedItems, setLikedItems] = useState<string[]>([])
//   const [cartItems, setCartItems] = useState<string[]>([])

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const menuCollection = collection(db, "menuItems")
//         const menuSnapshot = await getDocs(menuCollection)
//         const menuList = menuSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as MenuItem[]

//         setMenuItems(menuList)
//       } catch (error) {
//         console.error("Error fetching menu items:", error)
//         toast.error("Failed to load menu items")
//       } finally {
//         setLoading(false)
//       }
//     }

//     const fetchUserData = async () => {
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(db, "users", user.uid))
//           if (userDoc.exists()) {
//             const userData = userDoc.data()
//             setLikedItems(userData.likedItems || [])
//             setCartItems(userData.cartItems || [])
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error)
//         }
//       }
//     }

//     fetchMenuItems()
//     fetchUserData()
//   }, [user])

//   const handleLikeItem = async (itemId: string) => {
//     if (!user) {
//       toast.error("Please sign in to like items")
//       return
//     }

//     try {
//       const userRef = doc(db, "users", user.uid)

//       if (likedItems.includes(itemId)) {
//         // Remove from liked items
//         await updateDoc(userRef, {
//           likedItems: arrayRemove(itemId),
//         })
//         setLikedItems((prev) => prev.filter((id) => id !== itemId))
//         toast.success("Removed from liked items")
//       } else {
//         // Add to liked items
//         await updateDoc(userRef, {
//           likedItems: arrayUnion(itemId),
//         })
//         setLikedItems((prev) => [...prev, itemId])
//         toast.success("Added to liked items")
//       }
//     } catch (error) {
//       console.error("Error updating liked items:", error)
//       toast.error("Failed to update liked items")
//     }
//   }

//   const handleAddToCart = async (itemId: string) => {
//     if (!user) {
//       toast.error("Please sign in to add items to cart")
//       return
//     }

//     try {
//       const userRef = doc(db, "users", user.uid)

//       if (cartItems.includes(itemId)) {
//         // Remove from cart
//         await updateDoc(userRef, {
//           cartItems: arrayRemove(itemId),
//         })
//         setCartItems((prev) => prev.filter((id) => id !== itemId))
//         toast.success("Removed from cart")
//       } else {
//         // Add to cart
//         await updateDoc(userRef, {
//           cartItems: arrayUnion(itemId),
//         })
//         setCartItems((prev) => [...prev, itemId])
//         toast.success("Added to cart")
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error)
//       toast.error("Failed to update cart")
//     }
//   }

//   const filteredMenuItems = menuItems.filter((item) => {
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

//     return matchesSearch && matchesCategory
//   })

//   const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

//   if (loading) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <div className="flex flex-col items-center mb-8">
//         <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
//         <p className="text-muted-foreground text-center max-w-2xl mb-6">
//           Explore our wide range of authentic Indian vegetarian dishes, prepared with fresh ingredients and traditional
//           spices
//         </p>

//         <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search dishes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-full md:w-[180px]">
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {filteredMenuItems.length === 0 ? (
//         <div className="text-center py-10">
//           <h2 className="text-xl font-semibold mb-2">No items found</h2>
//           <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMenuItems.map((item) => (
//             <Card key={item.id} className="overflow-hidden">
//               <div className="relative h-48 w-full">
//                 <Image
//                   src={item.imageUrl || "/placeholder.svg?height=192&width=384"}
//                   alt={item.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle>{item.name}</CardTitle>
//                     <CardDescription>{item.category}</CardDescription>
//                   </div>
//                   <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
//                     ★ {item.rating.toFixed(1)}
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
//                 <div className="flex gap-2 mb-4">
//                   {item.isVegan && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegan</span>}
//                   {item.isSpicy && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Spicy</span>}
//                 </div>
//                 <p className="font-bold text-lg">{formatPrice(item.price)}</p>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button asChild variant="outline">
//                   <Link href={`/menu/item/${item.id}`}>View Details</Link>
//                 </Button>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleLikeItem(item.id)}
//                     className={likedItems.includes(item.id) ? "text-red-500" : ""}
//                   >
//                     <Heart className="h-5 w-5" fill={likedItems.includes(item.id) ? "currentColor" : "none"} />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleAddToCart(item.id)}
//                     className={cartItems.includes(item.id) ? "text-primary" : ""}
//                   >
//                     <ShoppingCart className="h-5 w-5" fill={cartItems.includes(item.id) ? "currentColor" : "none"} />
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import toast from "react-hot-toast"

// Components
import MenuHeader from "@/components/menu/menu-header"
import MenuFilter from "@/components/menu/menu-filter"
import MenuItemCard from "@/components/menu/menu-item-card"
import MenuEmptyState from "@/components/menu/menu-empty-state"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  isVegan: boolean
  isSpicy: boolean
  rating: number
}

export default function MenuPage() {
  const { user } = useAuth()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [likedItems, setLikedItems] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<string[]>([])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuCollection = collection(db, "menuItems")
        const menuSnapshot = await getDocs(menuCollection)
        const menuList = menuSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MenuItem[]

        setMenuItems(menuList)
      } catch (error) {
        console.error("Error fetching menu items:", error)
        toast.error("Failed to load menu items")
      } finally {
        setLoading(false)
      }
    }

    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setLikedItems(userData.likedItems || [])
            setCartItems(userData.cartItems || [])
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchMenuItems()
    fetchUserData()
  }, [user])

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <MenuHeader />
      <MenuFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {filteredMenuItems.length === 0 ? (
        <MenuEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              isLiked={likedItems.includes(item.id)}
              isInCart={cartItems.includes(item.id)}
              userId={user?.uid || null}
            />
          ))}
        </div>
      )}
    </div>
  )
}

