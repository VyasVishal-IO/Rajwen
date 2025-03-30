// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { useAuth } from "@/components/auth-provider"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowLeft, Send, Users, User } from "lucide-react"
// import toast from "react-hot-toast"

// interface UserData {
//   uid: string
//   displayName: string
//   email: string
//   photoURL: string
// }

// export default function NotificationsPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { user, isLoading, isAdmin } = useAuth()
//   const [users, setUsers] = useState<UserData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedUser, setSelectedUser] = useState<string>("all")
//   const [notificationTitle, setNotificationTitle] = useState("")
//   const [notificationMessage, setNotificationMessage] = useState("")
//   const [isSending, setIsSending] = useState(false)

//   // Get userId from URL if provided
//   const userIdFromUrl = searchParams.get("userId")

//   useEffect(() => {
//     if (!isLoading && (!user || !isAdmin)) {
//       router.push("/")
//     }
//   }, [user, isLoading, isAdmin, router])

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersCollection = collection(db, "users")
//         const usersSnapshot = await getDocs(usersCollection)
//         const usersList = usersSnapshot.docs.map((doc) => ({
//           uid: doc.id,
//           ...doc.data(),
//         })) as UserData[]

//         setUsers(usersList)

//         // If userId is provided in URL, set it as selected user
//         if (userIdFromUrl) {
//           setSelectedUser(userIdFromUrl)
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error)
//         toast.error("Failed to load users")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (user && isAdmin) {
//       fetchUsers()
//     }
//   }, [user, isAdmin, userIdFromUrl])

//   const handleSendNotification = async () => {
//     if (!notificationTitle.trim() || !notificationMessage.trim()) {
//       toast.error("Please enter both title and message")
//       return
//     }

//     try {
//       setIsSending(true)

//       const notification = {
//         title: notificationTitle,
//         message: notificationMessage,
//         sentBy: user?.displayName,
//         sentById: user?.uid,
//         createdAt: serverTimestamp(),
//         recipients: selectedUser === "all" ? "all" : selectedUser,
//       }

//       await addDoc(collection(db, "notifications"), notification)

//       toast.success(selectedUser === "all" ? "Notification sent to all users" : "Notification sent successfully")

//       // Reset form
//       setNotificationTitle("")
//       setNotificationMessage("")
//     } catch (error) {
//       console.error("Error sending notification:", error)
//       toast.error("Failed to send notification")
//     } finally {
//       setIsSending(false)
//     }
//   }

//   if (isLoading || loading) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   if (!user || !isAdmin) {
//     return (
//       <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Access Denied</CardTitle>
//             <CardDescription>You don't have permission to access this page</CardDescription>
//           </CardHeader>
//           <CardFooter>
//             <Button asChild className="w-full">
//               <Link href="/">Back to Home</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   const selectedUserData = users.find((u) => u.uid === selectedUser)

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <div className="flex items-center mb-6">
//         <Button asChild variant="ghost" className="mr-4">
//           <Link href="/admin">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold">Send Notifications</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Compose Notification</CardTitle>
//               <CardDescription>Send notifications to your customers</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="recipient">Recipient</Label>
//                 <Select value={selectedUser} onValueChange={setSelectedUser}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select recipient" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">
//                       <div className="flex items-center">
//                         <Users className="mr-2 h-4 w-4" />
//                         <span>All Users</span>
//                       </div>
//                     </SelectItem>
//                     {users.map((user) => (
//                       <SelectItem key={user.uid} value={user.uid}>
//                         <div className="flex items-center">
//                           <User className="mr-2 h-4 w-4" />
//                           <span>{user.displayName || user.email}</span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="title">Notification Title</Label>
//                 <Input
//                   id="title"
//                   value={notificationTitle}
//                   onChange={(e) => setNotificationTitle(e.target.value)}
//                   placeholder="Enter notification title"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="message">Notification Message</Label>
//                 <Textarea
//                   id="message"
//                   value={notificationMessage}
//                   onChange={(e) => setNotificationMessage(e.target.value)}
//                   placeholder="Enter your notification message here..."
//                   rows={6}
//                 />
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end">
//               <Button
//                 onClick={handleSendNotification}
//                 disabled={isSending || !notificationTitle.trim() || !notificationMessage.trim()}
//                 className="flex items-center gap-2"
//               >
//                 <Send className="h-4 w-4" />
//                 {isSending ? "Sending..." : "Send Notification"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>

//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Recipient Preview</CardTitle>
//               <CardDescription>
//                 {selectedUser === "all"
//                   ? "This notification will be sent to all users"
//                   : "This notification will be sent to the selected user"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {selectedUser === "all" ? (
//                 <div className="flex items-center justify-center flex-col py-6">
//                   <Users className="h-16 w-16 text-muted-foreground mb-4" />
//                   <p className="font-medium text-lg">All Users</p>
//                   <p className="text-sm text-muted-foreground">Total: {users.length} users</p>
//                 </div>
//               ) : selectedUserData ? (
//                 <div className="flex flex-col items-center py-4">
//                   <div className="relative h-20 w-20 rounded-full overflow-hidden mb-4">
//                     <Image
//                       src={selectedUserData.photoURL || "/placeholder.svg?height=80&width=80"}
//                       alt={selectedUserData.displayName || "User"}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <p className="font-medium text-lg">{selectedUserData.displayName}</p>
//                   <p className="text-sm text-muted-foreground">{selectedUserData.email}</p>
//                 </div>
//               ) : (
//                 <div className="text-center py-6">
//                   <p className="text-muted-foreground">No recipient selected</p>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter>
//               {selectedUser !== "all" && selectedUserData && (
//                 <Button asChild variant="outline" className="w-full">
//                   <Link href={`/admin/user/${selectedUser}`}>View User Profile</Link>
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>

//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Notification Preview</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-bold text-lg mb-2">{notificationTitle || "Notification Title"}</h3>
//                 <p className="text-muted-foreground">
//                   {notificationMessage || "Your notification message will appear here..."}
//                 </p>
//                 <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
//                   <p>From: {user.displayName}</p>
//                   <p>Date: {new Date().toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }



import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      comming soon
    </div>
  )
}

export default page
