import './main.css'
import { SideBarLayout } from "@/components/main/SideBar/layout"
import { LoaingContextProvider } from "@/context/use-loading-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoaingContextProvider>
      <SideBarLayout>{children}</SideBarLayout>
    </LoaingContextProvider>
  )
}

