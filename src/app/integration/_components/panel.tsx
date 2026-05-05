"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import {
  Zap, Globe, Layers, Radio, Clock, Rss, Waves, Server,
  Database, Table2, Settings2, Cpu, Mail, Code2, Plug, Bot,
  GitBranch, Repeat2, List, FileCode2,
  Building2, Cloud, CloudUpload, Activity,
  ArrowLeftRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ALL_COMPONENTS, type ComponentDef } from "./types"

const SECTIONS = [
  { key: "trigger",  label: "Triggers"     },
  { key: "agentes",  label: "Agentes & IA" },
  { key: "tecnico",  label: "Técnicos"     },
  { key: "logico",   label: "Lógicos"      },
  { key: "business", label: "Business"     },
] as const

// ─── Icon + description map ──────────────────────────────────────────────────

const META: Record<string, { icon: React.ReactNode; description: string }> = {
  // Triggers
  grpc:       { icon: <Zap size={18} />,           description: "Inicia o fluxo ao receber uma chamada gRPC"              },
  http:       { icon: <Globe size={18} />,          description: "Inicia o fluxo ao receber uma requisição HTTP/REST"      },
  kafka:      { icon: <Layers size={18} />,         description: "Consome mensagens de um tópico Apache Kafka"             },
  rabbitmq:   { icon: <Radio size={18} />,          description: "Consome mensagens de uma fila RabbitMQ"                  },
  scheduler:  { icon: <Clock size={18} />,          description: "Executa o fluxo em um intervalo configurado"             },
  pubsub:     { icon: <Rss size={18} />,            description: "Assina tópicos do Google Cloud Pub/Sub"                  },
  mqtt:       { icon: <Waves size={18} />,          description: "Consome mensagens de um broker MQTT (IoT)"               },
  mcpserver:  { icon: <Server size={18} />,         description: "Expõe ferramentas via Model Context Protocol"            },
  // Técnicos
  postgresql: { icon: <Database size={18} />,       description: "Lê e escreve dados em um banco PostgreSQL"               },
  "rmq-c":    { icon: <Radio size={18} />,          description: "Publica mensagens em uma fila RabbitMQ"                  },
  bigtable:   { icon: <Table2 size={18} />,         description: "Acessa tabelas no Google Cloud Bigtable"                 },
  oam:        { icon: <Settings2 size={18} />,      description: "Integra com o protocolo Open Application Model"          },
  "kafka-t":  { icon: <Layers size={18} />,         description: "Publica mensagens em um tópico Kafka"                    },
  "mqtt-t":   { icon: <Waves size={18} />,          description: "Publica mensagens em um broker MQTT"                     },
  opcua:      { icon: <Cpu size={18} />,            description: "Comunica com dispositivos via OPC UA"                    },
  mailsender: { icon: <Mail size={18} />,           description: "Envia e-mails via SMTP ou provedor configurado"          },
  sqlserver:  { icon: <Database size={18} />,       description: "Lê e escreve dados em um banco SQL Server"               },
  javaapp:    { icon: <Code2 size={18} />,          description: "Invoca uma aplicação Java via integração customizada"     },
  mcpclient:  { icon: <Plug size={18} />,           description: "Consome ferramentas via Model Context Protocol"          },
  aiagent:    { icon: <Bot size={18} />,            description: "Constrói e executa agentes de IA generativa"             },
  // Agentes & IA
  "ag-mcpserver": { icon: <Server size={18} />,    description: "Expõe ferramentas via Model Context Protocol"            },
  "ag-mcpclient": { icon: <Plug size={18} />,      description: "Consome ferramentas via Model Context Protocol"          },
  "ag-builder":   { icon: <Bot size={18} />,       description: "Constrói e orquestra agentes de IA"                      },
  // Lógicos
  choice:     { icon: <GitBranch size={18} />,      description: "Roteia o fluxo com base em condições WHEN/DEFAULT"       },
  datatransf: { icon: <ArrowLeftRight size={18} />, description: "Transforma e mapeia dados entre formatos"                },
  datatransf2:{ icon: <ArrowLeftRight size={18} />, description: "Transforma e mapeia dados entre formatos (v2)"           },
  foreach:    { icon: <Repeat2 size={18} />,        description: "Itera sobre uma lista de itens"                          },
  xslttransf: { icon: <FileCode2 size={18} />,      description: "Transforma XML usando folhas de estilo XSLT"             },
  // Business
  sap:        { icon: <Building2 size={18} />,      description: "Integra com sistemas SAP via RFC ou OData"               },
  saphana:    { icon: <Database size={18} />,       description: "Acessa banco de dados SAP HANA"                          },
  onedrive:   { icon: <Cloud size={18} />,          description: "Gerencia arquivos no Microsoft OneDrive"                 },
  awss3:      { icon: <CloudUpload size={18} />,    description: "Armazena e recupera objetos no Amazon S3"                },
  azureadls2: { icon: <CloudUpload size={18} />,    description: "Acessa o Azure Data Lake Storage Gen2"                   },
  gcloud:     { icon: <Cloud size={18} />,          description: "Integra com serviços do Google Cloud Platform"           },
  pisystem:   { icon: <Activity size={18} />,       description: "Coleta dados de séries temporais do OSIsoft PI"          },
}

// ─── Item ────────────────────────────────────────────────────────────────────

function PanelItem({ comp, onConfigure }: { comp: ComponentDef; onConfigure?: (comp: ComponentDef) => void }) {
  const meta = META[comp.id]

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", comp.id)
        e.dataTransfer.effectAllowed = "move"
      }}
      className="w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-gray-50 cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Ghost icon */}
      <div className="shrink-0 mt-0.5 text-gray-400 group-hover:text-gray-600 transition-colors">
        {meta?.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="leading-snug"
          style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}
        >
          {comp.label}
        </p>
        {meta?.description && (
          <p
            className="mt-0.5 leading-snug"
            style={{ fontSize: 11.5, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}
          >
            {meta.description}
          </p>
        )}
      </div>

      {/* Add button */}
      <button
        onClick={(e) => { e.stopPropagation(); onConfigure?.(comp) }}
        className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:border-gray-400 active:scale-95"
        style={{
          width: 26, height: 26,
          border: "1.5px dashed #d1d5db",
          borderRadius: 6,
          background: "transparent",
          cursor: "pointer",
          flexShrink: 0,
        }}
        title={`Adicionar ${comp.label}`}
      >
        <span style={{ fontSize: 16, lineHeight: 1, fontWeight: 300 }}>+</span>
      </button>
    </div>
  )
}

// ─── Accordion section ───────────────────────────────────────────────────────

function AccordionSection({
  label, items, defaultOpen = false, onConfigure,
}: {
  label: string; items: ComponentDef[]; defaultOpen?: boolean; onConfigure?: (comp: ComponentDef) => void
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <ChevronRight
          size={14}
          className="shrink-0 text-gray-400 transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
          {label}
        </span>
        <span className="ml-auto" style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
          {items.length}
        </span>
      </button>

      {open && (
        <div className="pb-1">
          {items.map((comp) => <PanelItem key={comp.id} comp={comp} onConfigure={onConfigure} />)}
        </div>
      )}
    </div>
  )
}

// ─── Panel ───────────────────────────────────────────────────────────────────

type ComponentPanelProps = {
  onConfigure?: (comp: ComponentDef) => void
}

export function ComponentPanel({ onConfigure }: ComponentPanelProps) {
  const [activeTab, setActiveTab] = useState<"components" | "services">("components")
  const [search, setSearch] = useState("")

  const filtered = ALL_COMPONENTS.filter(
    (c) => c.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside
      className="shrink-0 flex flex-col bg-white border-l overflow-hidden"
      style={{ width: 280, borderColor: "#e5e7eb" }}
    >
      {/* Header */}
      <div className="shrink-0 border-b bg-gray-50" style={{ borderColor: "#e5e7eb" }}>
        <div className="px-4 pt-4 pb-3">
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
            Componentes
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-t" style={{ borderColor: "#e5e7eb" }}>
          {(["components", "services"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 text-xs font-semibold transition-colors relative",
                activeTab === tab ? "text-purple-700" : "text-gray-400 hover:text-gray-600"
              )}
              style={{ fontFamily: "Noto Sans, sans-serif" }}
            >
              {tab === "components" ? "Componentes" : "Serviços"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b" style={{ borderColor: "#f3f4f6" }}>
        <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-gray-100">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar componente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[13px] outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
            style={{ fontFamily: "Noto Sans, sans-serif" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {search !== "" ? (
          filtered.length === 0 ? (
            <p className="text-center pt-6" style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
              Nenhum componente encontrado
            </p>
          ) : (
            filtered.map((comp) => <PanelItem key={comp.id} comp={comp} onConfigure={onConfigure} />)
          )
        ) : (
          SECTIONS.map(({ key, label }) => (
            <AccordionSection
              key={key}
              label={label}
              items={ALL_COMPONENTS.filter((c) => c.category === key)}
              defaultOpen={key === "trigger"}
              onConfigure={onConfigure}
            />
          ))
        )}
      </div>
    </aside>
  )
}
