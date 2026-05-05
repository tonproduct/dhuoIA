"use client"

import { useState } from "react"
import { IntegrationHeader } from "./header"
import { LeftNav }           from "./left-nav"
import { CanvasToolbar }     from "./canvas-toolbar"
import { IntegrationCanvas } from "./canvas"
import { ComponentPanel }    from "./panel"
import { TriggerSidebar }    from "@/components/ui/trigger-sidebar"
import { ConfigureDrawer }   from "./configure-drawer"
import { IntegrationContext } from "./integration-context"
import { TabDocumentacao }   from "./tab-docs"
import { TabImplantacao }    from "./tab-deploy"
import { TabConfiguracao }   from "./tab-config"
import { ALL_COMPONENTS }    from "./types"
import type { Section, ComponentDef } from "./types"

export function IntegrationShell() {
  const [section, setSection] = useState<Section>("canvas")
  const [triggerPanelOpen, setTriggerPanelOpen] = useState(false)

  // add mode
  const [configComp, setConfigComp] = useState<ComponentDef | null>(null)
  const [pendingNode, setPendingNode] = useState<{ compId: string; label: string } | null>(null)

  // edit mode
  const [editTarget, setEditTarget] = useState<{ nodeId: string; compId: string; label: string } | null>(null)
  const [pendingUpdate, setPendingUpdate] = useState<{ nodeId: string; label: string } | null>(null)

  const drawerOpen = configComp !== null || editTarget !== null
  const drawerComp = editTarget
    ? (ALL_COMPONENTS.find((c) => c.id === editTarget.compId) ?? null)
    : configComp

  function closeDrawer() {
    setConfigComp(null)
    setEditTarget(null)
  }

  return (
    <IntegrationContext.Provider value={{
      openEdit: (nodeId, compId, label) => setEditTarget({ nodeId, compId, label }),
    }}>
      <div className="flex h-screen overflow-hidden" style={{ fontFamily: "Noto Sans, sans-serif" }}>
        <LeftNav active={section} onChange={(s) => { setSection(s); if (s !== "canvas") setTriggerPanelOpen(false) }} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <IntegrationHeader />

          {section === "canvas" && (
            <>
              <CanvasToolbar
                triggerPanelOpen={triggerPanelOpen}
                onAddTrigger={() => setTriggerPanelOpen((v) => !v)}
              />
              <div className="relative flex flex-1 overflow-hidden">
                {triggerPanelOpen && (
                  <TriggerSidebar
                    onClose={() => setTriggerPanelOpen(false)}
                    onSelect={(id) => {
                      console.log("Trigger selecionado:", id)
                      setTriggerPanelOpen(false)
                    }}
                  />
                )}
                <IntegrationCanvas
                  pendingNode={pendingNode}
                  onPendingConsumed={() => setPendingNode(null)}
                  pendingUpdate={pendingUpdate}
                  onPendingUpdateConsumed={() => setPendingUpdate(null)}
                />
                <ComponentPanel onConfigure={(comp) => setConfigComp(comp)} />
                <ConfigureDrawer
                  open={drawerOpen}
                  comp={drawerComp}
                  editTarget={editTarget}
                  onClose={closeDrawer}
                  onAdd={(comp, name) => setPendingNode({ compId: comp.id, label: name || comp.label })}
                  onEdit={(nodeId, name) => setPendingUpdate({ nodeId, label: name })}
                />
              </div>
            </>
          )}

          {section === "documentacao" && <TabDocumentacao />}
          {section === "implantacao"  && <TabImplantacao />}
          {section === "configuracao" && <TabConfiguracao />}

          {section === "publicacao" && (
            <div className="flex-1 flex items-center justify-center bg-white">
              <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
                Publicação — em breve
              </p>
            </div>
          )}
        </div>
      </div>
    </IntegrationContext.Provider>
  )
}
