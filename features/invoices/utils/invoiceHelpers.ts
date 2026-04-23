import { InvoiceItem } from "../types"

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount)
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function calculateTotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}
