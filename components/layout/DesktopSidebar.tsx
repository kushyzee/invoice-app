import Image from "next/image"
import LogoWrapper from "./LogoWrapper"
import ThemeSwitcher from "./ThemeSwitcher"
import profilePic from "@/assets/images/profile-image.jpeg"

export default function DesktopSidebar({ mounted }: { mounted: boolean }) {
  return (
    <header className="fixed top-0 bottom-0 left-0 hidden w-[103px] flex-col items-center justify-between bg-sidebar lg:flex">
      <LogoWrapper />
      <div className="flex w-full flex-col items-center gap-6">
        <ThemeSwitcher mounted={mounted} />

        <div className="h-px w-full bg-sidebar-border" />

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
