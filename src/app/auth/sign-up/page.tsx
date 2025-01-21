'use client'
import ButtonHandler from '@/components/forms/sign-up/button-handlers'
import SignUpFormProvider from '@/components/forms/sign-up/form-provider'
import RegistrationFormStep from '@/components/forms/sign-up/registration-step'
import {useAuthuser} from '@/hooks/use-auth-user'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
const SignUp = () => {
  const [currentUser, setUser] = useState<Record<string, any>>();
  const router = useRouter();
  const {user,isLoading} = useAuthuser()
  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  if (currentUser) {
    router.push('/dashboard')
    return null
  }
  
  return (
    <div className="flex-1 py-28 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
        </SignUpFormProvider>
      </div>
    </div>
  )
}

export default SignUp
