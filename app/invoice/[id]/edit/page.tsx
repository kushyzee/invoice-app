"use client"

import { use } from "react"
import { InvoiceForm } from "@/features/invoices/components/InvoiceForm"
import { mockInvoices } from "@/features/invoices/data/invoice"

export default function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const invoice = mockInvoices.find((i) => i.id === id)

  if (!invoice) {
    return <div>Invoice not found</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl px-6 py-8 md:py-16">
      <InvoiceForm invoice={invoice} />
    </div>
  )
}
