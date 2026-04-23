/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

export type TextSubFieldProps = {
  field: any
  index: number
  label: string
  type?: "text" | "number"
  className?: string
}

export default function TextSubField({
  field,
  index,
  label,
  type = "text",
  className,
}: TextSubFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field
      data-invalid={isInvalid}
      className={className ?? "col-span-4 sm:col-span-4 md:col-span-1"}
    >
      {index === 0 && (
        <div className="hidden md:block">
          <FieldLabel>{label}</FieldLabel>
        </div>
      )}
      <div className="md:hidden">
        <FieldLabel>{label}</FieldLabel>
      </div>
      <Input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={
          type === "text"
            ? (e) => field.handleChange(e.target.value)
            : (e) => field.handleChange(Number(e.target.value))
        }
        type={type}
        aria-invalid={isInvalid}
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors as any} />}
    </Field>
  )
}
