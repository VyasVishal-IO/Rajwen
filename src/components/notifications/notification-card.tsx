// "use client"

// import { formatDistanceToNow } from "date-fns"
// import { Bell, Check } from "lucide-react"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { doc, updateDoc, arrayUnion } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import toast from "react-hot-toast"

// interface NotificationCardProps {
//   notification: {
//     id: string
//     title: string
//     message: string
//     sentBy: string
//     createdAt: any
//     read?: boolean
//   }
//   userId: string
//   onMarkAsRead: (id: string) => void
// }

// export default function NotificationCard({ notification, userId, onMarkAsRead }: NotificationCardProps) {
//   const handleMarkAsRead = async () => {
//     try {
//       const userRef = doc(db, "users", userId)
//       await updateDoc(userRef, {
//         readNotifications: arrayUnion(notification.id),
//       })

//       onMarkAsRead(notification.id)
//       toast.success("Marked as read")
//     } catch (error) {
//       console.error("Error marking notification as read:", error)
//       toast.error("Failed to update notification")
//     }
//   }

//   return (
//     <Card className={`mb-4 overflow-hidden border-l-4 ${notification.read ? "border-l-gray-200" : "border-l-primary"}`}>
//       <CardContent className="p-4">
//         <div className="flex items-start gap-3">
//           <div className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : "bg-primary/10"}`}>
//             <Bell className={`h-5 w-5 ${notification.read ? "text-gray-500" : "text-primary"}`} />
//           </div>
//           <div className="flex-1">
//             <div className="flex justify-between items-start">
//               <h3 className={`font-medium ${notification.read ? "text-gray-700" : "text-primary"}`}>
//                 {notification.title}
//               </h3>
//               <span className="text-xs text-muted-foreground">
//                 {notification.createdAt
//                   ? formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true })
//                   : ""}
//               </span>
//             </div>
//             <p className="text-muted-foreground mt-1 text-sm">{notification.message}</p>
//             <p className="text-xs text-muted-foreground mt-2">From: {notification.sentBy}</p>
//           </div>
//         </div>
//       </CardContent>
//       {!notification.read && (
//         <CardFooter className="flex justify-end p-2 bg-gray-50">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleMarkAsRead}
//             className="text-primary hover:text-primary hover:bg-primary/10"
//           >
//             <Check className="h-4 w-4 mr-1" />
//             Mark as read
//           </Button>
//         </CardFooter>
//       )}
//     </Card>
//   )
// }

