"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BadgePercent, User, ChevronLeft, ChevronRight, ArrowRightToLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { signOut } from "@aws-amplify/auth"
import { useQueryClient } from "@tanstack/react-query"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Subscription", href: "/dashboard/subscription", icon: BadgePercent },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function Sidebar() {
  const router = useRouter();
  const queryclient = useQueryClient()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsCollapsed(isSmallScreen)
  }, [isSmallScreen])

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r transition-all duration-300 ease-in-out h-screen  ",
        isCollapsed ? "w-16" : "w-52"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn("mt-2", isCollapsed ? "self-center" : "self-end")}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
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
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
          await queryclient.invalidateQueries({
            queryKey: ["User"]
          })
          await queryclient.invalidateQueries({
            queryKey: ["AuthUser"]
          })
          router.push("/auth/sign-in")
        }}>
          <ArrowRightToLine className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
