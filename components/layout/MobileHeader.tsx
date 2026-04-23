import Image from "next/image"
import ThemeSwitcher from "./ThemeSwitcher"
import profilePic from "@/assets/images/profile-image.jpeg"
import LogoWrapper from "./LogoWrapper"

export default function MobileHeader({ mounted }: { mounted: boolean }) {
  return (
    <header className="fixed top-0 left-0 flex h-[72px] w-full items-center justify-between bg-sidebar md:h-[80px] lg:hidden">
      <LogoWrapper />
      <div className="flex h-full items-center">
        <ThemeSwitcher mounted={mounted} />

        <div className="h-full w-px bg-sidebar-border" />

        <div className="flex items-center justify-center px-6 md:px-8">
          <Image
            src={profilePic}
            alt="Profile"
            loading="eager"
            className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
          />
        </div>
      </div>
    </header>
  )
}
