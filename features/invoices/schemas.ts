/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"

const requiredString = z.string().min(1, "can't be empty")

export const AddressSchema = z.object({
  street: requiredString,
  city: requiredString,
  postCode: requiredString,
  country: requiredString,
})

export const ItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "can't be empty"),
  quantity: z
    .number({ message: "can't be empty" })
    .min(1, "must be at least 1"),
  price: z.number({ message: "can't be empty" }).positive("must be positive"),
})

export const FormInvoiceSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.email("invalid email"),
  clientStreet: z.string().min(1, "can't be empty"),
  clientCity: z.string().min(1, "can't be empty"),
  clientPostCode: z.string().min(1, "can't be empty"),
  clientCountry: z.string().min(1, "can't be empty"),
  senderStreet: z.string().min(1, "can't be empty"),
  senderCity: z.string().min(1, "can't be empty"),
  senderPostCode: z.string().min(1, "can't be empty"),
  senderCountry: z.string().min(1, "can't be empty"),
  invoiceDate: z.string().min(1, "can't be empty"),
  paymentTerms: z.union([
    z.literal(1),
    z.literal(7),
    z.literal(14),
    z.literal(30),
  ]),
  description: z.string().min(1, "can't be empty"),
  items: z.array(ItemSchema).min(1, "- An item must be added"),
})

export const InvoiceSchema = FormInvoiceSchema.extend({
  paymentDue: z.string(),
  total: z.number(),
})

// Helper for TanStack form custom validation
export const validateWithZod = (schema: z.ZodTypeAny) => (value: any) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message
  }
  return undefined
}
