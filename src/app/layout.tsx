// import type React from "react";
// import { Mulish } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "@/components/auth-provider";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import "./globals.css";

// export const metadata = {
//   title: "Rajwen Indian Veg Food Restaurant",
//   description: "Authentic Indian Vegetarian Cuisine",
// };

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// };

// const mulish = Mulish({
//   subsets: ["latin"],
//   weight: ["200", "400", "600", "800", "1000"],
//   variable: "--font-mulish",
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//        <head>
//         <link rel="icon" href="Logo.png" />
//       </head>
//       <body className={mulish.className}>
//         <AuthProvider>
//           <div className="flex min-h-screen flex-col">
//             <Navbar />
//             <main className="flex-1 pb-16 md:pb-0">{children}</main>
//             <div className="hidden md:block">
//               <Footer />
//             </div>
//           </div>
//           <Toaster position="top-center" />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import type React from "react";
import { Mulish } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata = {
  title: "Rajwen Indian Veg Food Restaurant",
  description: "Authentic Indian Vegetarian Cuisine",
  icons: {
    icon: [
      { url: "/Logo.png", type: "image/png" }
    ],
   
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800", "1000"],
  variable: "--font-mulish",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mulish.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <div className="hidden md:block">
              <Footer />
            </div>
          </div>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}