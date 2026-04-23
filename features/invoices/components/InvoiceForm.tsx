/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "@tanstack/react-form"
import { InvoiceFormData } from "../types"
import { FormInvoiceSchema } from "../schemas"
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import { Trash2, CalendarIcon } from "lucide-react"
import { formatCurrency } from "../utils/invoiceHelpers"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import TextField from "./TextField"
import TextSubField from "./TextSubField"
import { useInvoices } from "../context/InvoiceContext"

interface InvoiceFormProps {
  invoice?: InvoiceFormData
  invoiceId?: string
  onClose: () => void
}

export function InvoiceForm({ invoice, invoiceId, onClose }: InvoiceFormProps) {
  const { createInvoice, saveDraft, updateInvoice } = useInvoices()
  const isEdit = !!invoice

  const form = useForm({
    validators: {
      onBlur: FormInvoiceSchema,
    },
    defaultValues: invoice || {
      clientName: "",
      clientEmail: "",
      clientStreet: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      senderStreet: "",
      senderCity: "",
      senderPostCode: "",
      senderCountry: "",
      description: "",
      paymentTerms: 30 as const,
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      items: [],
    },
    onSubmit: async ({ value }) => {
      console.log("Form Submitted:", value)
      if (isEdit) {
        updateInvoice(invoiceId!, value)
      } else {
        createInvoice(value)
      }

      onClose()
    },
  })

  const handleSaveAsDraft = () => {
    console.log("Saved as Draft:", form.state.values)
    const value = form.state.values
    saveDraft(value)
    onClose()
  }

  return (
    <SheetContent
      side="left"
      className="flex w-full flex-col gap-0 border-0 p-0 md:w-[80%] md:rounded-r-3xl"
      showCloseButton={false}
    >
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 md:pt-14">
        <SheetHeader className="mb-10 p-0 text-left">
          <SheetTitle className="text-2xl font-bold">
            {isEdit ? (
              <>
                Edit <span className="text-invoice-secondary">#</span>
                AD7768
              </>
            ) : (
              "New Invoice"
            )}
          </SheetTitle>
        </SheetHeader>

        <form
          id="invoice-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-10"
        >
          {/* Bill From */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold text-invoice-purple">Bill From</h3>

            <form.Field name="senderStreet">
              {(field) => <TextField field={field} label="Street Address" />}
            </form.Field>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <form.Field name="senderCity">
                {(field) => <TextField field={field} label="City" />}
              </form.Field>
              <form.Field name="senderPostCode">
                {(field) => <TextField field={field} label="Post Code" />}
              </form.Field>
              <form.Field name="senderCountry">
                {(field) => (
                  <TextField
                    field={field}
                    label="Country"
                    className="col-span-2 sm:col-span-1"
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Bill To */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold text-invoice-purple">Bill To</h3>

            <form.Field name="clientName">
              {(field) => <TextField field={field} label="Client's Name" />}
            </form.Field>

            <form.Field name="clientEmail">
              {(field) => (
                <TextField field={field} label="Client's Email" type="email" />
              )}
            </form.Field>

            <form.Field name="clientStreet">
              {(field) => <TextField field={field} label="Street Address" />}
            </form.Field>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <form.Field name="clientCity">
                {(field) => <TextField field={field} label="City" />}
              </form.Field>
              <form.Field name="clientPostCode">
                {(field) => <TextField field={field} label="Post Code" />}
              </form.Field>
              <form.Field name="clientCountry">
                {(field) => (
                  <TextField
                    field={field}
                    label="Country"
                    className="col-span-2 sm:col-span-1"
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Date and Terms */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form.Field name="invoiceDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Invoice Date</FieldLabel>
                    <Popover>
                      <PopoverTrigger>
                        <div
                          className={cn(
                            "flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            !field.state.value && "text-muted-foreground",
                            isInvalid && "border-destructive"
                          )}
                          aria-invalid={isInvalid}
                        >
                          {field.state.value ? (
                            format(new Date(field.state.value), "dd MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 text-invoice-secondary" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.state.value
                              ? new Date(field.state.value)
                              : undefined
                          }
                          onSelect={(date) =>
                            field.handleChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="paymentTerms">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Payment Terms</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      onValueChange={(value) =>
                        field.handleChange(Number(value) as any)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-12 w-full font-bold",
                          isInvalid && "border-destructive"
                        )}
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Net 1 Day</SelectItem>
                        <SelectItem value="7">Net 7 Days</SelectItem>
                        <SelectItem value="14">Net 14 Days</SelectItem>
                        <SelectItem value="30">Net 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => <TextField field={field} label="Project Description" />}
          </form.Field>

          {/* Item List */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[#777F98]">Item List</h3>

            <form.Field name="items">
              {(field) => (
                <div className="flex flex-col gap-6">
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <div className="grid grid-cols-[1fr_64px_100px_min-content] items-end gap-4 md:grid-cols-[214px_64px_100px_1fr_min-content]">
                        {/* Item Name */}
                        <form.Field name={`items[${index}].name`}>
                          {(subField) => (
                            <TextSubField
                              field={subField}
                              index={index}
                              label="Item Name"
                            />
                          )}
                        </form.Field>

                        {/* Qty */}
                        <form.Field name={`items[${index}].quantity`}>
                          {(subField) => (
                            <TextSubField
                              field={subField}
                              index={index}
                              label="Qty."
                              type="number"
                              className="sm:col-span-1"
                            />
                          )}
                        </form.Field>

                        {/* Price */}
                        <form.Field name={`items[${index}].price`}>
                          {(subField) => (
                            <TextSubField
                              field={subField}
                              index={index}
                              label="Price"
                              type="number"
                              className="sm:col-span-1"
                            />
                          )}
                        </form.Field>

                        {/* Total (Calculated) */}
                        <Field>
                          {index === 0 && (
                            <div>
                              <FieldLabel>Total</FieldLabel>
                            </div>
                          )}
                          <FieldContent className="flex h-11 items-center font-bold">
                            {formatCurrency(
                              (field.state.value[index]?.quantity || 0) *
                                (field.state.value[index]?.price || 0)
                            )}
                          </FieldContent>
                        </Field>

                        {/* Delete Button */}
                        <div className="flex h-11 items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [...field.state.value]
                              newItems.splice(index, 1)
                              field.handleChange(newItems)
                            }}
                            className="text-invoice-secondary hover:text-destructive"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full rounded-full bg-slate-100 font-bold text-invoice-secondary hover:bg-slate-200 dark:bg-invoice-nav dark:text-white dark:hover:bg-invoice-dark"
                    onClick={() =>
                      field.pushValue({
                        id: `temp-${Date.now()}`,
                        name: "",
                        quantity: 1,
                        price: 0,
                      })
                    }
                  >
                    + Add New Item
                  </Button>

                  {field.state.meta.errors.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Spacer for mobile to push buttons down if needed */}
          <div className="h-10" />
        </form>
      </div>

      {/* Action Buttons Footer */}
      {/* On Mobile: fixed at bottom of sheet content. On desktop/tablet, also at bottom of sheet content. */}
      <div className="flex items-center justify-between rounded-t-2xl border-t border-invoice-secondary/10 bg-card px-6 py-5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:rounded-none md:rounded-br-2xl md:px-14 md:py-8">
        <SheetClose
          render={
            <Button
              type="button"
              variant="secondary"
              className="rounded-full bg-slate-100 px-6 font-bold text-invoice-secondary hover:bg-slate-200 dark:bg-invoice-nav dark:text-white dark:hover:bg-invoice-dark"
            >
              {isEdit ? "Cancel" : "Discard"}
            </Button>
          }
        />

        <div className="flex gap-2">
          {!isEdit && (
            <Button
              type="button"
              className="rounded-full bg-[#373B53] px-6 font-bold text-invoice-secondary hover:bg-[#0C0E16] dark:bg-invoice-dark dark:hover:bg-[#1E2139]"
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
          )}
          <Button
            type="submit"
            form="invoice-form"
            className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
          >
            {isEdit ? "Save Changes" : "Save & Send"}
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}
