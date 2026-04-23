"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteModalProps {
  open: boolean
  invoiceId: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteModal({
  open,
  invoiceId,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-md rounded-lg bg-white p-8 dark:bg-[#1E2139]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0C0E16] dark:text-white">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="mt-3 leading-relaxed text-[#888EB0] dark:text-[#DFE3FA]">
            Are you sure you want to delete invoice{" "}
            <span className="font-bold text-[#0C0E16] dark:text-white">
              #{invoiceId}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="rounded-full bg-[#F9FAFE] px-6 text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:hover:bg-[#373B53]"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-full bg-[#EC5757] px-6 text-white hover:bg-[#FF9797]"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
