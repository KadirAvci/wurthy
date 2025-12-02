import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/features/ThemeProvider/ThemeProvider";

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="tw:h-[1.2rem] tw:w-[1.2rem] tw:scale-100 tw:rotate-0 tw:transition-all tw:dark:scale-0 tw:dark:-rotate-90" />
                    <Moon className="tw:absolute tw:h-[1.2rem] tw:w-[1.2rem] tw:scale-0 tw:rotate-90 tw:transition-all tw:dark:scale-100 tw:dark:rotate-0" />
                    <span className="tw:sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}