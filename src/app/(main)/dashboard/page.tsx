'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from "aws-amplify/auth"
import { useRouter } from 'next/navigation'
import { handleAuthError } from '@/hooks/errors'


export default function Page() {
  const router = useRouter();
  const signout = async () => {
    try {
      await signOut()
      router.refresh();
      router.push("/auth/sign-in")
    } catch (err) {
      handleAuthError(err as Error, router)
    }
  }

  return (
    <Button onClick={() => signout()}>Sign Out</Button>
  )
}