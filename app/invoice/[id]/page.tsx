import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import StatusBadge from "@/features/invoices/components/StatusBadge"
import { mockInvoices } from "@/features/invoices/data/invoice"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/features/invoices/utils/invoiceHelpers"

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const invoice = mockInvoices.find((i) => i.id === id) || mockInvoices[1]

  // Format dates
  const invoiceDate = new Date(invoice.invoiceDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )
  const paymentDue = new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pt-8 pb-32 md:gap-8 md:py-16 md:pb-16">
      {/* Go back */}
      <Link
        href="/"
        className="mb-2 flex items-center gap-4 text-sm font-bold hover:text-invoice-grey"
      >
        <ChevronLeft className="h-4 w-4 text-invoice-purple" />
        Go back
      </Link>

      {/* Status Bar */}
      <div className="flex items-center justify-between rounded-xl bg-card p-6 shadow-sm">
        <div className="flex w-full items-center justify-between md:w-auto md:gap-4">
          <span className="text-sm text-invoice-grey">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href={`/invoice/${invoice.id}/edit`}>
            <Button
              variant="secondary"
              className="rounded-full bg-slate-100 px-6 font-bold text-invoice-secondary hover:bg-slate-200 dark:bg-invoice-nav dark:text-white dark:hover:bg-invoice-dark"
            >
              Edit
            </Button>
          </Link>
          <Button variant="destructive" className="rounded-full px-6 font-bold">
            Delete
          </Button>
          <Button className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light">
            Mark as Paid
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex flex-col gap-10 rounded-xl bg-card p-6 shadow-sm md:p-12">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-bold md:text-lg">
              <span className="text-invoice-grey">#</span>
              {invoice.id}
            </span>
            <span className="text-sm text-invoice-grey">
              {invoice.description}
            </span>
          </div>
          <div className="flex flex-col text-sm text-invoice-grey md:text-right">
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-sm text-invoice-grey">Invoice Date</span>
              <span className="font-bold md:text-lg">{invoiceDate}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-invoice-grey">Payment Due</span>
              <span className="font-bold md:text-lg">{paymentDue}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm text-invoice-grey">Bill To</span>
            <span className="font-bold md:text-lg">{invoice.clientName}</span>
            <div className="mt-1 flex flex-col text-sm text-invoice-grey">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
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
        <Link href={`/invoice/${invoice.id}/edit`}>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full bg-slate-100 px-6 font-bold text-invoice-grey hover:bg-slate-200 dark:bg-invoice-nav dark:hover:bg-invoice-dark"
          >
            Edit
          </Button>
        </Link>
        <Button
          size="lg"
          className="rounded-full bg-destructive px-6 font-bold"
        >
          Delete
        </Button>
        <Button
          size="lg"
          className="rounded-full bg-invoice-purple px-6 font-bold hover:bg-invoice-purple-light"
        >
          Mark as Paid
        </Button>
      </div>
    </div>
  )
}

// I just realized that the mobile design image didn't upload, so there's a problem with the UI on mobile but I have attached the image now. Also, the other image is actually for Tablet, not desktop, and lastly, the Edit and Delete buttons on Tablet shouldn't be fixed, so make those changes
