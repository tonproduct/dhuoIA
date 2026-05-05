"use client"

import { useState } from "react"
import { Search, ChevronRight, X } from "lucide-react"
import {
  Webhook, Clock, Zap, Layers, Radio, Cpu, Waves, Server,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TriggerItem = {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  hasSubmenu?: boolean
}

const DHUO_TRIGGERS: TriggerItem[] = [
  {
    id: "grpc",
    icon: <Zap size={17} />,
    label: "GRPC",
    description: "Inicia o fluxo ao receber uma chamada via protocolo gRPC",
  },
  {
    id: "http",
    icon: <Webhook size={17} />,
    label: "HTTP",
    description: "Inicia o fluxo ao receber uma requisição HTTP/REST",
    hasSubmenu: true,
  },
  {
    id: "kafka",
    icon: <Layers size={17} />,
    label: "KAFKA",
    description: "Consome mensagens de um tópico Apache Kafka",
  },
  {
    id: "rabbitmq",
    icon: <Radio size={17} />,
    label: "RABBITMQ",
    description: "Consome mensagens de uma fila RabbitMQ",
  },
  {
    id: "scheduler",
    icon: <Clock size={17} />,
    label: "SCHEDULER",
    description: "Executa o fluxo em um intervalo de tempo configurado",
  },
  {
    id: "pubsub",
    icon: <Cpu size={17} />,
    label: "PUBSUB",
    description: "Assina tópicos do Google Cloud Pub/Sub",
  },
  {
    id: "mqtt",
    icon: <Waves size={17} />,
    label: "MQTT",
    description: "Consome mensagens de um broker MQTT (IoT)",
  },
  {
    id: "mcpserver",
    icon: <Server size={17} />,
    label: "MCPSERVER",
    description: "Expõe ferramentas via Model Context Protocol para agentes IA",
  },
]

type Props = {
  onClose: () => void
  onSelect?: (triggerId: string) => void
}

export function TriggerPanel({ onClose, onSelect }: Props) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = DHUO_TRIGGERS.filter(
    (t) =>
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  )

  function handleSelect(trigger: TriggerItem) {
    if (trigger.hasSubmenu) return
    setSelected(trigger.id)
    onSelect?.(trigger.id)
  }

  return (
    <aside
      className="flex flex-col border-r bg-white shrink-0"
      style={{ width: 292, borderColor: "#e5e7eb", height: "100%" }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-4 pt-5 pb-3 border-b"
        style={{ borderColor: "#f3f4f6", backgroundColor: "#fafafa" }}
      >
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "Noto Sans, sans-serif", lineHeight: 1.3 }}>
            O que inicia este fluxo?
          </h2>
          <p style={{ fontSize: 11.5, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", marginTop: 3, lineHeight: 1.4 }}>
            Um trigger é o ponto de entrada da integração
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center rounded hover:bg-gray-100 transition-colors mt-0.5"
          style={{ width: 26, height: 26, flexShrink: 0 }}
        >
          <X size={15} style={{ color: "#9ca3af" }} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b" style={{ borderColor: "#f3f4f6" }}>
        <div
          className="flex items-center gap-2 rounded-md border bg-white px-3"
          style={{ height: 36, borderColor: "#e5e7eb" }}
        >
          <Search size={13} style={{ color: "#d1d5db", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar trigger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#374151", fontFamily: "Noto Sans, sans-serif", fontSize: 13 }}
          />
        </div>
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto py-1.5">
        {filtered.map((trigger) => (
          <li key={trigger.id}>
            <button
              onClick={() => handleSelect(trigger)}
              className={cn(
                "w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors group",
                selected === trigger.id
                  ? "bg-purple-50"
                  : "hover:bg-gray-50"
              )}
            >
              {/* Icon */}
              <div
                className="shrink-0 flex items-center justify-center rounded mt-0.5 transition-colors"
                style={{
                  width: 32, height: 32,
                  backgroundColor: selected === trigger.id ? "#f3e8ff" : "#f3f4f6",
                  color: selected === trigger.id ? "#8e3ccb" : "#6b7280",
                  borderRadius: 8,
                  flexShrink: 0,
                }}
              >
                {trigger.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="leading-snug"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: selected === trigger.id ? "#8e3ccb" : "#111827",
                    fontFamily: "Noto Sans, sans-serif",
                  }}
                >
                  {trigger.label}
                </p>
                <p
                  className="leading-snug mt-0.5"
                  style={{
                    fontSize: 11.5,
                    color: "#9ca3af",
                    fontFamily: "Noto Sans, sans-serif",
                  }}
                >
                  {trigger.description}
                </p>
              </div>

              {trigger.hasSubmenu && (
                <ChevronRight
                  size={15}
                  className="shrink-0 mt-1 transition-colors"
                  style={{ color: selected === trigger.id ? "#8e3ccb" : "#d1d5db" }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Footer CTA */}
      {selected && (
        <div className="p-3 border-t" style={{ borderColor: "#f3f4f6" }}>
          <button
            onClick={() => { onSelect?.(selected); onClose() }}
            className="w-full h-9 rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#8e3ccb", color: "white", fontFamily: "Noto Sans, sans-serif" }}
          >
            Adicionar ao canvas
          </button>
        </div>
      )}
    </aside>
  )
}
