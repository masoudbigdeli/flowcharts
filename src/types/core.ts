import { ReactNode, ComponentType } from "react"
import { ThemeColors } from './theme'

export type NodeStatus = "default" | "active" | "done" | "pending"
export type Theme = "light" | "dark"
export type EdgeStyle = "orthogonal" | "orthogonal-with-smooth-angles" | "smooth" | "straight" | "step"
export type FlowChartMode = "default" | "minimal" | "modern" | "dark" | "custom" | "pipeline" | "process" | "network" | "kanban" | "blueprint"
export type FlowDirection = "ltr" | "rtl" | "ttb" | "btt"
export type LayoutAxis = "horizontal" | "vertical"

// Node visual types (shape/icon style)
export type NodeType =
  | "circle"        // default: plain circle
  | "diamond"       // decision diamond
  | "hexagon"       // process hexagon
  | "rounded-rect"  // rounded rectangle
  | "icon-workflow" // icon-based workflow nodes
  | "icon-status"   // icon-based status nodes (check/clock/x)
  | "icon-tech"     // icon-based tech/code nodes
  | "icon-kanban"   // card-style kanban nodes
  | "icon-blueprint"// blueprint style nodes

// Edge visual types
export type EdgeType =
  | "default"       // dashed default, solid visited
  | "solid"         // always solid
  | "animated"      // animated dash flow
  | "thick"         // thicker lines
  | "arrow-both"    // arrows on both ends
  | "labeled"       // with built-in label badges

// Label visual types
export type LabelType =
  | "default"       // text below node
  | "badge"         // pill badge below node
  | "tooltip"       // tooltip-style box
  | "inline"        // label inside the node
  | "none"          // no labels

export interface FlowNode {
  id: string | number
  label: string
  status?: NodeStatus
  row?: number
  col?: number
  data?: Record<string, any>
}

export interface FlowEdge {
  id?: string | number
  source: string | number
  target: string | number
  dashed?: boolean
  label?: string
  data?: Record<string, any>
}

export interface Position {
  cx: number
  cy: number
}

export interface LayoutResult {
  positions: Record<string | number, Position>
  width: number
  height: number
}

export interface FlowChartBaseProps {
  nodes: FlowNode[]
  edges: FlowEdge[]
  nodeRadius?: number
  colGap?: number
  rowGap?: number
  theme?: Theme
  themeColors?: ThemeColors
  edgeStyle?: EdgeStyle
  height?: number
  padding?: number
  animated?: boolean
  showLabels?: boolean
  labelOffset?: number
  direction?: FlowDirection
  onNodeClick?: (node: FlowNode) => void
}

export interface FlowChartProps extends FlowChartBaseProps {
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

export interface FlowChartConfig {
  nodeRadius?: number
  colGap?: number
  rowGap?: number
  theme?: Theme
  themeColors?: ThemeColors
  edgeStyle?: EdgeStyle
  height?: number
  padding?: number
  animated?: boolean
  showLabels?: boolean
  labelOffset?: number
  direction?: FlowDirection
  nodeType?: NodeType
  edgeType?: EdgeType
  labelType?: LabelType
}

export interface NodeRenderProps<T = any> {
  node: FlowNode
  position: Position
  radius: number
  isActive: boolean
  isDone: boolean
  isPending: boolean
  theme: Theme
  onClick: (node: FlowNode) => void
  showLabels?: boolean
  labelOffset?: number
  nodeType?: NodeType
  labelType?: LabelType
  customData?: T
}

export interface EdgeRenderProps<T = any> {
  edge: FlowEdge
  source: FlowNode
  target: FlowNode
  sourcePosition: Position
  targetPosition: Position
  isVisited: boolean
  theme: Theme
  style: EdgeStyle
  edgeType?: EdgeType
  direction?: FlowDirection
  customData?: T
}

export interface ContainerRenderProps {
  children: ReactNode
  theme: Theme
  height?: number
  className?: string
  style?: React.CSSProperties
}
