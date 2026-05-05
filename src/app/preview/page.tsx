import { TriggerSidebar } from "@/components/ui/trigger-sidebar"

export default function PreviewPage() {
  return (
    <div className="flex h-screen bg-gray-100 items-start justify-center pt-16">
      <div className="h-[580px] rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <TriggerSidebar />
      </div>
    </div>
  )
}
