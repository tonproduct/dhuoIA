import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react"
import { Settings2, Trash2, ArrowLeftRight } from "lucide-react"
import { ALL_COMPONENTS } from "./types"
import { useIntegrationContext } from "./integration-context"

export type CircleNodeData = {
  compId: string
  label: string
}

const NODE_SIZE = 72

export function CircleNode({ id, data, selected }: NodeProps) {
  const { setNodes } = useReactFlow()
  const { openEdit } = useIntegrationContext()
  const d = data as CircleNodeData
  const comp = ALL_COMPONENTS.find((c) => c.id === d.compId) ?? ALL_COMPONENTS[0]
  const isChoice = d.compId === "choice"

  function deleteNode() {
    setNodes((nds) => nds.filter((n) => n.id !== id))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }}>
      {/* Circle */}
      <div
        style={{
          width: NODE_SIZE,
          height: NODE_SIZE,
          borderRadius: "50%",
          background: comp.bg,
          border: selected ? "2.5px solid #8e3ccb" : "2px solid transparent",
          boxShadow: selected ? "0 0 0 3px rgba(142,60,203,0.18)" : "0 2px 6px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "box-shadow 0.15s, border-color 0.15s",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: 10, height: 10,
            background: "#9ca3af",
            border: "2px solid #fff",
            left: -5,
          }}
        />

        {isChoice ? (
          <ArrowLeftRight size={26} color={comp.color} strokeWidth={2} />
        ) : (
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: comp.color,
            fontFamily: "Noto Sans, sans-serif",
            textAlign: "center",
            lineHeight: 1.1,
            padding: "0 6px",
          }}>
            {comp.abbr}
          </span>
        )}

        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: 10, height: 10,
            background: "#9ca3af",
            border: "2px solid #fff",
            right: -5,
          }}
        />
      </div>

      {/* Label */}
      <span style={{
        fontSize: 12,
        color: isChoice ? "#2563eb" : "#4b5563",
        fontFamily: "Noto Sans, sans-serif",
        fontWeight: isChoice ? 600 : 400,
        maxWidth: 120,
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {d.label}
      </span>

      {/* Floating actions (on select) */}
      {selected && (
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(id, d.compId, d.label) }}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#f3f4f6", border: "1px solid #d1d5db",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Settings2 size={14} color="#4b5563" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); deleteNode() }}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#fff", border: "1px solid #fca5a5",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Trash2 size={14} color="#ef4444" />
          </button>
        </div>
      )}
    </div>
  )
}

export const circleNodeTypes = { circleNode: CircleNode }
