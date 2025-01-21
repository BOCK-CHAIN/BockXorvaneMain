'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from "aws-amplify/auth"
import { useRouter } from 'next/navigation'
import { handleAuthError } from '@/hooks/errors'
import { useQueryClient } from '@tanstack/react-query'


export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signout = async () => {
    try {
      await signOut()
      await queryClient.invalidateQueries({
        queryKey:["User"]
      })
      router.refresh();
    } catch (err) {
      handleAuthError(err as Error, router)
    }
  }

  return (
    <Button onClick={() => signout()}>Sign Out</Button>
  )
}