"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"
import toast from "react-hot-toast"

interface MenuItemCardProps {
  item: {
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
  isLiked: boolean
  isInCart: boolean
  userId: string | null
}

export default function MenuItemCard({ item, isLiked, isInCart, userId }: MenuItemCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [inCart, setInCart] = useState(isInCart)

  const handleLikeItem = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      toast.error("Please sign in to like items")
      return
    }

    try {
      const userRef = doc(db, "users", userId)

      if (liked) {
        // Remove from liked items
        await updateDoc(userRef, {
          likedItems: arrayRemove(item.id),
        })
        setLiked(false)
        toast.success("Removed from favorites")
      } else {
        // Add to liked items
        await updateDoc(userRef, {
          likedItems: arrayUnion(item.id),
        })
        setLiked(true)
        toast.success("Added to favorites")
      }
    } catch (error) {
      console.error("Error updating liked items:", error)
      toast.error("Failed to update favorites")
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      toast.error("Please sign in to add items to cart")
      return
    }

    try {
      const userRef = doc(db, "users", userId)

      if (inCart) {
        // Remove from cart
        await updateDoc(userRef, {
          cartItems: arrayRemove(item.id),
        })
        setInCart(false)
        toast.success("Removed from cart")
      } else {
        // Add to cart
        await updateDoc(userRef, {
          cartItems: arrayUnion(item.id),
        })
        setInCart(true)
        toast.success("Added to cart")
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      toast.error("Failed to update cart")
    }
  }

  return (
    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
      <Link href={`/menu/item/${item.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={item.imageUrl || "/placeholder.svg?height=192&width=384"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {(item.isVegan || item.isSpicy) && (
            <div className="absolute top-2 left-2 flex gap-1">
              {item.isVegan && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Vegan</span>
              )}
              {item.isSpicy && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Spicy</span>
              )}
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg hover:text-primary transition-colors">
              <Link href={`/menu/item/${item.id}`}>{item.name}</Link>
            </CardTitle>
            <CardDescription className="capitalize">{item.category}</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{item.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 text-sm mb-3">{item.description}</p>
        <p className="font-bold text-lg">{formatPrice(item.price)}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button asChild variant="outline" size="sm">
          <Link href={`/menu/item/${item.id}`}>View Details</Link>
        </Button>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLikeItem}
            className={liked ? "text-red-500" : ""}
            title={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            className={inCart ? "text-primary" : ""}
            title={inCart ? "Remove from cart" : "Add to cart"}
          >
            <ShoppingCart className="h-5 w-5" fill={inCart ? "currentColor" : "none"} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

