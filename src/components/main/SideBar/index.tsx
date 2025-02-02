"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BadgePercent, User, ChevronLeft, ChevronRight, ArrowRightToLine, Landmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { signOut } from "@aws-amplify/auth"
import { useQueryClient } from "@tanstack/react-query"
import XorvaneLogo from "@/components/_components/XorvaneLogo"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Subscription", href: "/dashboard/subscription", icon: BadgePercent },
  { name: "Transactions", href: "/dashboard/transactions", icon: User },
  { name: "Profile", href: "/dashboard/profile", icon: Landmark },
]

export function Sidebar() {
  const router = useRouter();
  const queryclient = useQueryClient()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")
  const { theme } = useTheme()

  useEffect(() => {
    setIsCollapsed(isSmallScreen)
  }, [isSmallScreen])

  const isLightMode = theme === "light"

  return (
    <div
      className={cn(
        "flex flex-col border-r transition-all duration-300 ease-in-out h-screen",
        isCollapsed ? "w-16" : "w-52",
        isLightMode ? "bg-gray-50 border-gray-300" : "bg-card border-gray-700"
      )}
    >
      <div className="flex items-center justify-between p-2">
        <div className={cn("flex items-center gap-2", isCollapsed ? "hidden" : "justify-between")}> 
          <XorvaneLogo />
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(isCollapsed ? "self-center" : "", isLightMode ? "text-gray-800" : "text-muted-foreground")}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1 p-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                isActive
                  ? isLightMode ? "bg-gray-200 text-gray-900" : "bg-accent text-accent-foreground"
                  : isLightMode ? "text-gray-600 hover:bg-gray-300" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </div>
      <div className="p-2 mt-auto w-full">
        <Button variant={"ghost"} className="w-full" onClick={async () => {
          await signOut();
          await queryclient.invalidateQueries({ queryKey: ["User"] })
          await queryclient.invalidateQueries({ queryKey: ["AuthUser"] })
          router.push("/auth/sign-in")
        }}>
          <ArrowRightToLine className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
