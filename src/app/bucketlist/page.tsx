"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc, arrayRemove, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart, Download } from "lucide-react"
import { formatPrice, generateOrderId } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

export default function BucketListPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [cartItems, setCartItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [showQrDialog, setShowQrDialog] = useState(false)
  const billRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const cartItemIds = userData.cartItems || []

          if (cartItemIds.length > 0) {
            const cartItemsData = await Promise.all(
              cartItemIds.map(async (id: string) => {
                const itemDoc = await getDoc(doc(db, "menuItems", id))
                if (itemDoc.exists()) {
                  return { id: itemDoc.id, ...itemDoc.data() }
                }
                return null
              }),
            )

            const validCartItems = cartItemsData.filter(Boolean) as MenuItem[]
            setCartItems(validCartItems)

            // Initialize quantities
            const initialQuantities: { [key: string]: number } = {}
            validCartItems.forEach((item) => {
              initialQuantities[item.id] = 1
            })
            setQuantities(initialQuantities)
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error)
        toast.error("Failed to load cart items")
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [user])

  const handleRemoveFromCart = async (itemId: string) => {
    if (!user) return

    try {
      const userRef = doc(db, "users", user.uid)

      await updateDoc(userRef, {
        cartItems: arrayRemove(itemId),
      })

      setCartItems((prev) => prev.filter((item) => item.id !== itemId))
      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Error removing item from cart:", error)
      toast.error("Failed to remove item")
    }
  }

  const handleQuantityChange = (itemId: string, value: number) => {
    if (value < 1) value = 1
    if (value > 10) value = 10

    setQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 1)
    }, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.05 // 5% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return

    try {
      const orderId = generateOrderId()
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantities[item.id] || 1,
      }))

      const orderData = {
        id: orderId,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        items: orderItems,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: "Pending",
        date: new Date(),
        paymentStatus: "Pending",
      }

      // Add order to orders collection
      await setDoc(doc(db, "orders", orderId), orderData)

      // Add order to user's orders array
      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userOrders = userData.orders || []

        await updateDoc(userRef, {
          orders: [...userOrders, orderData],
          cartItems: [], // Clear cart
        })
      }

      setCartItems([])
      toast.success("Order placed successfully!")

      // Generate and download bill
      generateBill()

      // Show QR code dialog
      setShowQrDialog(true)
    } catch (error) {
      console.error("Error placing order:", error)
      toast.error("Failed to place order")
    }
  }

  const generateBill = () => {
    if (!billRef.current) return

    const billContent = billRef.current.innerHTML
    const blob = new Blob(
      [
        `
      <html>
        <head>
          <title>Order Bill - Rajwen Restaurant</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .divider { border-top: 1px solid #ccc; margin: 10px 0; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          ${billContent}
        </body>
      </html>
    `,
      ],
      { type: "text/html" },
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Order_Bill_${new Date().getTime()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your cart</CardDescription>
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
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Browse our menu to find delicious dishes.
          </p>
          <Button asChild size="lg">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                <CardDescription>Review and adjust your order before checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={quantities[item.id] || 1}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                              className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Hidden bill template for generating downloadable bill */}
      <div className="hidden">
        <div ref={billRef}>
          <div className="header">
            <h1>Rajwen Indian Veg Food Restaurant</h1>
            <p>Order Bill</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Order ID: {generateOrderId()}</p>
            <p>Customer: {user?.displayName}</p>
          </div>

          <div className="items">
            <h2>Order Items</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="item">
                <span>
                  {item.name} x{quantities[item.id] || 1}
                </span>
                <span>{formatPrice(item.price * (quantities[item.id] || 1))}</span>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="item">
            <span>Subtotal</span>
            <span>{formatPrice(calculateSubtotal())}</span>
          </div>

          <div className="item">
            <span>Tax (5%)</span>
            <span>{formatPrice(calculateTax())}</span>
          </div>

          <div className="divider"></div>

          <div className="item total">
            <span>Total</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>

          <div className="footer">
            <p>Thank you for dining with us!</p>
            <p>Rajwen Indian Veg Food Restaurant</p>
            <p>123 Restaurant Street, City, State 12345</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>Scan the QR code below to complete your payment</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="relative h-64 w-64">
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Payment QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Please scan this QR code with your payment app to complete the transaction
          </p>
          <DialogFooter>
            <Button onClick={() => setShowQrDialog(false)}>Close</Button>
            <Button variant="outline" onClick={generateBill} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

