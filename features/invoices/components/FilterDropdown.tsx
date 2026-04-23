"use client"

import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Invoice } from "@/features/invoices/types"
import { cn } from "@/lib/utils"

export type FilterStatus = Invoice["status"] | "all"

const OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
]

interface FilterDropdownProps {
  value: FilterStatus
  onChange: (value: FilterStatus) => void
}

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 font-bold text-[#0C0E16] transition-colors outline-none hover:text-[#7C5DFA] dark:text-white">
            <span className="hidden sm:inline">Filter by status</span>
            <span className="sm:hidden">Filter</span>
            <ChevronDown className="size-4 text-[#7C5DFA] transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="flex w-48 flex-col gap-3 rounded-lg border-0 bg-white p-4 shadow-xl dark:bg-[#252945]"
      >
        {OPTIONS.map((option) => {
          const checked = value === option.value
          return (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {/* Custom checkbox visual */}
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-sm border-2 transition-colors",
                  checked
                    ? "border-[#7C5DFA] bg-[#7C5DFA]"
                    : "border-[#DFE3FA] group-hover:border-[#7C5DFA] dark:border-[#4E567E]"
                )}
              >
                {checked && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="text-sm font-bold text-[#0C0E16] dark:text-white">
                {option.label}
              </span>
            </label>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
