import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, UtensilsCrossed } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Rajwen Restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Rajwen Indian Veg Food Restaurant</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience authentic Indian vegetarian cuisine with our carefully crafted dishes
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/menu">
                View Our Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link href="/auth">Sign In / Register</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Signature Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-60">
                  <Image
                    src={`/placeholder.svg?height=240&width=400`}
                    alt={`Featured dish ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Signature Dish {item}</h3>
                  <p className="text-muted-foreground mb-4">
                    Delicious authentic Indian vegetarian dish made with fresh ingredients and traditional spices.
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/menu/item/${item}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">About Rajwen Restaurant</h2>
              <p className="text-muted-foreground mb-4">
                Rajwen Indian Veg Food Restaurant has been serving authentic Indian vegetarian cuisine for over 15
                years. Our recipes have been passed down through generations, and we take pride in using only the
                freshest ingredients.
              </p>
              <p className="text-muted-foreground mb-6">
                Our chefs are trained in traditional cooking methods to bring you the most authentic flavors of India.
                We cater to all dietary preferences and offer a wide range of vegan and gluten-free options.
              </p>
              <Button asChild>
                <Link href="/menu">
                  Explore Our Menu <UtensilsCrossed className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={`Customer ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Customer Name</h3>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The food at Rajwen is absolutely delicious! The flavors are authentic and the service is excellent. I
                  highly recommend trying their signature dishes."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Authentic Indian Cuisine?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join us for a culinary journey through the flavors of India</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/menu">View Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/auth">Sign In for Special Offers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

