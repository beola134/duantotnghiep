"use client";
import { useEffect } from "react";
import Footer from "./components/layout/footer/page";
import "./globals.css";
import Script from "next/script";
import Header from "./components/layout/header/page";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Thêm FontAwesome script sau khi client render
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/9bb7080918.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Chỉ chạy trên client và sau khi hydrate */}
        <Script
          strategy="lazyOnload"
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0"
          crossOrigin="anonymous"
          nonce="uaRZ9ATs"
        />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
