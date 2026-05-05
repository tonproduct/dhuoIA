import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from "@xyflow/react"

export type LabeledEdgeData = {
  edgeType?: "WHEN" | "DEFAULT"
  routeName?: string
}

export function LabeledEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  data, markerEnd,
}: EdgeProps) {
  const d = (data ?? {}) as LabeledEdgeData
  const isWhen = d.edgeType !== "DEFAULT"
  const color = isWhen ? "#22c55e" : "#9ca3af"

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  })

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: color, strokeWidth: 1.8 }}
      />
      {d.routeName && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 700, color, fontFamily: "Noto Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {d.edgeType ?? "WHEN"}
            </span>
            <span style={{ fontSize: 11, color: "#4b5563", fontFamily: "Noto Sans, sans-serif", whiteSpace: "nowrap" }}>
              {d.routeName}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export const edgeTypes = { labeled: LabeledEdge }
