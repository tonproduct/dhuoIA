"use client"

import { useState } from "react"
import { Copy, ChevronDown, ExternalLink, Trash2 } from "lucide-react"

const versions = [
  { name: "v2.0.0", date: "23/01/2026", description: "Versão atual" },
  { name: "v1.0.0", date: "23/01/2026", description: "Versão inicial" },
]

export function TabConfiguracao() {
  const [reutilizavel, setReutilizavel] = useState(true)
  const [copied, setCopied] = useState(false)
  const integrationId = "a3f9c1d2-8b4e-4f22-9c7a-5e6d3b2f1a09"

  function copyId() {
    navigator.clipboard.writeText(integrationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex-1 overflow-auto bg-white p-8">
      <div style={{ maxWidth: 620 }}>

        {/* Visão Geral */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", fontFamily: "Noto Sans, sans-serif", marginBottom: 20 }}>
          Visão Geral
        </h2>

        <div className="flex flex-col gap-5">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Nome da Integração
            </label>
            <input
              defaultValue="1111111"
              readOnly
              className="rounded border px-3 h-10 bg-gray-50 text-sm"
              style={{ borderColor: "#e5e7eb", color: "#111827", fontFamily: "Noto Sans, sans-serif" }}
            />
          </div>

          {/* ID */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              ID da Integração
            </label>
            <div className="flex items-center gap-2">
              <input
                value={integrationId}
                readOnly
                className="flex-1 rounded border px-3 h-10 bg-gray-50 text-sm font-mono"
                style={{ borderColor: "#e5e7eb", color: "#6b7280", fontFamily: "monospace", fontSize: 12 }}
              />
              <button
                onClick={copyId}
                className="flex items-center gap-1.5 px-3 h-10 rounded border text-sm hover:bg-gray-50 transition-colors"
                style={{ borderColor: "#e5e7eb", color: "#6b7280", fontFamily: "Noto Sans, sans-serif", whiteSpace: "nowrap" }}
              >
                <Copy size={14} />
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>

          {/* Categorias */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Categorias
            </label>
            <button
              className="flex items-center justify-between rounded border px-3 h-10 bg-white text-sm hover:border-gray-300 transition-colors"
              style={{ borderColor: "#e5e7eb", fontFamily: "Noto Sans, sans-serif" }}
            >
              <span style={{ color: "#9ca3af" }}>Selecionar categorias...</span>
              <ChevronDown size={16} style={{ color: "#9ca3af" }} />
            </button>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between rounded border p-4" style={{ borderColor: "#e5e7eb" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
                Permitir o uso como serviço reutilizável no canvas
              </p>
              <p style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", marginTop: 2 }}>
                Esta integração poderá ser chamada por outros fluxos
              </p>
            </div>
            <button
              onClick={() => setReutilizavel(!reutilizavel)}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: reutilizavel ? "#8e3ccb" : "#d1d5db",
                position: "relative", border: "none", cursor: "pointer",
                flexShrink: 0, transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: 18, height: 18, borderRadius: "50%",
                  background: "white",
                  top: 3, left: reutilizavel ? 23 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>

          {/* Save */}
          <div>
            <button
              className="px-5 h-9 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#8e3ccb", color: "white", fontFamily: "Noto Sans, sans-serif" }}
            >
              Salvar
            </button>
          </div>
        </div>

        {/* Versões */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", fontFamily: "Noto Sans, sans-serif", marginBottom: 16 }}>
            Versões
          </h2>

          <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  {["NOME", "DATA DE CRIAÇÃO", "DESCRIÇÃO", "AÇÕES"].map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3"
                      style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.07em" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {versions.map((v, i) => (
                  <tr
                    key={v.name}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#f3f4f6" }}
                  >
                    <td className="px-4 py-3">
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
                        {v.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
                        {v.date}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}>
                        {v.description}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-xs font-medium hover:underline transition-colors"
                          style={{ color: "#8e3ccb", fontFamily: "Noto Sans, sans-serif" }}
                        >
                          Detalhes
                        </button>
                        <button
                          className="flex items-center gap-1 text-xs font-medium hover:underline transition-colors"
                          style={{ color: "#6b7280", fontFamily: "Noto Sans, sans-serif" }}
                        >
                          <ExternalLink size={11} />
                          Abrir
                        </button>
                        {i > 0 && (
                          <button
                            className="flex items-center gap-1 text-xs font-medium hover:underline transition-colors"
                            style={{ color: "#ef4444", fontFamily: "Noto Sans, sans-serif" }}
                          >
                            <Trash2 size={11} />
                            Excluir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
