"use client"

import { useState } from "react"
import { Search, HelpCircle, Info, MoreVertical, Copy, Link2, Zap } from "lucide-react"

const shortcuts = [
  { key: "Scroll do Mouse",  action: "Aumentar/diminuir Zoom"               },
  { key: "Ctrl + C",         action: "Copiar"                               },
  { key: "Ctrl + V",         action: "Colar"                                },
  { key: "Ctrl + D",         action: "Duplicar"                             },
  { key: "Delete",           action: "Apagar componente ou conexão"         },
  { key: "Shift + Arrastar", action: "Multi-seleção"                        },
  { key: "Ctrl + Click",     action: "Selecionar múltiplos componentes"     },
  { key: "Esc",              action: "Sair do Modo de Edição"               },
]

type Props = {
  onAddTrigger?: () => void
  triggerPanelOpen?: boolean
}

export function CanvasToolbar({ onAddTrigger, triggerPanelOpen }: Props) {
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  return (
    <div
      className="shrink-0 flex items-center justify-between border-b"
      style={{ height: 52, backgroundColor: "#f9fafb", borderColor: "#e5e7eb", paddingInline: 16 }}
    >
      {/* Left: trigger button + search + advanced toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAddTrigger}
          className="flex items-center gap-1.5 px-3 h-8 rounded text-xs font-semibold transition-colors shrink-0"
          style={{
            backgroundColor: triggerPanelOpen ? "#f3e8ff" : "#8e3ccb",
            color: triggerPanelOpen ? "#8e3ccb" : "white",
            border: triggerPanelOpen ? "1px solid #d8b4fe" : "1px solid transparent",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          <Zap size={13} />
          Trigger
        </button>
        <div
          className="flex items-center gap-2 rounded border bg-white px-3"
          style={{ width: 280, height: 36, borderColor: "#d1d5db", borderRadius: 6 }}
        >
          <input
            placeholder="Buscar componentes no canvas"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}
          />
          <Search size={15} style={{ color: "#d1d5db", flexShrink: 0 }} />
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle */}
          <button
            onClick={() => setAdvancedSearch(!advancedSearch)}
            className="flex items-center justify-center rounded-full transition-colors"
            style={{
              width: 36, height: 20,
              background: advancedSearch ? "#8e3ccb" : "#d1d5db",
              position: "relative",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                width: 14, height: 14, borderRadius: "50%",
                background: "white",
                left: advancedSearch ? 19 : 3,
                transition: "left 0.15s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </button>
          <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
            Busca Avançada
          </span>
          <Info size={14} style={{ color: "#d1d5db" }} />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 relative">
        <button
          className="flex items-center gap-1.5 px-3 h-8 rounded text-sm hover:bg-gray-100 transition-colors"
          style={{ color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}
        >
          <Copy size={14} />
          Duplicar
        </button>

        <button
          className="flex items-center gap-1.5 px-3 h-8 rounded text-sm font-semibold hover:bg-purple-50 transition-colors"
          style={{ color: "#8e3ccb", fontFamily: "Noto Sans, sans-serif" }}
        >
          <Link2 size={14} />
          Dependências
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
        >
          <MoreVertical size={16} style={{ color: "#6b7280" }} />
        </button>

        <button
          onClick={() => setShowShortcuts(!showShortcuts)}
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
        >
          <HelpCircle size={18} style={{ color: "#9ca3af" }} />
        </button>

        {/* Shortcuts popover */}
        {showShortcuts && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowShortcuts(false)}
            />
            <div
              className="absolute z-50 bg-white rounded-lg shadow-xl border overflow-hidden"
              style={{
                top: 36, right: 0,
                width: 380,
                borderColor: "#e5e7eb",
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
                  Atalhos de Teclado
                </span>
              </div>
              <table className="w-full">
                <tbody>
                  {shortcuts.map(({ key, action }) => (
                    <tr key={key} className="border-b last:border-0" style={{ borderColor: "#f3f4f6" }}>
                      <td className="py-2 px-4" style={{ width: 170 }}>
                        <code
                          className="rounded px-2 py-0.5 text-xs"
                          style={{ background: "#f3f4f6", color: "#374151", fontFamily: "monospace" }}
                        >
                          {key}
                        </code>
                      </td>
                      <td className="py-2 px-4">
                        <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
                          {action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
