import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Invoice } from "../types"
import { InvoiceForm } from "./InvoiceForm"
import { Plus } from "lucide-react"

interface ModalTriggerProps {
  buttonText: "Edit" | "New"
  invoice?: Invoice
  invoiceId?: string
}
export default function ModalTrigger({
  buttonText,
  invoice,
  invoiceId,
}: ModalTriggerProps) {
  const isEdit = buttonText === "Edit"

  const [formOpen, setFormOpen] = useState(false)

  const onClose = () => {
    setFormOpen(false)
  }

  return (
    <Sheet open={formOpen} onOpenChange={setFormOpen}>
      <SheetTrigger
        onClick={() => {
          setFormOpen(true)
        }}
        render={
          isEdit ? (
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full bg-slate-100 px-6 font-bold text-invoice-secondary hover:bg-slate-200 dark:bg-invoice-nav dark:text-white dark:hover:bg-invoice-dark"
            >
              {buttonText}
            </Button>
          ) : (
            <Button className="flex h-11 w-22.5 items-center gap-2 rounded-full py-2 pl-2 hover:bg-invoice-purple-light">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <Plus className="h-2.5 w-2.5 text-invoice-purple" />
              </div>
              <span className="text-base2 font-bold text-white">New</span>
            </Button>
          )
        }
      ></SheetTrigger>
      {isEdit ? (
        <InvoiceForm
          invoice={invoice}
          invoiceId={invoiceId}
          onClose={onClose}
        />
      ) : (
        <InvoiceForm onClose={onClose} />
      )}
    </Sheet>
  )
}
