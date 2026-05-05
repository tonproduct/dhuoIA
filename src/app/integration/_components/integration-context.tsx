import { createContext, useContext } from "react"

type IntegrationContextValue = {
  openEdit: (nodeId: string, compId: string, label: string) => void
}

export const IntegrationContext = createContext<IntegrationContextValue>({ openEdit: () => {} })

export const useIntegrationContext = () => useContext(IntegrationContext)
