"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Heart, ShoppingBag } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"

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

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedItems, setLikedItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [birthday, setBirthday] = useState<Date | undefined>()
  const [anniversary, setAnniversary] = useState<Date | undefined>()

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
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
    fetchLikedItems()
    fetchOrders()
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
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your profile</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/auth">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image
                    src={profile.photoURL || "/placeholder.svg?height=96&width=96"}
                    alt={profile.displayName || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <CardTitle>{profile.displayName}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p>{profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}</p>
                </div>
                {profile.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{profile.phone}</p>
                  </div>
                )}
                {profile.address && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p>{profile.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/bucketlist">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="liked">Liked Items</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information to enhance your dining experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          defaultValue={profile.phone || ""}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          defaultValue={profile.address || ""}
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Birthday</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {birthday ? format(birthday, "PPP") : "Select your birthday"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={birthday} onSelect={setBirthday} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Anniversary</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {anniversary ? format(anniversary, "PPP") : "Select your anniversary"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={anniversary} onSelect={setAnniversary} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foodPreferences">Food Preferences</Label>
                      <Textarea
                        id="foodPreferences"
                        name="foodPreferences"
                        defaultValue={profile.foodPreferences || ""}
                        placeholder="Tell us about your food preferences (e.g., spice level, favorite dishes)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        defaultValue={profile.allergies || ""}
                        placeholder="List any food allergies or dietary restrictions"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" form="profile-form" className="ml-auto">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="liked">
              <Card>
                <CardHeader>
                  <CardTitle>Liked Items</CardTitle>
                  <CardDescription>Items you've liked from our menu</CardDescription>
                </CardHeader>
                <CardContent>
                  {likedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No liked items yet</h3>
                      <p className="text-muted-foreground mb-4">Browse our menu and like items to see them here</p>
                      <Button asChild>
                        <Link href="/menu">Browse Menu</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {likedItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.imageUrl || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center text-yellow-500 text-sm">
                                <Star className="h-4 w-4 fill-current mr-1" />
                                {item.rating.toFixed(1)}
                              </div>
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/menu/item/${item.id}`}>View</Link>
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

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their details</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Your order history will appear here once you place an order
                      </p>
                      <Button asChild>
                        <Link href="/menu">Browse Menu</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">{formatDate(order.date.toDate())}</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                              {order.status}
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                            <span>Total</span>
                            <span>{formatPrice(order.total)}</span>
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
    </div>
  )
}

