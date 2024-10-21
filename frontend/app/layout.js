"use client";
import { useEffect } from "react";
import Footer from "./components/layout/footer/page";
import "./globals.css";
import Script from "next/script";

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
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
