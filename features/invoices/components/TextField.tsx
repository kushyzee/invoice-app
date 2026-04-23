/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

export type TextFieldProps = {
  field: any
  label: string
  type?: string
  className?: string
}

export default function TextField({
  field,
  label,
  type = "text",
  className,
}: TextFieldProps) {
  const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={field.name}>{label ?? field.name}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
