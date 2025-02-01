import './main.css'
import { SideBarLayout } from "@/components/main/SideBar/layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <SideBarLayout>{children}</SideBarLayout>
  )
}

