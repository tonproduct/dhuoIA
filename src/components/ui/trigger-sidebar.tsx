"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  MousePointerClick,
  Zap,
  Clock,
  Webhook,
  ClipboardList,
  GitBranch,
  MessageSquare,
  Search,
  ChevronRight,
  X,
} from "lucide-react"

type Trigger = {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  hasSubmenu?: boolean
}

const triggers: Trigger[] = [
  {
    id: "manual",
    icon: <MousePointerClick size={18} />,
    label: "Trigger manually",
    description: "Runs the flow on clicking a button. Good for getting started quickly",
  },
  {
    id: "app-event",
    icon: <Zap size={18} />,
    label: "On app event",
    description: "Runs the flow when something happens in an app like Telegram, Notion or Airtable",
    hasSubmenu: true,
  },
  {
    id: "schedule",
    icon: <Clock size={18} />,
    label: "On a schedule",
    description: "Runs the flow every day, hour, or custom interval",
  },
  {
    id: "webhook",
    icon: <Webhook size={18} />,
    label: "On webhook call",
    description: "Runs the flow on receiving an HTTP request",
  },
  {
    id: "form",
    icon: <ClipboardList size={18} />,
    label: "On form submission",
    description: "Generate webforms and pass their responses to the workflow",
  },
  {
    id: "workflow",
    icon: <GitBranch size={18} />,
    label: "When executed by another workflow",
    description: "Runs the flow when called by the Execute Workflow node",
  },
  {
    id: "chat",
    icon: <MessageSquare size={18} />,
    label: "On chat message",
    description: "Runs the flow when a user sends a chat message. For use with AI nodes",
  },
]

type TriggerSidebarProps = {
  onSelect?: (triggerId: string) => void
  onClose?: () => void
  className?: string
}

export function TriggerSidebar({ onSelect, onClose, className }: TriggerSidebarProps) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = triggers.filter(
    (t) =>
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  )

  function handleSelect(trigger: Trigger) {
    if (trigger.hasSubmenu) return
    setSelected(trigger.id)
    onSelect?.(trigger.id)
  }

  return (
    <div
      className={cn(
        "w-[300px] flex flex-col h-full bg-white border-r border-gray-200",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900 leading-snug">
              What triggers this workflow?
            </h2>
            <p className="text-[12px] text-gray-400 mt-1">
              A trigger is a step that starts your workflow
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="mt-0.5 p-1 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-gray-100">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-[13px] outline-none w-full bg-transparent text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto px-1 py-1">
        {filtered.map((trigger) => (
          <li key={trigger.id}>
            <button
              onClick={() => handleSelect(trigger)}
              className={cn(
                "w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-colors group",
                selected === trigger.id ? "bg-purple-50" : "hover:bg-gray-50"
              )}
            >
              {/* Ghost icon */}
              <div
                className={cn(
                  "shrink-0 mt-0.5 transition-colors",
                  selected === trigger.id
                    ? "text-purple-600"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              >
                {trigger.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-[13px] font-semibold leading-snug",
                    selected === trigger.id ? "text-purple-700" : "text-gray-800"
                  )}
                >
                  {trigger.label}
                </p>
                <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">
                  {trigger.description}
                </p>
              </div>

              {trigger.hasSubmenu && (
                <ChevronRight
                  size={15}
                  className={cn(
                    "shrink-0 mt-1 transition-colors",
                    selected === trigger.id ? "text-purple-400" : "text-gray-300 group-hover:text-gray-500"
                  )}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
