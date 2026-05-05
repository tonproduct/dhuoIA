export type ArtifactCategory = "IA" | "Integração" | "API" | "UI" | "Outro"

export type Artifact = {
  name: string
  description: string
  href: string
  category?: ArtifactCategory
  epic?: string
  feature?: string
  us?: string
  date?: string // ISO: YYYY-MM-DD
}

export const artifacts: Artifact[] = [
  {
    name: "Trigger Sidebar",
    description: "Sidebar de seleção de trigger para workflows — manual, schedule, webhook, form, etc.",
    href: "/preview",
    category: "UI",
    date: "2026-05-05",
  },
  {
    name: "Integration Editor",
    description: "Editor de workflow com canvas React Flow, painel de trigger e abas de config/docs/deploy.",
    href: "/integration",
    category: "Integração",
    date: "2026-05-05",
  },
  {
    name: "Go Plugin Docs",
    description: "Levantamento da documentação do Go Plugin para reforçar a documentação do componente e auxiliar o chat IA a responder dúvidas.",
    href: "/go-plugin",
    category: "IA",
    date: "2026-05-05",
  },
]
