"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react"
import { Invoice, InvoiceFormData } from "@/features/invoices/types"
import { getInvoices, setInvoices } from "@/lib/storage"

// --- Helpers ---

function generateId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)]
  const randomNumbers = Math.floor(1000 + Math.random() * 9000)
  return `${randomLetters}${randomNumbers}`
}

function calculateTotal(items: Invoice["items"]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}

function calculatePaymentDue(
  invoiceDate: string,
  paymentTerms: number
): string {
  const date = new Date(invoiceDate)
  date.setDate(date.getDate() + paymentTerms)
  return date.toISOString()
}

// --- Types ---

interface InvoiceContextValue {
  invoices: Invoice[]
  createInvoice: (data: InvoiceFormData) => Invoice
  saveDraft: (data: InvoiceFormData) => Invoice
  updateInvoice: (id: string, data: InvoiceFormData) => void
  deleteInvoice: (id: string) => void
  markAsPaid: (id: string) => void
  sendInvoice: (id: string) => void // draft -> pending
  getInvoiceById: (id: string) => Invoice | undefined
}

// --- Context ---

const InvoiceContext = createContext<InvoiceContextValue | null>(null)

// --- Provider ---

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoicesState] = useState<Invoice[]>(() => getInvoices())

  // Persist to localStorage whenever state changes
  useEffect(() => {
    setInvoices(invoices)
  }, [invoices])

  const createInvoice = useCallback((data: InvoiceFormData): Invoice => {
    const invoice: Invoice = {
      ...data,
      id: generateId(),
      status: "pending",
      total: calculateTotal(data.items),
      paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms),
    }
    setInvoicesState((prev) => [...prev, invoice])
    return invoice
  }, [])

  const saveDraft = useCallback((data: InvoiceFormData): Invoice => {
    const invoice: Invoice = {
      ...data,
      id: generateId(),
      status: "draft",
      total: calculateTotal(data.items),
      paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms),
    }
    setInvoicesState((prev) => [...prev, invoice])
    return invoice
  }, [])

  const updateInvoice = useCallback((id: string, data: InvoiceFormData) => {
    setInvoicesState((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv

        // Paid invoices cannot be edited
        if (inv.status === "paid") return inv

        return {
          ...inv,
          ...data,
          total: calculateTotal(data.items),
          paymentDue: calculatePaymentDue(data.invoiceDate, data.paymentTerms),
        }
      })
    )
  }, [])

  const deleteInvoice = useCallback((id: string) => {
    setInvoicesState((prev) => prev.filter((inv) => inv.id !== id))
  }, [])

  const markAsPaid = useCallback((id: string) => {
    setInvoicesState((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv
        // Only pending invoices can be marked as paid
        if (inv.status !== "pending") return inv
        return { ...inv, status: "paid" }
      })
    )
  }, [])

  const sendInvoice = useCallback((id: string) => {
    setInvoicesState((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv
        // Only drafts can be sent
        if (inv.status !== "draft") return inv
        return { ...inv, status: "pending" }
      })
    )
  }, [])

  const getInvoiceById = useCallback(
    (id: string) => invoices.find((inv) => inv.id === id),
    [invoices]
  )

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        createInvoice,
        saveDraft,
        updateInvoice,
        deleteInvoice,
        markAsPaid,
        sendInvoice,
        getInvoiceById,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}

// --- Hook ---

export function useInvoices(): InvoiceContextValue {
  const ctx = useContext(InvoiceContext)
  if (!ctx) {
    throw new Error("useInvoices must be used inside <InvoiceProvider>")
  }
  return ctx
}
