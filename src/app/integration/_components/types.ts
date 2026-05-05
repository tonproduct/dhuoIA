export type Section = "canvas" | "documentacao" | "implantacao" | "publicacao" | "configuracao"

export type ComponentDef = {
  id: string
  label: string
  abbr: string
  color: string
  bg: string
  category: "trigger" | "tecnico" | "logico" | "business" | "agentes"
}

export const ALL_COMPONENTS: ComponentDef[] = [
  // Triggers
  { id: "grpc",       label: "GRPC",          abbr: "gRPC", color: "#6b7280", bg: "#e8e8e8",  category: "trigger"  },
  { id: "http",       label: "HTTP",          abbr: "HTTP", color: "#ffffff", bg: "#f59e0b",  category: "trigger"  },
  { id: "kafka",      label: "KAFKA",         abbr: "kafka",color: "#ffffff", bg: "#1c1c1c",  category: "trigger"  },
  { id: "rabbitmq",   label: "RABBITMQ",      abbr: "RMQ",  color: "#ffffff", bg: "#e05c00",  category: "trigger"  },
  { id: "scheduler",  label: "SCHEDULER",     abbr: "SCH",  color: "#7c3aed", bg: "#ede9fe",  category: "trigger"  },
  { id: "pubsub",     label: "PUBSUB",        abbr: "PS",   color: "#2563eb", bg: "#dbeafe",  category: "trigger"  },
  { id: "mqtt",       label: "MQTT",          abbr: "MQTT", color: "#16a34a", bg: "#dcfce7",  category: "trigger"  },
  { id: "mcpserver",  label: "MCPSERVER",     abbr: "MCP",  color: "#0d9488", bg: "#ccfbf1",  category: "trigger"  },
  // Técnicos
  { id: "postgresql", label: "POSTGRESQL",    abbr: "PG",   color: "#1d4ed8", bg: "#dbeafe",  category: "tecnico"  },
  { id: "rmq-c",      label: "RABBITMQ",      abbr: "RMQ",  color: "#ffffff", bg: "#e05c00",  category: "tecnico"  },
  { id: "bigtable",   label: "BIGTABLE",      abbr: "BT",   color: "#0284c7", bg: "#e0f2fe",  category: "tecnico"  },
  { id: "oam",        label: "OAM",           abbr: "OAM",  color: "#475569", bg: "#f1f5f9",  category: "tecnico"  },
  { id: "kafka-t",    label: "KAFKA",         abbr: "kafka",color: "#ffffff", bg: "#1c1c1c",  category: "tecnico"  },
  { id: "mqtt-t",     label: "MQTT",          abbr: "MQTT", color: "#16a34a", bg: "#dcfce7",  category: "tecnico"  },
  { id: "opcua",      label: "OPC UA",        abbr: "OPC",  color: "#9333ea", bg: "#fdf4ff",  category: "tecnico"  },
  { id: "mailsender", label: "MAIL SENDER",   abbr: "MAIL", color: "#dc2626", bg: "#fef2f2",  category: "tecnico"  },
  { id: "sqlserver",  label: "SQL SERVER",    abbr: "SQL",  color: "#3b82f6", bg: "#eff6ff",  category: "tecnico"  },
  { id: "javaapp",    label: "JAVA APP",      abbr: "Java", color: "#ea580c", bg: "#fff7ed",  category: "tecnico"  },
  { id: "mcpclient",  label: "MCP CLIENT",    abbr: "MCPc", color: "#0d9488", bg: "#ccfbf1",  category: "tecnico"  },
  { id: "aiagent",    label: "AI AGENT BUILD",abbr: "AI",   color: "#9333ea", bg: "#fdf4ff",  category: "tecnico"  },
  // Lógicos
  { id: "choice",     label: "CHOICE",        abbr: "CH",   color: "#2563eb", bg: "#dbeafe",  category: "logico"   },
  { id: "datatransf", label: "DATA TRANSFOR", abbr: "DT",   color: "#16a34a", bg: "#dcfce7",  category: "logico"   },
  { id: "datatransf2",label: "DATA TRANSFOR", abbr: "DT",   color: "#16a34a", bg: "#dcfce7",  category: "logico"   },
  { id: "foreach",    label: "FOREACH",       abbr: "FE",   color: "#ea580c", bg: "#fff7ed",  category: "logico"   },
  { id: "xslttransf", label: "XSLT TRANSFOR", abbr: "XSLT", color: "#9333ea", bg: "#fdf4ff",  category: "logico"   },
  // Business
  { id: "sap",        label: "SAP",           abbr: "SAP",  color: "#ea580c", bg: "#fff7ed",  category: "business" },
  { id: "saphana",    label: "SAP HANA",      abbr: "HANA", color: "#dc2626", bg: "#fee2e2",  category: "business" },
  { id: "onedrive",   label: "ONEDRIVE",      abbr: "OD",   color: "#2563eb", bg: "#dbeafe",  category: "business" },
  { id: "awss3",      label: "AWS S3",        abbr: "S3",   color: "#f97316", bg: "#fff7ed",  category: "business" },
  { id: "azureadls2", label: "AZURE ADLS2",   abbr: "ADL",  color: "#0078d4", bg: "#dbeafe",  category: "business" },
  { id: "gcloud",     label: "GOOGLE CLOUD",  abbr: "GCP",  color: "#34a853", bg: "#e8f5e9",  category: "business" },
  { id: "pisystem",   label: "PI SYSTEM",     abbr: "PI",   color: "#4b5563", bg: "#f5f5f5",  category: "business" },
  // Agentes & IA
  { id: "ag-mcpserver",  label: "MCP SERVER",     abbr: "MCPs", color: "#0d9488", bg: "#ccfbf1", category: "agentes" },
  { id: "ag-mcpclient",  label: "MCP CLIENT",     abbr: "MCPc", color: "#0d9488", bg: "#ccfbf1", category: "agentes" },
  { id: "ag-builder",    label: "AGENT BUILDER",  abbr: "AB",   color: "#9333ea", bg: "#fdf4ff", category: "agentes" },
]
