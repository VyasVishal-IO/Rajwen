"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Mail, Star, ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ContactForm } from "@/components/contact-form";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative h-screen md:h-96 lg:h-128 w-full"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlg9MblVJ4RfrUGbIpYJWorLguExgys3Nwuw&s" 
          alt="Authentic Indian Food" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={fadeInUp}
          >
            Authentic Pure Vegetarian Indian Cuisine
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            variants={fadeInUp}
          >
            Experience the rich flavors and traditions of India at Rajwen Restaurant in Gandhinagar
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Order Online
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Info */}
      <motion.section 
        className="bg-green-50 py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Our Location</h3>
                <p className="text-gray-600 text-sm">Shop no 11, Aavkar 96, Behind Sahajand School of Achievers, Sargasan, Gandhinagar</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Opening Hours</h3>
                <p className="text-gray-600 text-sm">Monday - Sunday: 4:00 PM - 2:00 AM</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Contact Us</h3>
                <p className="text-gray-600 text-sm">+91 8200192146 • rajwen0807@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Dishes */}
      <motion.section 
        id="menu" 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular authentic Indian vegetarian dishes prepared with traditional recipes and fresh ingredients</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Dish 1 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={fadeInUp}
            >
              <img src="https://content.jdmagicbox.com/comp/vadodara/b5/0265px265.x265.220729130106.p8b5/catalogue/thaali-online-vadodara-punjabi-thali-delivery-restaurants-pvzvf9gzqi.jpg" alt="Punjabi Thali" className="w-full h-48 object-cover" />
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
            </motion.div>
            
            {/* Featured Dish 2 */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={fadeInUp}
            >
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
            </motion.div>
            
            {/* Featured Dish 3 - Added a third dish for balance */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              variants={fadeInUp}
            >
              <img src="Logo.png" alt="Special Thali" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Rajwen Special Thali</h3>
                  <p className="text-green-600 font-bold">₹349</p>
                </div>
                <p className="text-gray-600 mb-4">Our signature thali featuring a curated selection of our chef's specialties, combining the best flavors from different regions of India.</p>
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
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <Link href="/menu">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-16 bg-green-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              variants={fadeInUp}
            >
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
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              variants={fadeInUp}
            >
              <img src="Logo.png" alt="Rajwen Restaurant" className="rounded-lg shadow-lg w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their dining experience at Rajwen</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonials */}
            {[
              {
                text: "The authentic flavors at Rajwen reminded me of my grandmother's cooking. The Gujarati Thali was absolutely delicious and the service was excellent!",
                name: "diya choudhary",
                role: "Regular Customer"
              },
              {
                text: "Perfect place for family dinners! The variety of dishes and the quality of food is exceptional. The staff is friendly and the ambiance is warm and welcoming.",
                name: "Vyas Vishal",
                role: "Family Customer"
              },
              {
                text: "As a food enthusiast, I can confidently say that Rajwen serves the most authentic Indian vegetarian food in Gandhinagar. Their Paneer Tikka Masala is to die for!",
                name: "Ayushi Thakkar",
                role: "Food Blogger"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-sm"
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-orange-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-green-600 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Rich Taste of India</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Visit us today or order online to enjoy authentic Indian vegetarian cuisine</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Order Online
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Find Us</h2>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.467313630742!2d72.6228!3d23.195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDExJzQyLjAiTiA3MsKwMzcnMjIuMSJF!5e0!3m2!1sen!2sin!4v1638000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-16 bg-green-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions or want to place an order? Get in touch with us!</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Our Restaurant</h3>
              <div className="flex items-start mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Shop no 11, Aavkar 96, Behind Sahajand School of Achievers, Sargasan, Gandhinagar</p>
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
                <p>Monday - Sunday: 4:00 PM - 2:00 AM</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-md"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              
          <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>

     
    </div>
  );
}