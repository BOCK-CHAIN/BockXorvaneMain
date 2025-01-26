import XorvaneLogo from "@/components/_components/XorvaneLogo"
import type React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full justify-center bg-neutral-900">

      <div className="hidden lg:flex flex-1 w-full max-h-full bg-purple-50 max-w-4000px overflow-hidden relative  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-purple-800 md:text-4xl font-bold">Welcome to MultiPlatform SaaS: Your All-in-One Solution</h2>
        <p className="text-purple-700 md:text-sm mb-10">
          Discover the power of our integrated platforms. Streamline your workflow, boost productivity, and scale your
          business with our comprehensive suite of tools. Experience the future of software solutions!
        </p>
        <div className="flex justify-center items-center w-full h-full">
          {/* <Image
          src="/images/saas-interface.jpg"
          alt="MultiPlatform SaaS interface"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 w-[70%] h-[70%] top-56"
          width={0}
          height={0}
        /> */}
        </div>
      </div>
      <div className="w-[600px] ld:w-full  flex flex-col items-start p-6">
        <XorvaneLogo />
        {children}
      </div>
    </div>
  )
}

export default Layout

