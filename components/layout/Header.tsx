"use client"

import { useEffect, useState } from "react"
import MobileHeader from "./MobileHeader"
import DesktopSidebar from "./DesktopSidebar"

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <>
      <MobileHeader mounted={mounted} />
      <DesktopSidebar mounted={mounted} />
    </>
  )
}
