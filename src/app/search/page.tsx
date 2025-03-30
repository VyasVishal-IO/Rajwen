"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, User, Users, TrendingUp, ArrowLeft, UserPlus, 
  UserCheck, UserX, Clock, Filter, ChevronRight, Home
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string
  createdAt: any
  followers?: string[]
  following?: string[]
  likedItems?: string[]
}

// Custom hook for media queries if not already defined
const useMediaQueryFallback = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])
  
  return matches
}

export default function SearchPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<UserProfile[]>([])
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([])
  const [popularUsers, setPopularUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("recent")
  const [isSearching, setIsSearching] = useState(false)
  
  // Use the existing hook if available, otherwise use the fallback
  const isMobile = (useMediaQuery || useMediaQueryFallback)("(max-width: 768px)")

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const usersCollection = collection(db, "users")

        // Fetch recent users
        const recentUsersQuery = query(usersCollection, orderBy("createdAt", "desc"), limit(6))

        const recentUsersSnapshot = await getDocs(recentUsersQuery)
        const recentUsersList = recentUsersSnapshot.docs
          .map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
          .filter((u) => u.uid !== user?.uid) as UserProfile[]

        setRecentUsers(recentUsersList)

        // Fetch popular users (based on follower count)
        const allUsersSnapshot = await getDocs(usersCollection)
        const allUsers = allUsersSnapshot.docs
          .map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
          .filter((u) => u.uid !== user?.uid) as UserProfile[]

        // Sort by follower count
        const sortedUsers = allUsers.sort((a, b) => {
          const aFollowers = a.followers?.length || 0
          const bFollowers = b.followers?.length || 0
          return bFollowers - aFollowers
        })

        setPopularUsers(sortedUsers.slice(0, 6))
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [user])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setLoading(true)
    try {
      const usersCollection = collection(db, "users")

      // Search by displayName
      const nameQuery = query(
        usersCollection,
        where("displayName", ">=", searchQuery),
        where("displayName", "<=", searchQuery + "\uf8ff"),
        limit(12),
      )

      const nameSnapshot = await getDocs(nameQuery)
      const nameResults = nameSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as UserProfile[]

      // Search by email
      const emailQuery = query(
        usersCollection,
        where("email", ">=", searchQuery),
        where("email", "<=", searchQuery + "\uf8ff"),
        limit(12),
      )

      const emailSnapshot = await getDocs(emailQuery)
      const emailResults = emailSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as UserProfile[]

      // Combine results and remove duplicates
      const combinedResults = [...nameResults, ...emailResults]
      const uniqueResults = Array.from(new Map(combinedResults.map((item) => [item.uid, item])).values()).filter(
        (u) => u.uid !== user?.uid,
      )

      setSearchResults(uniqueResults)
      setActiveTab("search")
    } catch (error) {
      console.error("Error searching users:", error)
      toast.error("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
    setActiveTab("recent")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-6 md:py-10 px-4 max-w-5xl">
        {/* Header with responsive design */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="mr-2 md:mr-4 bg-background shadow-sm">
              <Link href="/">
                {isMobile ? <Home className="h-5 w-5" /> : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </>
                )}
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Find People</h1>
          </div>
          
          {/* Only show search in mobile view when user clicks search */}
          {isMobile && !isSearching && (
            <Button onClick={() => setIsSearching(true)} size="icon" variant="outline" className="self-end">
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Search section with improved styling */}
        {(!isMobile || isSearching) && (
          <Card className="mb-8 border-none shadow-md overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center">
                <Search className="mr-2 h-5 w-5 text-primary" />
                Discover Food Enthusiasts
              </CardTitle>
              <CardDescription>
                Connect with other food lovers, follow their favorites, and discover new dishes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 border-muted bg-background/80 focus-visible:ring-primary"
                    autoFocus={isMobile && isSearching}
                  />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()} className="bg-primary hover:bg-primary/90">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  {isMobile && (
                    <Button variant="outline" onClick={clearSearch}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main content area */}
        {loading ? (
          <UserLoadingSkeleton />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pt-2 pb-4">
              <TabsList className="grid w-full grid-cols-3 mb-4 h-auto p-1 bg-muted/50">
                <TabsTrigger value="recent" className="flex items-center gap-2 py-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Recent</span>
                  <span className="sm:hidden">New</span>
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-2 py-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Popular</span>
                  <span className="sm:hidden">Top</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="search" 
                  className="flex items-center gap-2 py-2"
                  disabled={searchResults.length === 0}
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Results</span>
                  <span className="sm:hidden">Found</span>
                  {searchResults.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                      {searchResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="recent" className="mt-0">
              <UserCardGrid 
                title="Recently Joined"
                icon={<Clock className="mr-2 h-5 w-5 text-primary" />}
                description="Connect with the newest members of our community"
                users={recentUsers}
                currentUser={user}
                emptyIcon={<Clock className="h-8 w-8 text-muted-foreground" />}
                emptyTitle="No recent users"
                emptyDescription="There are no recent users to display yet"
              />
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <UserCardGrid 
                title="Popular Food Enthusiasts"
                icon={<TrendingUp className="mr-2 h-5 w-5 text-primary" />}
                description="Users with the most followers in our community"
                users={popularUsers}
                currentUser={user}
                showRank={true}
                emptyIcon={<TrendingUp className="h-8 w-8 text-muted-foreground" />}
                emptyTitle="No popular users yet"
                emptyDescription="As users gain followers, they'll appear here"
              />
            </TabsContent>

            <TabsContent value="search" className="mt-0">
              <UserCardGrid 
                title={`Search Results`}
                icon={<Search className="mr-2 h-5 w-5 text-primary" />}
                description={searchQuery ? `Results for "${searchQuery}"` : "Your search results"}
                users={searchResults}
                currentUser={user}
                emptyIcon={<UserX className="h-8 w-8 text-muted-foreground" />}
                emptyTitle="No users found"
                emptyDescription={`We couldn't find any users matching "${searchQuery}"`}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

function UserCardGrid({
  title,
  icon,
  description,
  users,
  currentUser,
  showRank = false,
  emptyIcon,
  emptyTitle,
  emptyDescription
}: {
  title: string
  icon: React.ReactNode
  description: string
  users: UserProfile[]
  currentUser: any
  showRank?: boolean
  emptyIcon: React.ReactNode
  emptyTitle: string
  emptyDescription: string
}) {
  const isMobile = (useMediaQuery || useMediaQueryFallback)("(max-width: 768px)")
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            {icon}
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        
        {users.length > 0 && (
          <Badge variant="outline" className="self-start md:self-auto mt-2 md:mt-0">
            {users.length} {users.length === 1 ? "user" : "users"}
          </Badge>
        )}
      </div>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((profile, index) => (
            <UserCard 
              key={profile.uid} 
              profile={profile} 
              currentUser={currentUser} 
              showRank={showRank} 
              rank={index + 1}
              compact={isMobile}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            {emptyIcon}
          </div>
          <h3 className="text-lg font-medium mb-2">{emptyTitle}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">{emptyDescription}</p>
        </div>
      )}
    </div>
  )
}

function UserLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function UserCard({
  profile,
  currentUser,
  showRank = false,
  rank = 0,
  compact = false,
}: {
  profile: UserProfile
  currentUser: any
  showRank?: boolean
  rank?: number
  compact?: boolean
}) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (currentUser && profile.followers) {
      setIsFollowing(profile.followers.includes(currentUser.uid))
      setFollowerCount(profile.followers.length)
    } else {
      setFollowerCount(profile.followers?.length || 0)
    }
  }, [currentUser, profile])

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!currentUser) {
      toast.error("Please sign in to follow users", {
        icon: '👤',
        position: 'bottom-center'
      })
      return
    }

    if (currentUser.uid === profile.uid) {
      toast.error("You cannot follow yourself", {
        icon: '🤷‍♂️',
        position: 'bottom-center'
      })
      return
    }

    setIsLoading(true)
    try {
      const userRef = doc(db, "users", profile.uid)
      const currentUserRef = doc(db, "users", currentUser.uid)

      if (isFollowing) {
        // Unfollow
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid),
        })

        await updateDoc(currentUserRef, {
          following: arrayRemove(profile.uid),
        })

        setIsFollowing(false)
        setFollowerCount((prev) => Math.max(0, prev - 1))
        toast.success(`Unfollowed ${profile.displayName}`, {
          icon: '👋',
          position: 'bottom-center'
        })
      } else {
        // Follow
        await updateDoc(userRef, {
          followers: arrayUnion(currentUser.uid),
        })

        await updateDoc(currentUserRef, {
          following: arrayUnion(profile.uid),
        })

        setIsFollowing(true)
        setFollowerCount((prev) => prev + 1)
        toast.success(`Following ${profile.displayName}`, {
          icon: '🎉',
          position: 'bottom-center'
        })
      }
    } catch (error) {
      console.error("Error updating follow status:", error)
      toast.error("Failed to update follow status", {
        position: 'bottom-center'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card 
      className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/profile/${profile.uid}`} className="block">
        <CardContent className={`p-0`}>
          <div className={`${isHovered ? 'bg-primary/5' : 'bg-card'} transition-colors duration-300 h-full`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {showRank && (
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${rank <= 3 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    {rank}
                  </div>
                )}
                <Avatar className={`h-12 w-12 border ${isHovered ? 'border-primary/30' : 'border-muted-foreground/10'} transition-colors duration-300 shadow-sm`}>
                  <AvatarImage
                    src={profile.photoURL || "/placeholder.svg?height=48&width=48"}
                    alt={profile.displayName || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {profile.displayName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className={`font-medium ${isHovered ? 'text-primary' : ''} transition-colors duration-300`}>
                      {profile.displayName}
                    </h3>
                    {followerCount > 0 && !compact && (
                      <Badge variant="outline" className="text-xs bg-primary/5">
                        {followerCount} {followerCount === 1 ? "follower" : "followers"}
                      </Badge>
                    )}
                  </div>
                  {!compact ? (
                    <>
                      <p className="text-sm text-muted-foreground truncate max-w-[180px]">{profile.email}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        Joined {profile.createdAt ? formatDate(profile.createdAt.toDate()) : "N/A"}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {followerCount > 0 ? (
                        <span>{followerCount} {followerCount === 1 ? "follower" : "followers"}</span>
                      ) : (
                        <span>New user</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {currentUser && currentUser.uid !== profile.uid && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        size="sm"
                        onClick={handleFollowToggle}
                        disabled={isLoading}
                        className={`${isFollowing ? 'border-primary text-primary hover:bg-primary/10' : ''} ${compact ? 'h-8 w-8 p-0' : ''}`}
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : isFollowing ? (
                          <>
                            {!compact && "Following"}
                            <UserCheck className={compact ? "" : "ml-1"} size={16} />
                          </>
                        ) : (
                          <>
                            {!compact && "Follow"}
                            <UserPlus className={compact ? "" : "ml-1"} size={16} />
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      {isFollowing ? "Unfollow" : "Follow"} {profile.displayName}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {!currentUser && (
                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}






// Custom hook for media queries
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)
    
    useEffect(() => {
      const media = window.matchMedia(query)
      if (media.matches !== matches) {
        setMatches(media.matches)
      }
      
      const listener = () => setMatches(media.matches)
      media.addEventListener("change", listener)
      
      return () => media.removeEventListener("change", listener)
    }, [matches, query])
    
    return matches
  }