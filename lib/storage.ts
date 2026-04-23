import { Invoice } from "@/features/invoices/types"

const INVOICES_KEY = "invoices"

// --- Invoices ---
export function getInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(INVOICES_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Invoice[]
  } catch {
    return []
  }
}

export function setInvoices(invoices: Invoice[]): void {
  try {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices))
  } catch {
    console.error("Failed to save invoices to localStorage")
  }
}
