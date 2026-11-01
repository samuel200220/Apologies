import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Un instant dans le temps ✨ | Pour Ivana",
  description:
    "Une attention sincère et délicate pour te présenter mes excuses, Ivana. Je ne peux pas changer le passé, mais je peux faire mieux demain.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Un instant dans le temps ✨ | Pour Ivana",
    description: "Je ne peux pas changer le passé, mais je peux faire mieux demain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} antialiased bg-[#1a060d] text-[#FFF4E8] selection:bg-[#711F35] selection:text-[#FFF4E8] min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
