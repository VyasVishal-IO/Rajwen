import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Mail, Star, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
     

      {/* Hero Section */}
      <section id="home" className="relative h-screen md:h-96 lg:h-128 w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlg9MblVJ4RfrUGbIpYJWorLguExgys3Nwuw&s" 
          alt="Authentic Indian Food" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Authentic Pure Vegetarian Indian Cuisine</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience the rich flavors and traditions of India at Rajwen Restaurant in Gandhinagar
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Reserve Table
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-green-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Our Location</h3>
                <p className="text-gray-600 text-sm">Shop no 14, Rajwen Happiness Food Court, PDPU Road, Raysan, Gandhinagar, Gujarat</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Opening Hours</h3>
                <p className="text-gray-600 text-sm">Mon-Sun: 11:00 AM - 10:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Contact Us</h3>
                <p className="text-gray-600 text-sm">+91 8200192146 • rajwen0807@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular authentic Indian vegetarian dishes prepared with traditional recipes and fresh ingredients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Dish 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src="https://content.jdmagicbox.com/comp/vadodara/b5/0265px265.x265.220729130106.p8b5/catalogue/thaali-online-vadodara-punjabi-thali-delivery-restaurants-pvzvf9gzqi.jpg" alt="Paneer Tikka Masala" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Fix Punjabi Thali</h3>
                  <p className="text-green-600 font-bold">₹299</p>
                </div>
                <p className="text-gray-600 mb-4">A Fix Punjabi Thali is a traditional North Indian meal with a set combination of roti/naan, rice, dal makhani, paneer dish, seasonal sabzi, raita, pickle, papad, salad, and dessert. It offers a rich blend of Punjabi flavors in a wholesome, satisfying platter.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Featured Dish 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src="https://content.jdmagicbox.com/comp/def_content/kathiyawadi-restaurants/2-kathiyawadi-restaurants-2-oevtg.jpg" alt="Gujarati Thali" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Fix Kathiyawadi Thali</h3>
                  <p className="text-green-600 font-bold">₹299</p>
                </div>
                <p className="text-gray-600 mb-4">Traditional Gujarati meal with roti, dal, rice, shaak, kadhi, papad, pickle and sweet dish</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
            
            
          </div>
          
          <div className="text-center mt-12">
            <Link href="/menu">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">The Story of Rajwen</h2>
              <p className="text-gray-600 mb-4">
                Established with a passion for authentic Indian vegetarian cuisine, Rajwen Restaurant brings the rich culinary traditions of India to Gandhinagar. Our recipes have been perfected over generations, offering a truly authentic dining experience.
              </p>
              <p className="text-gray-600 mb-4">
                At Rajwen, we take pride in serving 100% pure vegetarian food made with the freshest ingredients and traditional spices. Our chefs are dedicated to maintaining the authenticity of each dish while ensuring a delightful dining experience.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're craving a flavorful North Indian curry, a traditional Gujarati thali, or street food favorites, we guarantee a memorable culinary journey that celebrates the diverse flavors of India.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                Learn More About Us
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img src="Logo.png" alt="Rajwen Restaurant Interior" className="rounded-lg shadow-none w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their dining experience at Rajwen</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
              </div>
              <p className="text-gray-600 italic mb-4">"The authentic flavors at Rajwen reminded me of my grandmother's cooking. The Gujarati Thali was absolutely delicious and the service was excellent!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Patel</h4>
                  <p className="text-gray-500 text-sm">Regular Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
              </div>
              <p className="text-gray-600 italic mb-4">"As a food enthusiast, I can confidently say that Rajwen serves the most authentic Indian vegetarian food in Gandhinagar. Their Paneer Tikka Masala is to die for!"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Amit Shah</h4>
                  <p className="text-gray-500 text-sm">Food Blogger</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
                <Star className="h-5 w-5 text-orange-500 fill-current" />
              </div>
              <p className="text-gray-600 italic mb-4">"Perfect place for family dinners! The variety of dishes and the quality of food is exceptional. The staff is friendly and the ambiance is warm and welcoming."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Mehta</h4>
                  <p className="text-gray-500 text-sm">Family Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Rich Taste of India</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Visit us today or order online to enjoy authentic Indian vegetarian cuisine</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Reserve a Table
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Order Online
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions or want to make a reservation? Get in touch with us!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Our Restaurant</h3>
              <div className="flex items-start mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Shop no 14, Rajwen Happiness Food Court, PDPU Road, Raysan, Gandhinagar, Gujarat</p>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <p className="text-gray-600">+91 8200192146</p>
              </div>
              
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <p className="text-gray-600">rajwen0807@gmail.com</p>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Operating Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 11:00 AM - 10:30 PM</p>
                <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* <a href="#" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a> */}
                  <a href="#" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  {/* <a href="#" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a> */}
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your Name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your Email" 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Phone Number" 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    // rows="5" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Rajwen</h3>
              <p className="text-gray-400 mb-4">
                Authentic Indian vegetarian cuisine made with love and traditional recipes.
              </p>
              <div className="flex space-x-4">
               
                <a href="https://www.instagram.com/rajwenin?igsh=MWs2bXVjNW1jaTEzdQ==" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
              
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#menu" className="text-gray-400 hover:text-white">Menu</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">Shop no 14, Rajwen Happiness Food Court, PDPU Road, Raysan, Gandhinagar, Gujarat</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">+91 8200192146</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">rajwen0807@gmail.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>11:00 AM - 10:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span>11:00 AM - 11:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Rajwen Indian Vegetarian Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}