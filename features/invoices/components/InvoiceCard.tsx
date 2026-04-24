import { Invoice } from "../types"
import StatusBadge from "./StatusBadge"
import { formatCurrency, formatDate } from "../utils/invoiceHelpers"
import { ChevronRight } from "lucide-react"

interface InvoiceCardProps {
  invoice: Invoice
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <div className="group flex cursor-pointer flex-col gap-6 rounded-xl border border-transparent bg-card p-6 shadow-sm transition-all hover:border-invoice-purple md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="flex items-center justify-between md:w-1/3 md:justify-start md:gap-8">
        <h2 className="text-base2 font-bold">
          <span className="text-secondary">#</span>
          {invoice.id}
        </h2>
        <span className="text-sm2 text-secondary">{invoice.clientName}</span>
      </div>

      <div className="flex items-center justify-between md:w-5/12 md:justify-end md:gap-8 lg:w-3/4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
          <span className="text-sm2 font-medium text-secondary">
            Due {formatDate(invoice.paymentDue)}
          </span>
          <span className="text-base2 font-bold">
            {formatCurrency(invoice.total)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={invoice.status} />
        </div>
        <ChevronRight className="hidden text-secondary lg:block" />
      </div>
    </div>
  )
}
