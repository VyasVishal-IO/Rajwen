"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UtensilsCrossed, ShoppingBag, BarChart3, PlusCircle, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isLoading, isAdmin } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isLoading, isAdmin, router])

  if (isLoading) {
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

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your restaurant operations</p>
        </div>
        <Button asChild>
          <Link href="/admin/addFoodItem">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Food Item
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+120</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+2 new items this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 since last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24,500</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your restaurant operations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/admin/all-users" className="flex flex-col items-start">
                <span className="flex items-center mb-1">
                  <Users className="mr-2 h-5 w-5" />
                  Manage Users
                </span>
                <span className="text-xs text-muted-foreground">View and manage user accounts</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/admin/allFoodItems" className="flex flex-col items-start">
                <span className="flex items-center mb-1">
                  <UtensilsCrossed className="mr-2 h-5 w-5" />
                  Manage Menu
                </span>
                <span className="text-xs text-muted-foreground">Edit or remove menu items</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              <Link href="/admin/order" className="flex flex-col items-start">
                <span className="flex items-center mb-1">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Manage Orders
                </span>
                <span className="text-xs text-muted-foreground">View and update order status</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto py-4 justify-start">
              {/* <Link href="/admin/notifications" className="flex flex-col items-start">
                <span className="flex items-center mb-1">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Send Notifications
                </span>
                <span className="text-xs text-muted-foreground">Send messages to users</span>
              </Link> */}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Order #{order * 1000 + Math.floor(Math.random() * 1000)}</p>
                    <p className="text-sm text-muted-foreground">
                      3 items • ₹{(Math.random() * 1000 + 500).toFixed(2)}
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/order/${order}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/order">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

