"use client"

import { ChevronDown, PlusCircle, Copy, Link2, MoreVertical } from "lucide-react"

function VersionSelect({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
      <button
        className="flex items-center gap-1 rounded border px-2 h-6 bg-white hover:border-gray-300 transition-colors"
        style={{ borderColor: "#e5e7eb" }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
          {value}
        </span>
        <ChevronDown size={12} style={{ color: "#6b7280" }} />
      </button>
    </div>
  )
}

export function IntegrationHeader() {
  return (
    <header
      className="shrink-0 flex items-center justify-between border-b"
      style={{ height: 56, backgroundColor: "#ffffff", borderColor: "#e5e7eb", paddingInline: 20 }}
    >
      {/* Left: name + versions */}
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Nome da Integração
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111827", fontFamily: "Noto Sans, sans-serif", lineHeight: 1 }}>
            1111111
          </span>
        </div>

        <div className="flex items-end gap-2">
          <VersionSelect label="Principal" value="v2" />
          <VersionSelect label="Secundária" value="v2.0.0" />
        </div>

        <button
          className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
          style={{ color: "#14b8a6", fontFamily: "Noto Sans, sans-serif" }}
        >
          <PlusCircle size={15} />
          Nova versão
        </button>
      </div>

      {/* Right: meta + actions */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Categoria
          </span>
          <span
            className="inline-flex items-center rounded border px-2 py-0.5 text-xs"
            style={{ color: "#6b7280", borderColor: "#d1d5db", fontFamily: "Noto Sans, sans-serif" }}
          >
            Sem categoria
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Criado por
          </span>
          <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
            Fernanda Bianchini :)
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Data de criação
          </span>
          <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
            23/01/2026
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded text-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#6b7280", fontFamily: "Noto Sans, sans-serif", border: "1px solid #e5e7eb" }}
          >
            <Copy size={14} />
            Duplicar
          </button>
          <button
            className="flex items-center gap-1.5 px-3 h-8 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ color: "#8e3ccb", fontFamily: "Noto Sans, sans-serif", border: "1px solid #e5e7eb" }}
          >
            <Link2 size={14} />
            Dependências
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-50 transition-colors"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <MoreVertical size={16} style={{ color: "#6b7280" }} />
          </button>
        </div>
      </div>
    </header>
  )
}
