import { ComponentType, FC, ReactNode, useMemo } from "react"
import { FlowChartProvider } from "./core/flowchart-provider"
import { useFlowChart } from "./hooks/use-flowchart"
import { ContainerRenderer, EdgeRenderer, NodeRenderer } from "./renderers"
import {
  ContainerRenderProps,
  EdgeRenderProps,
  EdgeType,
  FlowChartMode,
  FlowChartProps,
  FlowDirection,
  FlowEdge,
  FlowNode,
  LabelType,
  NodeRenderProps,
  NodeType,
} from "./types"
import { isVerticalDirection } from "./utils/layout"

interface FlowChartComponentProps extends FlowChartProps {
  mode?: FlowChartMode
  nodeType?: NodeType
  edgeType?: EdgeType
  labelType?: LabelType
  customNode?: ComponentType<NodeRenderProps>
  customEdge?: ComponentType<EdgeRenderProps>
  customContainer?: (props: ContainerRenderProps) => ReactNode
  className?: string
  containerStyle?: React.CSSProperties
}

export const FlowChart: FC<FlowChartComponentProps> = ({
  nodes,
  edges,
  nodeRadius = 22,
  colGap = 80,
  rowGap = 64,
  theme = "light",
  themeColors = {},
  edgeStyle = "orthogonal",
  height = 300,
  padding = 40,
  animated = false,
  showLabels = true,
  labelOffset = 14,
  direction = "ltr",
  mode = "default",
  nodeType,
  edgeType,
  labelType,
  customNode,
  customEdge,
  customContainer,
  className = "",
  containerStyle = {},
  onNodeClick,
  ...restProps
}) => {
  return (
    <FlowChartProvider
      config={{
        nodeRadius,
        colGap,
        rowGap,
        theme,
        themeColors,
        edgeStyle,
        height,
        padding,
        animated,
        showLabels,
        labelOffset,
        direction,
        nodeType,
        edgeType,
        labelType,
      }}
      mode={mode}
    >
      <FlowChartInner
        nodes={nodes}
        edges={edges}
        customNode={customNode}
        customEdge={customEdge}
        customContainer={customContainer}
        className={className}
        containerStyle={containerStyle}
        onNodeClick={onNodeClick}
        direction={direction}
        nodeType={nodeType}
        edgeType={edgeType}
        labelType={labelType}
        {...restProps}
      />
    </FlowChartProvider>
  )
}

interface FlowChartInnerProps {
  nodes: FlowNode[]
  edges: FlowEdge[]
  customNode?: ComponentType<NodeRenderProps>
  customEdge?: ComponentType<EdgeRenderProps>
  customContainer?: (props: ContainerRenderProps) => ReactNode
  className?: string
  containerStyle?: React.CSSProperties
  onNodeClick?: (node: FlowNode) => void
  direction?: FlowDirection
  nodeType?: NodeType
  edgeType?: EdgeType
  labelType?: LabelType
}

function FlowChartInner({
  nodes,
  edges,
  customNode,
  customEdge,
  customContainer,
  className,
  containerStyle,
  onNodeClick,
  direction = "ltr",
  nodeType,
  edgeType,
  labelType,
}: FlowChartInnerProps) {
  const { layout, visitedEdges, config, preset } = useFlowChart(nodes, edges)
  const { positions, width, height: contentH } = layout
  const labelOffset = config.labelOffset ?? 14
  const showLabels = config.showLabels ?? true
  const padding = config.padding ?? 40
  const edgeStyleValue = config.edgeStyle ?? "orthogonal"
  const animated = config.animated ?? false
  const themeValue = config.theme ?? "light"
  const nodeRadius = config.nodeRadius ?? 22
  const dir = direction || "ltr"
  const vertical = isVerticalDirection(dir)

  // Extra space for non-circle node types that may be wider/taller
  const extraPadding = nodeType === "icon-blueprint" || nodeType === "icon-kanban" || nodeType === "rounded-rect"
    ? nodeRadius * 0.8
    : 0

  const svgWidth = width + padding * 2 + nodeRadius + extraPadding * 2
  const svgHeight = contentH + padding * 2 + nodeRadius + extraPadding * 2
  const offsetX = padding + extraPadding
  const offsetY = padding + extraPadding

  const nodeMap = useMemo(
    () => nodes.reduce<Record<string | number, FlowNode>>((acc, node) => {
      acc[node.id] = node
      return acc
    }, {}),
    [nodes]
  )

  // Arrow color comes from preset — always in sync with theme
  const arrowColor = preset.tokens.edge.default.stroke

  const containerDir = vertical ? undefined : dir === "rtl" ? "rtl" : "ltr"

  return (
    <ContainerRenderer
      theme={themeValue}
      height={config.height}
      className={className}
      style={{ ...containerStyle, direction: containerDir }}
      customContainer={customContainer}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{
          animation: animated ? "fadeIn 0.3s ease-in-out" : undefined,
          direction: vertical ? undefined : (dir === "rtl" ? "rtl" : "ltr"),
        }}
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={arrowColor} />
          </marker>
          {animated && (
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          )}
        </defs>

        {edges.map((edge, index) => {
          const sourcePos = positions[edge.source]
          const targetPos = positions[edge.target]
          if (!sourcePos || !targetPos) return null

          const sourceNode = nodeMap[edge.source]
          const targetNode = nodeMap[edge.target]
          if (!sourceNode || !targetNode) return null

          const edgeKey = `${String(edge.source)}->${String(edge.target)}`
          const isVisited = visitedEdges.has(edgeKey)

          return (
            <EdgeRenderer
              key={edge.id ?? index}
              edge={edge}
              source={sourceNode}
              target={targetNode}
              sourcePosition={{
                cx: offsetX + sourcePos.cx,
                cy: offsetY + sourcePos.cy,
              }}
              targetPosition={{
                cx: offsetX + targetPos.cx,
                cy: offsetY + targetPos.cy,
              }}
              isVisited={isVisited}
              theme={themeValue}
              edgeStyle={edgeStyleValue}
              direction={dir}
              customEdge={customEdge}
              edgeType={edgeType}
            />
          )
        })}

        {nodes.map((node) => {
          const pos = positions[node.id]
          if (!pos) return null

          return (
            <NodeRenderer
              key={node.id}
              node={node}
              position={{
                cx: offsetX + pos.cx,
                cy: offsetY + pos.cy,
              }}
              radius={nodeRadius}
              theme={themeValue}
              isActive={node.status === "active"}
              isDone={node.status === "done"}
              isPending={node.status === "pending"}
              onClick={(n) => onNodeClick?.(n)}
              customNode={customNode}
              labelOffset={labelOffset}
              showLabels={showLabels}
              nodeType={nodeType}
              labelType={labelType}
            />
          )
        })}
      </svg>
    </ContainerRenderer>
  )
}

export default FlowChart
