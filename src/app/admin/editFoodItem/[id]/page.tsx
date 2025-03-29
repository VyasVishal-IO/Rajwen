"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

export default function EditFoodItemPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isLoading, isAdmin } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isVegan: false,
    isSpicy: false,
    ingredients: [""],
    nutritionalInfo: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  })

  const [additionalDetails, setAdditionalDetails] = useState<string[]>([])
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isLoading, isAdmin, router])

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const itemDoc = await getDoc(doc(db, "menuItems", id as string))

        if (itemDoc.exists()) {
          const itemData = itemDoc.data()

          setFormData({
            name: itemData.name || "",
            description: itemData.description || "",
            price: itemData.price?.toString() || "",
            category: itemData.category || "",
            imageUrl: itemData.imageUrl || "",
            isVegan: itemData.isVegan || false,
            isSpicy: itemData.isSpicy || false,
            ingredients: itemData.ingredients?.length ? itemData.ingredients : [""],
            nutritionalInfo: {
              calories: itemData.nutritionalInfo?.calories?.toString() || "",
              protein: itemData.nutritionalInfo?.protein?.toString() || "",
              carbs: itemData.nutritionalInfo?.carbs?.toString() || "",
              fat: itemData.nutritionalInfo?.fat?.toString() || "",
            },
          })

          setAdditionalDetails(itemData.additionalDetails || [])
          setAdditionalImages(itemData.additionalImages || [])
        } else {
          toast.error("Food item not found")
          router.push("/admin/allFoodItems")
        }
      } catch (error) {
        console.error("Error fetching food item:", error)
        toast.error("Failed to load food item details")
      } finally {
        setLoading(false)
      }
    }

    if (user && isAdmin && id) {
      fetchFoodItem()
    }
  }, [id, user, isAdmin, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("nutritionalInfo.")) {
      const nutritionField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [nutritionField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients[index] = value

    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }))
  }

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }))
  }

  const addAdditionalDetail = () => {
    setAdditionalDetails((prev) => [...prev, ""])
  }

  const handleAdditionalDetailChange = (index: number, value: string) => {
    const updatedDetails = [...additionalDetails]
    updatedDetails[index] = value
    setAdditionalDetails(updatedDetails)
  }

  const removeAdditionalDetail = (index: number) => {
    const updatedDetails = [...additionalDetails]
    updatedDetails.splice(index, 1)
    setAdditionalDetails(updatedDetails)
  }

  const addAdditionalImage = () => {
    setAdditionalImages((prev) => [...prev, ""])
  }

  const handleAdditionalImageChange = (index: number, value: string) => {
    const updatedImages = [...additionalImages]
    updatedImages[index] = value
    setAdditionalImages(updatedImages)
  }

  const removeAdditionalImage = (index: number) => {
    const updatedImages = [...additionalImages]
    updatedImages.splice(index, 1)
    setAdditionalImages(updatedImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setIsSubmitting(true)

      // Convert price and nutritional info to numbers
      const menuItemData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        nutritionalInfo: {
          calories: Number.parseInt(formData.nutritionalInfo.calories) || 0,
          protein: Number.parseInt(formData.nutritionalInfo.protein) || 0,
          carbs: Number.parseInt(formData.nutritionalInfo.carbs) || 0,
          fat: Number.parseInt(formData.nutritionalInfo.fat) || 0,
        },
        additionalDetails: additionalDetails.filter((detail) => detail.trim() !== ""),
        additionalImages: additionalImages.filter((img) => img.trim() !== ""),
        updatedAt: new Date(),
      }

      // Remove empty ingredients
      menuItemData.ingredients = menuItemData.ingredients.filter((ingredient) => ingredient.trim() !== "")

      await updateDoc(doc(db, "menuItems", id as string), menuItemData)

      toast.success("Food item updated successfully!")
      router.push("/admin/allFoodItems")
    } catch (error) {
      console.error("Error updating food item:", error)
      toast.error("Failed to update food item")
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <Link href="/admin/allFoodItems">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Food Items
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Food Item</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic details of the food item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter food item name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price (₹) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appetizer">Appetizer</SelectItem>
                      <SelectItem value="main">Main Course</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="bread">Bread</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="curry">Curry</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a detailed description of the food item"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">
                    Main Image URL <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden">
                      <Image
                        src={formData.imageUrl || "/placeholder.svg"}
                        alt="Food item preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVegan"
                      checked={formData.isVegan}
                      onCheckedChange={(checked) => handleCheckboxChange("isVegan", checked as boolean)}
                    />
                    <Label htmlFor="isVegan">Vegan</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isSpicy"
                      checked={formData.isSpicy}
                      onCheckedChange={(checked) => handleCheckboxChange("isSpicy", checked as boolean)}
                    />
                    <Label htmlFor="isSpicy">Spicy</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>List all ingredients used in this food item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      disabled={formData.ingredients.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addIngredient} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Ingredient
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Nutritional Information</CardTitle>
                <CardDescription>Enter the nutritional details of the food item</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      name="nutritionalInfo.calories"
                      type="number"
                      min="0"
                      value={formData.nutritionalInfo.calories}
                      onChange={handleInputChange}
                      placeholder="Calories"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      name="nutritionalInfo.protein"
                      type="number"
                      min="0"
                      value={formData.nutritionalInfo.protein}
                      onChange={handleInputChange}
                      placeholder="Protein"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      name="nutritionalInfo.carbs"
                      type="number"
                      min="0"
                      value={formData.nutritionalInfo.carbs}
                      onChange={handleInputChange}
                      placeholder="Carbs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      name="nutritionalInfo.fat"
                      type="number"
                      min="0"
                      value={formData.nutritionalInfo.fat}
                      onChange={handleInputChange}
                      placeholder="Fat"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Additional Details (Optional)</CardTitle>
                <CardDescription>Add any additional information about the food item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={detail}
                      onChange={(e) => handleAdditionalDetailChange(index, e.target.value)}
                      placeholder={`Additional detail ${index + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAdditionalDetail(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAdditionalDetail}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Detail
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Additional Images (Optional)</CardTitle>
                <CardDescription>Add additional images of the food item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={image}
                        onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAdditionalImage(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {image && (
                      <div className="relative h-32 w-full rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Additional image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAdditionalImage}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Image
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Preview of the food item</CardDescription>
              </CardHeader>
              <CardContent>
                {formData.imageUrl ? (
                  <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                    <Image
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt={formData.name || "Food item preview"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-muted rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">No image provided</p>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-1">{formData.name || "Food Item Name"}</h3>
                <p className="text-muted-foreground mb-2">{formData.category || "Category"}</p>
                <p className="font-bold text-lg mb-4">₹{formData.price || "0.00"}</p>

                <p className="text-sm text-muted-foreground mb-4">
                  {formData.description || "Food item description will appear here"}
                </p>

                <div className="flex gap-2 mb-4">
                  {formData.isVegan && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegan</span>
                  )}
                  {formData.isSpicy && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Spicy</span>}
                </div>

                {formData.ingredients.some((ing) => ing.trim() !== "") && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {formData.ingredients
                        .filter((ing) => ing.trim() !== "")
                        .map((ing, index) => (
                          <li key={index}>{ing}</li>
                        ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Food Item"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

