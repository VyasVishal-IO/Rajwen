"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"

export default function AuthPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true)
      await signInWithPopup(auth, googleProvider)
      toast.success("Successfully signed in!")
      router.push("/")
    } catch (error) {
      console.error("Error signing in with Google:", error)
      toast.error("Failed to sign in. Please try again.")
    } finally {
      setIsSigningIn(false)
    }
  }

  if (isLoading || user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Rajwen Restaurant</CardTitle>
          <CardDescription>Sign in to access your profile, place orders, and more</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
          >
            <FcGoogle className="h-5 w-5" />
            <span>{isSigningIn ? "Signing in..." : "Continue with Google"}</span>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </CardFooter>
      </Card>
    </div>
  )
}

