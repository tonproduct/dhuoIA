"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type OnConnect,
} from "@xyflow/react"
import { Save } from "lucide-react"
import { circleNodeTypes } from "./circle-node"
import { edgeTypes } from "./labeled-edge"
import { ALL_COMPONENTS } from "./types"
import type { CircleNodeData } from "./circle-node"
import type { LabeledEdgeData } from "./labeled-edge"

const TRIGGER_IDS = new Set(ALL_COMPONENTS.filter((c) => c.category === "trigger").map((c) => c.id))

const initialNodes: Node<CircleNodeData>[] = []

const initialEdges: Edge<LabeledEdgeData>[] = []

type PendingNode = { compId: string; label: string } | null
type PendingUpdate = { nodeId: string; label: string } | null

function FlowInner({
  pendingNode, onPendingConsumed,
  pendingUpdate, onPendingUpdateConsumed,
  onTriggerChange,
}: {
  pendingNode: PendingNode; onPendingConsumed: () => void
  pendingUpdate: PendingUpdate; onPendingUpdateConsumed: () => void
  onTriggerChange: (hasTrigger: boolean) => void
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const { screenToFlowPosition } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const stfpRef = useRef(screenToFlowPosition)
  const setNodesRef = useRef(setNodes)
  stfpRef.current = screenToFlowPosition
  setNodesRef.current = setNodes

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "labeled", data: { edgeType: "WHEN" } }, eds)),
    [setEdges]
  )

  useEffect(() => {
    const hasTrigger = nodes.some((n) => TRIGGER_IDS.has((n.data as CircleNodeData).compId))
    onTriggerChange(hasTrigger)
  }, [nodes]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pendingNode) return
    const center = { x: 300 + Math.random() * 300, y: 200 + Math.random() * 200 }
    setNodes((nds) => [
      ...nds,
      {
        id: `${pendingNode.compId}-${Date.now()}`,
        type: "circleNode",
        position: center,
        data: { compId: pendingNode.compId, label: pendingNode.label, configured: true },
      },
    ])
    onPendingConsumed()
  }, [pendingNode]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pendingUpdate) return
    setNodes((nds) =>
      nds.map((n) =>
        n.id === pendingUpdate.nodeId
          ? { ...n, data: { ...n.data, label: pendingUpdate.label, configured: true } }
          : n
      )
    )
    onPendingUpdateConsumed()
  }, [pendingUpdate]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move"
    }

    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      const compId = e.dataTransfer?.getData("text/plain") ?? ""
      if (!compId) return
      const position = stfpRef.current({ x: e.clientX, y: e.clientY })
      setNodesRef.current((nds) => [
        ...nds,
        {
          id: `${compId}-${Date.now()}`,
          type: "circleNode",
          position,
          data: { compId, label: compId.toUpperCase(), configured: false },
        },
      ])
    }

    el.addEventListener("dragover", onDragOver)
    el.addEventListener("drop", onDrop)
    return () => {
      el.removeEventListener("dragover", onDragOver)
      el.removeEventListener("drop", onDrop)
    }
  }, [])

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={circleNodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        deleteKeyCode="Delete"
        style={{ background: "#f9fafb" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={28}
          size={1.2}
          color="#d1d5db"
          style={{ backgroundColor: "#f9fafb" }}
        />

        <Controls
          position="bottom-left"
          style={{ borderRadius: 6, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
        />

        <MiniMap
          position="bottom-left"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
          maskColor="rgba(249,250,251,0.7)"
        />

        <Panel position="bottom-right">
          <button
            className="flex items-center gap-2 rounded-full px-5 py-2 hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: "#374151" }}
          >
            <Save size={16} color="white" />
            <span style={{ color: "white", fontWeight: 700, fontSize: 13, fontFamily: "Noto Sans, sans-serif" }}>
              Salvar
            </span>
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export function IntegrationCanvas({
  pendingNode, onPendingConsumed,
  pendingUpdate, onPendingUpdateConsumed,
  onTriggerChange,
}: {
  pendingNode: PendingNode; onPendingConsumed: () => void
  pendingUpdate: PendingUpdate; onPendingUpdateConsumed: () => void
  onTriggerChange: (hasTrigger: boolean) => void
}) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <ReactFlowProvider>
        <FlowInner
          pendingNode={pendingNode} onPendingConsumed={onPendingConsumed}
          pendingUpdate={pendingUpdate} onPendingUpdateConsumed={onPendingUpdateConsumed}
          onTriggerChange={onTriggerChange}
        />
      </ReactFlowProvider>
    </div>
  )
}
