'use client'
import ButtonHandler from '@/components/forms/sign-in/button-handlers'
import SignInFormProvider from '@/components/forms/sign-in/form-provider'
import SignInDetailForm from '@/components/forms/sign-in/signIn-form'
import { Loader } from '@/components/ui/loader'
import { useAuthuser } from '@/hooks/use-auth-user'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
const SignIn = () => {
  const [currentUser, setUser] = useState<Record<string, any>>();
  const router = useRouter();
  const { user } = useAuthuser()
  
  console.log(user)
  console.log(currentUser)

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user])

  if (currentUser) {
    router.push('/dashboard')
    return null
  }
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <SignInDetailForm />
            <ButtonHandler />
          </div>
        </SignInFormProvider>
      </div>
    </div>
  )
}

export default SignIn
