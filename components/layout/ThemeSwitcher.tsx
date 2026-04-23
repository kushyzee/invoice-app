import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeSwitcher({ mounted }: { mounted: boolean }) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
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
  )
}
