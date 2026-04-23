import Logo from "@/assets/svg/logo.svg"

export default function LogoWrapper() {
  return (
    <div className="h-[72px] w-[72px] overflow-hidden rounded-r-2xl md:h-[80px] md:w-[80px] lg:h-[103px] lg:w-[103px] lg:rounded-r-3xl">
      <Logo className="h-full w-full object-cover" />
    </div>
  )
}
