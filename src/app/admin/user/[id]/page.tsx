"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Mail, Phone, MapPin, Heart, ShoppingBag } from "lucide-react"
import { formatDate, formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"

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
  likedItems?: string[]
  orders?: any[]
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

export default function UserProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isLoading, isAdmin } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [likedItems, setLikedItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isLoading, isAdmin, router])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id as string))

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile
          setProfile(userData)

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
        } else {
          toast.error("User not found")
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        toast.error("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    if (user && isAdmin) {
      fetchUserProfile()
    }
  }, [id, user, isAdmin])

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>The user you're looking for doesn't exist</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/all-users">Back to Users</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin/all-users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">User Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>

              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              )}

              {profile.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.address}</span>
                </div>
              )}

              {profile.birthday && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Birthday: {formatDate(new Date(profile.birthday))}</span>
                </div>
              )}

              {profile.anniversary && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Anniversary: {formatDate(new Date(profile.anniversary))}</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-muted-foreground mb-1">Member Since</p>
                <p>{profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/admin/notifications?userId=${profile.uid}`}>Send Notification</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="preferences">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="liked">Liked Items</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Food Preferences</CardTitle>
                  <CardDescription>User's food preferences and dietary restrictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Food Preferences</h3>
                      <p className="text-muted-foreground">{profile.foodPreferences || "No preferences specified"}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Allergies</h3>
                      <p className="text-muted-foreground">{profile.allergies || "No allergies specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="liked">
              <Card>
                <CardHeader>
                  <CardTitle>Liked Items</CardTitle>
                  <CardDescription>Items this user has liked from the menu</CardDescription>
                </CardHeader>
                <CardContent>
                  {likedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No liked items</h3>
                      <p className="text-muted-foreground">This user hasn't liked any menu items yet</p>
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
                              <span className="font-medium">{formatPrice(item.price)}</span>
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
                  <CardDescription>User's past orders and their details</CardDescription>
                </CardHeader>
                <CardContent>
                  {!profile.orders || profile.orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground">This user hasn't placed any orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile.orders.map((order) => (
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
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/order/${order.id}`}>View Order Details</Link>
                            </Button>
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

