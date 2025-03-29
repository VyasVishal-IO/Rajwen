// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// // export function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs))
// // }

// export function formatPrice(price: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(price)
// }

// export function isAdmin(email: string | null | undefined) {
//   if (!email) return false
//   const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || []
//   return adminEmails.includes(email)
// }

// export function generateOrderId() {
//   return `ORD-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getTime().toString().slice(-4)}`
// }

// export function formatDate(date: Date) {
//   return new Intl.DateTimeFormat("en-IN", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date)
// }

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price)
}

export function isAdmin(email: string | null | undefined) {
  if (!email) return false

  // Get admin emails from environment variable
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || []

  // Check if the user's email is in the admin list
  return adminEmails.includes(email)
}

export function generateOrderId() {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getTime().toString().slice(-4)}`
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

