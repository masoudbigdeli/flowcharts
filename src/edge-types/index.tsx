import { FC } from "react"
import { EdgeRenderProps, EdgeType } from "../types"
import { useFlowChartContext } from "../core/flowchart-context"
import { generatePath } from "../utils/path-generators"

export const EdgeTypeRenderer: FC<EdgeRenderProps & { edgeType?: EdgeType }> = (props) => {
  const { edge, source, sourcePosition, targetPosition, isVisited, style, direction = "ltr", edgeType = "default" } = props
  const { preset } = useFlowChartContext()
  const tokens = preset.tokens

  const defaultStroke = tokens.edge.default.stroke
  const visitedStroke = tokens.edge.visited.stroke
  const defaultWidth = tokens.edge.default.strokeWidth
  const visitedWidth = tokens.edge.visited.strokeWidth
  const defaultDash = tokens.edge.default.dashArray ?? "5,4"

  const path = generatePath(
    sourcePosition.cx, sourcePosition.cy,
    targetPosition.cx, targetPosition.cy,
    source.row ?? 0, style, direction
  )

  const arrowId = `arrow-${edge.id ?? `${edge.source}-${edge.target}`}`
  const arrowColor = isVisited ? visitedStroke : defaultStroke

  if (edgeType === "solid") {
    return (
      <>
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={arrowColor} />
          </marker>
        </defs>
        <path d={path} fill="none"
          stroke={isVisited ? visitedStroke : defaultStroke}
          strokeWidth={isVisited ? visitedWidth : defaultWidth}
          strokeLinejoin="round"
          markerEnd={`url(#${arrowId})`}
        />
      </>
    )
  }

  if (edgeType === "thick") {
    const stroke = isVisited ? visitedStroke : defaultStroke
    const width = isVisited ? visitedWidth * 1.6 : defaultWidth * 1.8
    return (
      <>
        <defs>
          <marker id={arrowId} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill={stroke} />
          </marker>
        </defs>
        <path d={path} fill="none" stroke={stroke} strokeWidth={width}
          strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${arrowId})`} />
      </>
    )
  }

  if (edgeType === "animated") {
    const stroke = isVisited ? visitedStroke : defaultStroke
    const animId = `dash-anim-${arrowId}`
    return (
      <>
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={stroke} />
          </marker>
          <style>{`
            @keyframes ${animId} {
              from { stroke-dashoffset: 20; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>
        {/* Background track */}
        <path d={path} fill="none" stroke={stroke} strokeWidth={defaultWidth * 0.5} opacity={0.2} strokeLinejoin="round" />
        {/* Animated dashes */}
        <path d={path} fill="none" stroke={stroke} strokeWidth={isVisited ? visitedWidth : defaultWidth}
          strokeDasharray="8,6" strokeLinejoin="round" markerEnd={`url(#${arrowId})`}
          style={{ animation: `${animId} 0.6s linear infinite` }}
        />
      </>
    )
  }

  if (edgeType === "arrow-both") {
    const stroke = isVisited ? visitedStroke : defaultStroke
    const width = isVisited ? visitedWidth : defaultWidth
    const arrowStartId = `arrow-start-${arrowId}`
    return (
      <>
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={stroke} />
          </marker>
          <marker id={arrowStartId} markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L0,6 L6,3 z" fill={stroke} />
          </marker>
        </defs>
        <path d={path} fill="none" stroke={stroke} strokeWidth={width}
          strokeLinejoin="round"
          markerStart={`url(#${arrowStartId})`}
          markerEnd={`url(#${arrowId})`}
        />
      </>
    )
  }

  if (edgeType === "labeled") {
    const stroke = isVisited ? visitedStroke : defaultStroke
    const width = isVisited ? visitedWidth : defaultWidth
    const dash = !isVisited ? defaultDash : undefined
    const midX = (sourcePosition.cx + targetPosition.cx) / 2
    const midY = (sourcePosition.cy + targetPosition.cy) / 2
    const edgeLabel = edge.label
    return (
      <>
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={stroke} />
          </marker>
        </defs>
        <path d={path} fill="none" stroke={stroke} strokeWidth={width}
          strokeDasharray={dash} strokeLinejoin="round" markerEnd={`url(#${arrowId})`} />
        {edgeLabel && (
          <g>
            <rect x={midX - 18} y={midY - 8} width={36} height={16} rx={4}
              fill={stroke} opacity={0.12} />
            <text x={midX} y={midY + 4.5} textAnchor="middle" fontSize={9}
              fill={stroke} fontWeight="600" style={{ userSelect: "none" }}>
              {edgeLabel}
            </text>
          </g>
        )}
      </>
    )
  }

  // default: dashed when not visited, solid when visited
  const stroke = isVisited ? visitedStroke : defaultStroke
  const strokeWidth = isVisited ? visitedWidth : defaultWidth
  const dash = isVisited ? undefined : defaultDash
  return (
    <>
      <defs>
        <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={stroke} />
        </marker>
      </defs>
      <path d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth}
        strokeDasharray={dash} strokeLinejoin="round" markerEnd={`url(#${arrowId})`} />
    </>
  )
}
