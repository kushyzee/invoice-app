"use client"

import StatusBadge from "./StatusBadge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "../utils/invoiceHelpers"
import { useInvoices } from "../context/InvoiceContext"
import { useRouter } from "next/navigation"
import ModalTrigger from "./ModalTrigger"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"

export default function InvoicePageCard({ id }: { id: string }) {
  const { getInvoiceById, deleteInvoice, markAsPaid, sendInvoice } =
    useInvoices()
  const router = useRouter()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const invoice = getInvoiceById(id)

  if (!invoice) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16">
        <h2 className="text-xl font-bold">Invoice not found</h2>
      </div>
    )
  }

  function handleDelete() {
    deleteInvoice(invoice!.id)
    router.push("/")
  }

  function handleMarkAsPaid() {
    markAsPaid(invoice!.id)
  }

  function handleSend() {
    sendInvoice(invoice!.id)
  }

  const isPaid = invoice.status === "paid"
  const isPending = invoice.status === "pending"
  const isDraft = invoice.status === "draft"

  return (
    <div className="flex flex-col gap-5">
      {/* Status Bar */}
      <div className="flex items-center justify-between rounded-xl bg-card p-6 shadow-sm">
        <div className="flex w-full items-center justify-between md:w-auto md:gap-4">
          <span className="text-sm text-invoice-grey">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {!isPaid && (
            <ModalTrigger
              buttonText="Edit"
              invoice={invoice}
              invoiceId={invoice.id}
            />
          )}
          <Button
            variant="destructive"
            className="rounded-full px-6 font-bold"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
          {isDraft && (
            <Button
              className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
              onClick={handleSend}
            >
              Send
            </Button>
          )}
          {isPending && (
            <Button
              className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
              onClick={handleMarkAsPaid}
            >
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Main Card */}
      <div className="flex flex-col gap-10 rounded-xl bg-card p-6 shadow-sm md:p-12">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold md:text-lg">
              <span className="text-invoice-grey">#</span>
              {invoice.id}
            </h1>
            <span className="text-sm text-invoice-grey">
              {invoice.description}
            </span>
          </div>
          <div className="flex flex-col text-sm text-invoice-grey md:text-right">
            <span>{invoice.senderStreet}</span>
            <span>{invoice.senderCity}</span>
            <span>{invoice.senderPostCode}</span>
            <span>{invoice.senderCountry}</span>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-sm text-invoice-grey">Invoice Date</span>
              <span className="font-bold md:text-lg">
                {formatDate(invoice.invoiceDate)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-invoice-grey">Payment Due</span>
              <span className="font-bold md:text-lg">
                {formatDate(invoice.paymentDue)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm text-invoice-grey">Bill To</span>
            <span className="font-bold md:text-lg">{invoice.clientName}</span>
            <div className="mt-1 flex flex-col text-sm text-invoice-grey">
              <span>{invoice.clientStreet}</span>
              <span>{invoice.clientCity}</span>
              <span>{invoice.clientPostCode}</span>
              <span>{invoice.clientCountry}</span>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-3 md:col-start-3 md:row-start-1">
            <span className="text-sm text-invoice-grey">Sent to</span>
            <span className="font-bold md:text-lg">{invoice.clientEmail}</span>
          </div>
        </div>

        {/* Items Section */}
        <div className="mt-4 overflow-hidden rounded-xl bg-[#F9FAFE] dark:bg-invoice-nav">
          <div className="p-6 md:p-8">
            {/* Desktop Header */}
            <div className="mb-8 hidden text-sm text-invoice-grey md:grid md:grid-cols-5">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {/* Item Rows */}
            <div className="flex flex-col gap-6">
              {invoice.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between md:grid md:grid-cols-5 md:items-center"
                >
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-bold text-invoice-grey md:hidden">
                      {item.quantity} x {formatCurrency(item.price)}
                    </span>
                  </div>
                  <span className="hidden text-center font-bold text-invoice-grey md:block">
                    {item.quantity}
                  </span>
                  <span className="hidden text-right font-bold text-invoice-grey md:block">
                    {formatCurrency(item.price)}
                  </span>

                  <span className="text-right font-bold">
                    {formatCurrency(item.quantity * item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Total */}
          <div className="flex items-center justify-between bg-sidebar p-6 text-white md:px-8 md:py-6">
            <span className="text-sm">Grand Total</span>
            <span className="text-2xl font-bold md:text-3xl">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Actions Bar - Fixed at bottom */}
      <div className="shadow- fixed right-0 bottom-0 left-0 flex items-center justify-center gap-2 bg-card p-6 md:hidden">
        {!isPaid && (
          <ModalTrigger
            buttonText="Edit"
            invoice={invoice}
            invoiceId={invoice.id}
          />
        )}

        <Button
          size="lg"
          className="rounded-full bg-destructive px-6 font-bold"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </Button>
        {isDraft && (
          <Button
            className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
            onClick={handleSend}
          >
            Send
          </Button>
        )}
        {isPending && (
          <Button
            size="lg"
            className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
            onClick={handleMarkAsPaid}
          >
            Mark as Paid
          </Button>
        )}
      </div>

      <DeleteModal
        open={showDeleteModal}
        invoiceId={invoice.id}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}
