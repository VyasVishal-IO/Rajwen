"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string
  createdAt: any
}

export default function UserProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id as string))

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile)
        } else {
          setError("User not found")
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "User not found"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/menu">Back to Menu</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/menu">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto">
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
          <CardDescription>Community Member</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            <p>{profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-center text-muted-foreground">
              This is a public profile. Users can only see basic information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

