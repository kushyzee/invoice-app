import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import InvoicePageCard from "@/features/invoices/components/InvoicePageCard"

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

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

      <InvoicePageCard id={id} />
    </div>
  )
}
