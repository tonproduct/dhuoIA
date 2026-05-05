"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { ComponentDef } from "./types"

const CATEGORY_LABELS: Record<string, string> = {
  trigger:  "Trigger",
  tecnico:  "Componente técnico",
  logico:   "Componente lógico",
  business: "Componente business",
  agentes:  "Agente & IA",
}

type Props = {
  open: boolean
  comp: ComponentDef | null
  editTarget?: { nodeId: string; label: string } | null
  onClose: () => void
  onAdd?: (comp: ComponentDef, name: string, description: string) => void
  onEdit?: (nodeId: string, name: string) => void
}

export function ConfigureDrawer({ open, comp, editTarget, onClose, onAdd, onEdit }: Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (open) {
      setName(editTarget?.label ?? "")
      setDescription("")
    }
  }, [open, editTarget])

  const categoryLabel = comp ? (CATEGORY_LABELS[comp.category] ?? comp.category) : ""
  const title = comp ? `Configurar ${categoryLabel} - ${comp.label}` : ""

  const isEdit = !!editTarget

  function handleSubmit() {
    if (isEdit) {
      onEdit?.(editTarget!.nodeId, name)
    } else {
      if (!comp) return
      onAdd?.(comp, name, description)
    }
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300"
        style={{
          width: 420,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-5 py-4"
          style={{ backgroundColor: "#7c22c0" }}
        >
          <h2
            className="text-[15px] font-bold text-white leading-snug pr-4"
            style={{ fontFamily: "Noto Sans, sans-serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p
            className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-5"
            style={{ fontFamily: "Noto Sans, sans-serif" }}
          >
            Dados da configuração
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-gray-600" style={{ fontFamily: "Noto Sans, sans-serif" }}>
                Nome
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do componente"
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-300 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                style={{ fontFamily: "Noto Sans, sans-serif" }}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-gray-600" style={{ fontFamily: "Noto Sans, sans-serif" }}>
                Descrição
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o propósito deste componente"
                rows={4}
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-300 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                style={{ fontFamily: "Noto Sans, sans-serif" }}
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 px-5 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-[13px] font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Noto Sans, sans-serif" }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-md text-[13px] font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#7c22c0", fontFamily: "Noto Sans, sans-serif" }}
          >
            {isEdit ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </>
  )
}
