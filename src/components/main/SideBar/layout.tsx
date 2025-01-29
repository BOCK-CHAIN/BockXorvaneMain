"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "./index"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useAuthuser, useCurrentUser } from "@/hooks/use-auth-user"
import { addCognitoIdtoDb } from "@/actions/auth"
import Loader from '@/components/ui/loader/index'

interface LayoutProps {
  children: React.ReactNode
}

export function SideBarLayout({ children }: LayoutProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { authUser } = useAuthuser()
  const { user, isLoading } = useCurrentUser()
  const [loading, setLoading] = useState(true)
  const [authCurrentUser, setAuthUser] = useState<Record<string, any> | null>(null)
  const [currentUser, setUser] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    if (authUser) {
      setAuthUser(authUser)
    }
  }, [authUser])

  useEffect(() => {
    if (user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null);
      setLoading(isLoading)
    }
  }, [user])

  useEffect(() => {
    if (currentUser && authCurrentUser && !currentUser.cognitoId) {
      addCognitoIdtoDbFn(currentUser.email, authCurrentUser.userId)
    }
  }, [currentUser, authCurrentUser])

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/')
    }
  }, [currentUser, loading, router])

  async function addCognitoIdtoDbFn(email: string, userId: string) {
    await addCognitoIdtoDb(email, userId)
    await queryClient.invalidateQueries({
      queryKey: ["User"]
    })
  }

  if (loading) {
    return (
      <div className='h-screen w-screen justify-center items-center flex'>
        <Loader state color='primary' />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 translate-x-0" 
          }`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-4 pl-20">
          {children}
        </div>
      </div>
    </div>
  )
}

