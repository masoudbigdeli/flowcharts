import { ComponentType, ReactNode } from "react"
import { FlowNode, LabelType, NodeRenderProps, NodeType, Position, Theme } from "../types"
import { useFlowChartContext } from "../core/flowchart-context"
import { NodeTypeRenderer } from "../node-types"

interface NodeRendererProps {
  node: FlowNode
  position: Position
  radius: number
  theme: Theme
  isActive: boolean
  isDone: boolean
  isPending: boolean
  onClick: (node: FlowNode) => void
  customNode?: ComponentType<NodeRenderProps>
  children?: ReactNode
  labelOffset?: number
  showLabels?: boolean
  nodeType?: NodeType
  labelType?: LabelType
}

export function NodeRenderer({
  node,
  position,
  radius,
  theme,
  isActive,
  isDone,
  isPending,
  onClick,
  customNode: CustomNode,
  labelOffset = 14,
  showLabels = true,
  nodeType,
  labelType,
}: NodeRendererProps) {
  const { preset, config } = useFlowChartContext()

  const resolvedNodeType = nodeType ?? config.nodeType ?? "circle"
  const resolvedLabelType = labelType ?? config.labelType ?? "default"

  const renderProps: NodeRenderProps = {
    node,
    position,
    radius,
    isActive,
    isDone,
    isPending,
    theme,
    onClick,
    labelOffset,
    showLabels,
    nodeType: resolvedNodeType,
    labelType: resolvedLabelType,
  }

  if (CustomNode) return <CustomNode {...renderProps} />

  return (
    <NodeTypeRenderer
      {...renderProps}
      nodeType={resolvedNodeType}
      labelType={resolvedLabelType}
    />
  )
}
