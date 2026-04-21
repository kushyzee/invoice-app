import React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "paid" | "pending" | "draft"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    paid: "bg-invoice-paid/10 text-invoice-paid",
    pending: "bg-invoice-pending/10 text-invoice-pending",
    draft:
      "bg-invoice-draft/10 text-invoice-draft dark:bg-invoice-draft/10 dark:text-invoice-draft",
  }

  const dotStyles = {
    paid: "bg-invoice-paid",
    pending: "bg-invoice-pending",
    draft: "bg-invoice-draft",
  }

  return (
    <div
      className={cn(
        "flex w-[104px] items-center justify-center gap-2 rounded-md py-3 text-base2 font-bold capitalize",
        statusStyles[status]
      )}
    >
      <div className={cn("h-2 w-2 rounded-full", dotStyles[status])} />
      {status}
    </div>
  )
}
