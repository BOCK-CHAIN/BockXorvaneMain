'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from "aws-amplify/auth"
import { useRouter } from 'next/navigation'

type Props = {}

export default function page({ }: Props) {
  const router = useRouter();
  const signout = async () => {
    try {
      await signOut()
      router.refresh();
      router.push("/auth/sign-in")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button onClick={() => signout()}>Sign Out</Button>
  )
}