"use client"

import { useState } from "react"
import { PlusCircle, PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const subTabs = ["Releases", "Implantações"] as const
type SubTab = (typeof subTabs)[number]

export function TabImplantacao() {
  const [subTab, setSubTab] = useState<SubTab>("Releases")

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      {/* Sub-tab bar */}
      <div
        className="shrink-0 flex items-center justify-between border-b px-5"
        style={{ height: 48, borderColor: "#e5e7eb" }}
      >
        <div className="flex items-center gap-5 h-full">
          {subTabs.map((t) => (
            <button
              key={t}
              onClick={() => setSubTab(t)}
              className="relative flex items-center h-full"
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
              {subTab === t && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#8e3ccb" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className={cn(
            "flex items-center gap-1.5 px-3 h-8 rounded text-sm font-semibold hover:opacity-90 transition-opacity",
          )}
          style={{ backgroundColor: "#14b8a6", color: "white", fontFamily: "Noto Sans, sans-serif" }}
        >
          <PlusCircle size={15} />
          Adicionar Release
        </button>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#fafafa" }}>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 80, height: 80, backgroundColor: "#f3f4f6" }}
        >
          <PackageOpen size={36} style={{ color: "#d1d5db" }} />
        </div>
        <div className="text-center">
          <p style={{ fontSize: 15, fontWeight: 600, color: "#374151", fontFamily: "Noto Sans, sans-serif" }}>
            Não há Releases criadas
          </p>
          <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", marginTop: 4 }}>
            Crie uma release para gerenciar versões desta integração
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 h-9 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#14b8a6", color: "white", fontFamily: "Noto Sans, sans-serif" }}
        >
          <PlusCircle size={15} />
          Adicionar Release
        </button>
      </div>
    </div>
  )
}
