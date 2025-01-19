'use client'
import { useAuthContextHook } from '@/context/use-auth-context'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
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

const RegistrationFormStep = () => {
    const {
        register,
        formState: { errors },
        setValue,
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

    return <div>RegistrationFormStep</div>
}

export default RegistrationFormStep
