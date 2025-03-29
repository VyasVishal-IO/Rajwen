"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  isVegan: boolean
  isSpicy: boolean
  ingredients: string[]
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  rating: number
  reviews: number
}

export default function MenuItemPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const itemDoc = await getDoc(doc(db, "menuItems", id as string))

        if (itemDoc.exists()) {
          setMenuItem({
            id: itemDoc.id,
            ...itemDoc.data(),
          } as MenuItem)
        } else {
          toast.error("Item not found")
        }
      } catch (error) {
        console.error("Error fetching menu item:", error)
        toast.error("Failed to load item details")
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
            setIsLiked((userData.likedItems || []).includes(id))
            setIsInCart((userData.cartItems || []).includes(id))

            // Check if user has rated this item
            const userRatings = userData.ratings || {}
            if (userRatings[id as string]) {
              setUserRating(userRatings[id as string])
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchMenuItem()
    fetchUserData()
  }, [id, user])

  const handleLikeItem = async () => {
    if (!user) {
      toast.error("Please sign in to like items")
      return
    }

    try {
      const userRef = doc(db, "users", user.uid)

      if (isLiked) {
        // Remove from liked items
        await updateDoc(userRef, {
          likedItems: arrayRemove(id),
        })
        setIsLiked(false)
        toast.success("Removed from liked items")
      } else {
        // Add to liked items
        await updateDoc(userRef, {
          likedItems: arrayUnion(id),
        })
        setIsLiked(true)
        toast.success("Added to liked items")
      }
    } catch (error) {
      console.error("Error updating liked items:", error)
      toast.error("Failed to update liked items")
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add items to cart")
      return
    }

    try {
      const userRef = doc(db, "users", user.uid)

      if (isInCart) {
        // Remove from cart
        await updateDoc(userRef, {
          cartItems: arrayRemove(id),
        })
        setIsInCart(false)
        toast.success("Removed from cart")
      } else {
        // Add to cart
        await updateDoc(userRef, {
          cartItems: arrayUnion(id),
        })
        setIsInCart(true)
        toast.success("Added to cart")
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      toast.error("Failed to update cart")
    }
  }

  const handleRateItem = async (rating: number) => {
    if (!user) {
      toast.error("Please sign in to rate items")
      return
    }

    try {
      const userRef = doc(db, "users", user.uid)
      const itemRef = doc(db, "menuItems", id as string)

      // Update user's rating for this item
      await updateDoc(userRef, {
        [`ratings.${id}`]: rating,
      })

      // Update item's average rating
      const itemDoc = await getDoc(itemRef)
      if (itemDoc.exists()) {
        const itemData = itemDoc.data()
        const currentRating = itemData.rating || 0
        const currentReviews = itemData.reviews || 0

        // If user already rated, adjust the calculation
        const newReviews = userRating > 0 ? currentReviews : currentReviews + 1
        const totalRatingPoints = currentRating * currentReviews - (userRating || 0) + rating
        const newRating = totalRatingPoints / newReviews

        await updateDoc(itemRef, {
          rating: newRating,
          reviews: newReviews,
        })

        setUserRating(rating)
        toast.success("Thank you for your rating!")
      }
    } catch (error) {
      console.error("Error rating item:", error)
      toast.error("Failed to submit rating")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!menuItem) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Item Not Found</CardTitle>
            <CardDescription>The menu item you're looking for doesn't exist</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/menu">Back to Menu</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={menuItem.imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={menuItem.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{menuItem.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" /> {menuItem.rating.toFixed(1)} ({menuItem.reviews} reviews)
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{menuItem.category}</span>
            {menuItem.isVegan && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Vegan</span>}
            {menuItem.isSpicy && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Spicy</span>}
          </div>

          <p className="text-muted-foreground mb-6">{menuItem.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-2">
              {menuItem.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Nutritional Information</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-bold">{menuItem.nutritionalInfo?.calories || 0}</p>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="font-bold">{menuItem.nutritionalInfo?.protein || 0}g</p>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="font-bold">{menuItem.nutritionalInfo?.carbs || 0}g</p>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="font-bold">{menuItem.nutritionalInfo?.fat || 0}g</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Rate this dish</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRateItem(star)}
                  className={star <= userRating ? "text-yellow-500" : ""}
                >
                  <Star className="h-6 w-6" fill={star <= userRating ? "currentColor" : "none"} />
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{formatPrice(menuItem.price)}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleLikeItem} className={isLiked ? "text-red-500" : ""}>
                <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
              </Button>
              <Button onClick={handleAddToCart} className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

