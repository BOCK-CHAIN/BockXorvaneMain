'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { signOut } from "aws-amplify/auth"
import { useRouter } from 'next/navigation'
import { handleAuthError } from '@/hooks/errors'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthuser, useCurrentUser } from '@/hooks/use-auth-user'
import { addCognitoIdtoDb } from '@/actions/auth'
import Loader from '@/components/ui/loader/index'


export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading } = useCurrentUser()
  const { authUser } = useAuthuser();
  const [loading, setLoading] = useState(true);
  const [authCurrentUser, setAuthUser] = useState<Record<string, any>>();
  const [currentUser, setUser] = useState<Record<string, any>>();

  useEffect(() => {
    if (authUser) {
      setAuthUser(authUser)
    }
  }, [authUser])

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    setLoading(isLoading)
  }, [user, isLoading])
  console.log(user)

  async function addCognitoIdtoDbFn(email: string, userId: string) {
    await addCognitoIdtoDb(email, userId);
    await queryClient.invalidateQueries({
      queryKey: ["User"]
    })
  }

  if (currentUser && authCurrentUser && !currentUser.cognitoId) {
    addCognitoIdtoDbFn(currentUser.email, authCurrentUser.userId);
  }

  if (loading) {
    return <div className='h-screen w-screen justify-center items-center flex'>
      <Loader state color='purple' />
    </div>
  }
  if (!loading && !authUser) {
    return router.push('/auth/sign-in');
  }

  const signout = async () => {
    try {
      await signOut()
      await queryClient.invalidateQueries({
        queryKey: ["User"]
      })
      await queryClient.invalidateQueries({
        queryKey: ["AuthUser"]
      })
      router.push('/auth/sign-in');
    } catch (err) {
      handleAuthError(err as Error, router)
    }
  }

  return (
    <Button onClick={() => signout()}>Sign Out</Button>
  )
}