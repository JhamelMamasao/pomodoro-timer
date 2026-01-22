import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/ThemeProvider"

export function ModeToggle() {
 const { theme, setTheme } = useTheme()

const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
}

  return (
       <button
  onClick={toggleTheme}
  className="relative flex h-6 w-6 items-center justify-center text-gray-800 dark:text-gray-200 transition-colors focus:outline-none"
  aria-label="Toggle theme"
>
  <Sun  strokeWidth={3} className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon  strokeWidth={3} className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</button>

      
  )
}