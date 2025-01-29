import XorvaneLogo from "@/components/_components/XorvaneLogo"
import type React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full justify-center bg-neutral-900">
      <div className="w-[600px] ld:w-full  flex flex-col items-start p-6">
        <XorvaneLogo />
        {children}
      </div>
    </div>
  )
}

export default Layout

