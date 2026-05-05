export type Artifact = {
  name: string
  description: string
  href: string
}

export const artifacts: Artifact[] = [
  {
    name: "Trigger Sidebar",
    description: "Sidebar de seleção de trigger para workflows — manual, schedule, webhook, form, etc.",
    href: "/preview",
  },
  {
    name: "Integration Editor",
    description: "Editor de workflow com canvas React Flow, painel de trigger e abas de config/docs/deploy.",
    href: "/integration",
  },
]
