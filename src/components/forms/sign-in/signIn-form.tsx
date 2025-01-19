'use client'
import React from 'react'
import { FieldErrors, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { USER_LOGIN_FORM } from '@/constants/forms'

function SignInDetailForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <h2 className="text-gray-400 md:text-4xl font-bold">Account details</h2>
            <p className="text-gray-500 md:text-sm">Enter your email and password</p>
            {USER_LOGIN_FORM.map((field) => (
                <FormGenerator
                    key={field.id}
                    {...field}
                    errors={errors}
                    register={register}
                    name={field.name}
                />
            ))}
        </>
    )
}

export default SignInDetailForm
