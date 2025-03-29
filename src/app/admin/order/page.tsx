"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal, Search } from "lucide-react"
import { formatPrice, formatDate } from "@/lib/utils"
import toast from "react-hot-toast"

interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
  subtotal: number
  tax: number
  total: number
  status: string
  paymentStatus: string
  date: any
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isLoading, isAdmin } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isLoading, isAdmin, router])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders")
        const ordersQuery = query(ordersCollection, orderBy("date", "desc"))
        const ordersSnapshot = await getDocs(ordersQuery)
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[]

        setOrders(ordersList)
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    if (user && isAdmin) {
      fetchOrders()
    }
  }, [user, isAdmin])

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status,
      })

      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))

      toast.success(`Order status updated to ${status}`)
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status")
    }
  }

  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        paymentStatus,
      })

      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, paymentStatus } : order)))

      toast.success(`Payment status updated to ${paymentStatus}`)
    } catch (error) {
      console.error("Error updating payment status:", error)
      toast.error("Failed to update payment status")
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Orders Management</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by order ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{order.userName}</p>
                          <p className="text-xs text-muted-foreground">{order.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(order.date.toDate())}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell>
                        <div
                          className={`px-2 py-1 rounded-full text-xs inline-block
                          ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`px-2 py-1 rounded-full text-xs inline-block
                          ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800"
                              : order.paymentStatus === "Refunded"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/order/${order.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/user/${order.userId}`}>View Customer</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.status === "Pending"}
                              onClick={() => handleUpdateOrderStatus(order.id, "Pending")}
                            >
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.status === "Processing"}
                              onClick={() => handleUpdateOrderStatus(order.id, "Processing")}
                            >
                              Mark as Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.status === "Completed"}
                              onClick={() => handleUpdateOrderStatus(order.id, "Completed")}
                            >
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.status === "Cancelled"}
                              onClick={() => handleUpdateOrderStatus(order.id, "Cancelled")}
                            >
                              Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.paymentStatus === "Pending"}
                              onClick={() => handleUpdatePaymentStatus(order.id, "Pending")}
                            >
                              Payment: Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.paymentStatus === "Paid"}
                              onClick={() => handleUpdatePaymentStatus(order.id, "Paid")}
                            >
                              Payment: Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={order.paymentStatus === "Refunded"}
                              onClick={() => handleUpdatePaymentStatus(order.id, "Refunded")}
                            >
                              Payment: Refunded
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

