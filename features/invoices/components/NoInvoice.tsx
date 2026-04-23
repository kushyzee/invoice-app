import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import EmailCampaign from "@/assets/svg/email-campaign.svg"

export default function NoInvoice() {
  return (
    <Empty className="hidden">
      <EmptyHeader className="gap-[42px]">
        <EmptyMedia className="w-[193px]">
          <EmailCampaign
            width={183}
            height={160}
            className="size-full object-contain"
          />
        </EmptyMedia>
        <EmptyTitle className="text-2xl font-bold">
          There is nothing here
        </EmptyTitle>
      </EmptyHeader>
      <EmptyContent className="block text-sm2 font-medium">
        Create an invoice by clicking the <strong>New</strong> button and get
        started
      </EmptyContent>
    </Empty>
  )
}
