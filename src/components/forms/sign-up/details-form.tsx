import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { USER_SIGNUP_FORM } from '@/constants/forms'

type Props = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  watch?: UseFormWatch<FieldValues>; 
}

function AccountDetailsForm({ errors, register,watch }: Props) {
  return (
    <>
      <h2 className="text-gray-400 md:text-4xl font-bold">Account details</h2>
      <p className="text-gray-500 md:text-sm">Enter your email and password</p>
      {USER_SIGNUP_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          watch={watch}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  )
}

export default AccountDetailsForm
