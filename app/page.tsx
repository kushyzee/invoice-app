"use client"

import Link from "next/link"
import InvoiceCard from "@/features/invoices/components/InvoiceCard"
import NoInvoice from "@/features/invoices/components/NoInvoice"
import { useInvoices } from "@/features/invoices/context/InvoiceContext"
import ModalTrigger from "@/features/invoices/components/ModalTrigger"
import { useState } from "react"
import {
  FilterDropdown,
  FilterStatus,
} from "@/features/invoices/components/FilterDropdown"

export default function Page() {
  const { invoices } = useInvoices()
  const [filter, setFilter] = useState<FilterStatus>("all")

  const filtered =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter)

  const countLabel =
    invoices.length === 0
      ? "No invoices"
      : `${filtered.length} ${filtered.length === 1 ? "invoice" : "invoices"}`

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-8 md:py-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
            Invoices
          </h1>
          <p className="mt-1 text-sm2 leading-0 text-secondary md:text-base">
            <span className="hidden md:inline">There are </span>
            {countLabel}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <FilterDropdown value={filter} onChange={setFilter} />

          <ModalTrigger buttonText="New" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <NoInvoice />
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((invoice) => (
            <Link key={invoice.id} href={`/invoice/${invoice.id}`}>
              <InvoiceCard invoice={invoice} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
