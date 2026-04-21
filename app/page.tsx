import { Button } from "@/components/ui/button"
import { Plus, ChevronDown } from "lucide-react"
import InvoiceCard from "@/features/invoices/components/InvoiceCard"
import { mockInvoices } from "@/features/invoices/data/invoice"

export default function Page() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-8 md:py-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
            Invoices
          </h1>
          <p className="mt-1 text-sm2 leading-0 text-secondary md:text-base">
            <span className="hidden md:inline">There are </span>7 invoices
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <button className="flex items-center gap-2 text-base2 font-bold md:text-base dark:text-white">
            <span>Filter</span>
            <ChevronDown className="h-4 w-4 text-invoice-purple" />
          </button>

          <Button className="flex h-[44px] w-[90px] items-center gap-2 rounded-full py-2 pl-2 hover:bg-invoice-purple-light">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <Plus className="h-2.5 w-2.5 text-invoice-purple" />
            </div>
            <span className="text-base2 font-bold text-white">New</span>
          </Button>
        </div>
      </div>

      {/* Invoice List */}
      <div className="flex flex-col gap-4">
        {mockInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  )
}
