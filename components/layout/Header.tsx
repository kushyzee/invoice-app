"use client"

import Logo from "@/assets/svg/logo.svg"
import Moon from "@/assets/svg/moon.svg"
import Image from "next/image"
import profilePic from "@/assets/images/profile-image.jpeg"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun } from "lucide-react"
import { Button } from "../ui/button"

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <header className="fixed top-0 left-0 flex h-[72px] w-full items-center justify-between bg-sidebar md:h-[80px] lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-3xl">
      <div className="h-[72px] w-[72px] overflow-hidden rounded-r-2xl md:h-[80px] md:w-[80px] lg:h-[103px] lg:w-[103px] lg:rounded-r-3xl">
        <Logo className="h-full w-full object-cover" />
      </div>
      <div className="flex h-full items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="pr-6 text-sidebar-primary transition-colors hover:text-[#DFE3FA] md:px-8"
          aria-label="Toggle Theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <div className="h-full w-px bg-sidebar-border" />

        <div className="flex items-center justify-center px-6 md:px-8">
          <Image
            src={profilePic}
            alt="Profile"
            loading="eager"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
