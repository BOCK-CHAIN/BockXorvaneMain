import SignInFormProvider from '@/components/forms/sign-in/form-provider'
import SignInDetailForm from '@/components/forms/sign-in/signIn-form'
import ButtonHandler from '@/components/forms/sign-up/button-handlers'
import SignUpFormProvider from '@/components/forms/sign-up/form-provider'
import RegistrationFormStep from '@/components/forms/sign-up/registration-step'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'
const SignIn = () => {
  return (
    <div className="flex-1 py-24 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <SignInDetailForm />
            <div className="w-full flex flex-col gap-3 items-center text-green-700">
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-300"
              >
                Sign In
              </Button>
              <p className="text-gray-500 ">
                Don't have an account?
                <Link href="/auth/sign-up" className="font-bold text-gray-400">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  )
}

export default SignIn
