import { ComponentType } from "react"
import { EdgeRenderProps, EdgeStyle, EdgeType, FlowDirection, FlowEdge, FlowNode, Position, Theme } from "../types"
import { useFlowChartContext } from "../core/flowchart-context"
import { EdgeTypeRenderer } from "../edge-types"

interface EdgeRendererProps {
  edge: FlowEdge
  source: FlowNode
  target: FlowNode
  sourcePosition: Position
  targetPosition: Position
  isVisited: boolean
  theme: Theme
  edgeStyle: EdgeStyle
  direction?: FlowDirection
  customEdge?: ComponentType<EdgeRenderProps>
  edgeType?: EdgeType
}

export function EdgeRenderer({
  edge,
  source,
  target,
  sourcePosition,
  targetPosition,
  isVisited,
  theme,
  edgeStyle,
  direction = "ltr",
  customEdge: CustomEdge,
  edgeType,
}: EdgeRendererProps) {
  const { config } = useFlowChartContext()
  const resolvedEdgeType = edgeType ?? config.edgeType ?? "default"

  const renderProps: EdgeRenderProps = {
    edge,
    source,
    target,
    sourcePosition,
    targetPosition,
    isVisited,
    theme,
    style: edgeStyle,
    edgeType: resolvedEdgeType,
    direction,
  }

  if (CustomEdge) return <CustomEdge {...renderProps} />

  return <EdgeTypeRenderer {...renderProps} edgeType={resolvedEdgeType} />
}
