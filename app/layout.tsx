import { League_Spartan } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/Header"

const league = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", league.variable)}
    >
      <body>
        <ThemeProvider>
          <Header />
          <main className="pt-[72px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
