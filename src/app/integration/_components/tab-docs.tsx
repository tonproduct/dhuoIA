"use client"

import { useState } from "react"
import { BotMessageSquare, Eye, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const subTabs = ["Documentação", "Releases"] as const
type SubTab = (typeof subTabs)[number]
type EditMode = "markdown" | "visual" | "chat"

export function TabDocumentacao() {
  const [subTab, setSubTab] = useState<SubTab>("Documentação")
  const [mode, setMode] = useState<EditMode>("markdown")

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      {/* Sub-tab bar */}
      <div
        className="shrink-0 flex items-center border-b px-5 gap-5"
        style={{ height: 48, borderColor: "#e5e7eb" }}
      >
        {subTabs.map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className="relative flex items-center h-full gap-2"
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: subTab === t ? 700 : 400,
                color: subTab === t ? "#8e3ccb" : "#6b7280",
                fontFamily: "Noto Sans, sans-serif",
              }}
            >
              {t}
            </span>
            {t === "Documentação" && (
              <span
                className="rounded px-1.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: "#f3e8ff", color: "#8e3ccb", fontSize: 10 }}
              >
                Corrente
              </span>
            )}
            {subTab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: "#8e3ccb" }}
              />
            )}
          </button>
        ))}
      </div>

      {subTab === "Documentação" && (
        <>
          {/* Editor mode selector */}
          <div
            className="shrink-0 flex items-center gap-1 border-b px-5"
            style={{ height: 44, borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }}
          >
            {([
              { key: "markdown", label: "Markdown",      icon: <Code2 size={13} />     },
              { key: "visual",   label: "Editor Visual",  icon: <Eye size={13} />       },
              { key: "chat",     label: "Chat IA",        icon: <BotMessageSquare size={13} /> },
            ] as const).map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-7 rounded text-xs font-medium transition-colors",
                  mode === key ? "text-white" : "text-gray-500 hover:bg-gray-100"
                )}
                style={{
                  backgroundColor: mode === key ? "#8e3ccb" : "transparent",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto p-6">
            <textarea
              placeholder="Escreva a documentação em Markdown..."
              className="w-full h-full resize-none outline-none text-sm bg-transparent"
              style={{ color: "#374151", fontFamily: "monospace", fontSize: 13, minHeight: 300 }}
            />
          </div>
        </>
      )}

      {subTab === "Releases" && (
        <div className="flex-1 flex items-center justify-center">
          <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
            Nenhuma release registrada
          </p>
        </div>
      )}
    </div>
  )
}
