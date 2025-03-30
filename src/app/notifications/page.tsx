// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { 
//   collection, 
//   getDocs, 
//   query, 
//   where, 
//   orderBy, 
//   doc, 
//   getDoc,
//   or, 
//   documentId, 
//   updateDoc
// } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { useAuth } from "@/components/auth-provider"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Bell, BellOff, ArrowLeft } from "lucide-react"
// import toast from "react-hot-toast"
// import NotificationCard from "@/components/notifications/notification-card"

// interface Notification {
//   id: string
//   title: string
//   message: string
//   sentBy: string
//   sentById: string
//   createdAt: any
//   recipients: string
//   read?: boolean
// }

// export default function NotificationsPage() {
//   const router = useRouter()
//   const { user, isLoading } = useAuth()
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const [loading, setLoading] = useState(true)
//   const [readNotifications, setReadNotifications] = useState<string[]>([])

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/auth")
//     }
//   }, [user, isLoading, router])

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!user) return

//       try {
//         // Get user's read notifications
//         const userDoc = await getDoc(doc(db, "users", user.uid))
//         const userData = userDoc.exists() ? userDoc.data() : {}
//         const userReadNotifications = userData.readNotifications || []
//         setReadNotifications(userReadNotifications)

//         // Split the query into two parts to avoid the composite index error
//         // First get "all" notifications
//         const allNotificationsQuery = query(
//           collection(db, "notifications"),
//           where("recipients", "==", "all"),
//           orderBy("createdAt", "desc")
//         )

//         // Then get user-specific notifications
//         const userNotificationsQuery = query(
//           collection(db, "notifications"),
//           where("recipients", "==", user.uid),
//           orderBy("createdAt", "desc")
//         )

//         // Execute both queries
//         const [allNotificationsSnapshot, userNotificationsSnapshot] = await Promise.all([
//           getDocs(allNotificationsQuery),
//           getDocs(userNotificationsQuery)
//         ])

//         // Combine the results
//         // const allNotifications = allNotificationsSnapshot.docs.map(doc => ({
//         //   id: doc.id,
//         //   ...doc.data() as Notification,
//         //   read: userReadNotifications.includes(doc.id)
//         // }))

//         const allNotifications = allNotificationsSnapshot.docs.map(doc => {
//             const data = doc.data() as Notification; // Extract data first
//             return {
//               ...data, // Spread data first
//               id: doc.id, // Ensure the correct `id` is explicitly set after spreading
//               read: userReadNotifications.includes(doc.id) // Keep other properties
//             };
//           });
          

//         // const userNotifications = userNotificationsSnapshot.docs.map(doc => ({
//         //   id: doc.id,
//         //   ...doc.data() as Notification,
//         //   read: userReadNotifications.includes(doc.id)
//         // }))
//         const userNotifications = userNotificationsSnapshot.docs.map(doc => {
//             const data = doc.data() as Notification; // Extract data first
//             return {
//               ...data, // Spread data first
//               id: doc.id, // Ensure id is explicitly set after spreading
//               read: userReadNotifications.includes(doc.id) // Keep other properties
//             };
//           });
          
//         // Combine and sort by createdAt
//         const combinedNotifications = [...allNotifications, ...userNotifications]
//           .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())

//         setNotifications(combinedNotifications)
//       } catch (error) {
//         console.error("Error fetching notifications:", error)
//         toast.error("Failed to load notifications")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (user) {
//       fetchNotifications()
//     }
//   }, [user])

//   const handleMarkAsRead = async (notificationId: string) => {
//     if (!user) return
    
//     try {
//       // Update in local state
//       setNotifications((prev) =>
//         prev.map((notification) => 
//           notification.id === notificationId ? { ...notification, read: true } : notification
//         )
//       )
      
//       // Add to read notifications
//       if (!readNotifications.includes(notificationId)) {
//         const newReadNotifications = [...readNotifications, notificationId]
//         setReadNotifications(newReadNotifications)
        
//         // Update in Firestore
//         await updateDoc(doc(db, "users", user.uid), {
//           readNotifications: newReadNotifications
//         })
//       }
//     } catch (error) {
//       console.error("Error marking notification as read:", error)
//       toast.error("Failed to mark notification as read")
//     }
//   }

//   const unreadNotifications = notifications.filter((notification) => !notification.read)
//   const readNotificationsList = notifications.filter((notification) => notification.read)

//   if (isLoading || loading) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   if (!user) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Not Signed In</CardTitle>
//             <CardDescription>Please sign in to view your notifications</CardDescription>
//           </CardHeader>
//           <CardFooter>
//             <Button asChild className="w-full">
//               <Link href="/auth">Sign In</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-10 px-4 max-w-3xl">
//       <div className="flex items-center mb-6">
//         <Button asChild variant="ghost" className="mr-4">
//           <Link href="/">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Home
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold">Notifications</h1>
//       </div>

//       <Tabs defaultValue="unread" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 mb-6">
//           <TabsTrigger value="unread" className="flex items-center gap-2">
//             <Bell className="h-4 w-4" />
//             Unread
//             {unreadNotifications.length > 0 && (
//               <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
//                 {unreadNotifications.length}
//               </span>
//             )}
//           </TabsTrigger>
//           <TabsTrigger value="all" className="flex items-center gap-2">
//             <BellOff className="h-4 w-4" />
//             All
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="unread">
//           {unreadNotifications.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Bell className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-lg font-medium mb-2">No unread notifications</h3>
//               <p className="text-muted-foreground mb-4">You're all caught up!</p>
//             </div>
//           ) : (
//             <div>
//               {unreadNotifications.map((notification) => (
//                 <NotificationCard
//                   key={notification.id}
//                   notification={notification}
//                   userId={user.uid}
//                   onMarkAsRead={handleMarkAsRead}
//                 />
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="all">
//           {notifications.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BellOff className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
//               <p className="text-muted-foreground mb-4">You'll see notifications from the restaurant here</p>
//             </div>
//           ) : (
//             <div>
//               {unreadNotifications.map((notification) => (
//                 <NotificationCard
//                   key={notification.id}
//                   notification={notification}
//                   userId={user.uid}
//                   onMarkAsRead={handleMarkAsRead}
//                 />
//               ))}

//               {readNotificationsList.length > 0 && (
//                 <>
//                   {unreadNotifications.length > 0 && (
//                     <div className="my-6 flex items-center gap-3">
//                       <div className="h-px bg-gray-200 flex-1"></div>
//                       <span className="text-sm text-muted-foreground">Read notifications</span>
//                       <div className="h-px bg-gray-200 flex-1"></div>
//                     </div>
//                   )}

//                   {readNotificationsList.map((notification) => (
//                     <NotificationCard
//                       key={notification.id}
//                       notification={notification}
//                       userId={user.uid}
//                       onMarkAsRead={handleMarkAsRead}
//                     />
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }