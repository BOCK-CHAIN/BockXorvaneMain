'use client'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { USER_LOGIN_FORM } from '@/constants/forms'
import { useAuthContextHook } from '@/context/use-auth-context'
import AccountDetailsForm from './details-form'
import dynamic from 'next/dynamic'
import { Spinner } from '@/components/ui/spinner'

const DetailForm = dynamic(() => import('./details-form'), {
    ssr: false,
    loading: () => <Spinner />,
})

const OTPForm = dynamic(() => import('./otp-form'), {
    ssr: false,
    loading: () => <Spinner />,
})

function SignInDetailForm() {
    const {
        register,
        formState: { errors },
        setValue
    } = useFormContext()
    const { currentStep } = useAuthContextHook()
    const [onOTP, setOnOTP] = useState<string>('')
    setValue('otp', onOTP)

    switch (currentStep) {
        case 1:
            return (
                <DetailForm
                    errors={errors}
                    register={register}
                />
            )
        case 2:
            return (
                <OTPForm
                    onOTP={onOTP}
                    setOTP={setOnOTP}
                />
            )
    }
}

export default SignInDetailForm
