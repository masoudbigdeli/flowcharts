// ─── Main Component ───────────────────────────────────────────────────────────
export { FlowChart, FlowChart as FlowChartComponent } from './flow-chart'

// ─── Provider & Context ──────────────────────────────────────────────────────
export { FlowChartProvider } from './core/flowchart-provider'
export { useFlowChartContext } from './core/flowchart-context'

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useFlowChart } from './hooks/use-flowchart'
export { useLayout } from './hooks/use-layout'
export { useVisitedPaths } from './hooks/use-visited-paths'

// ─── Types ───────────────────────────────────────────────────────────────────
export type {
  // Nodes & edges
  FlowNode,
  FlowEdge,
  NodeStatus,
  Position,
  LayoutResult,

  // Props
  FlowChartProps,
  FlowChartBaseProps,
  FlowChartConfig,

  // Enum-like string unions
  Theme,
  EdgeStyle,
  FlowChartMode,
  FlowDirection,
  LayoutAxis,

  // Composable type props (v2)
  NodeType,
  EdgeType,
  LabelType,

  // Custom render props
  NodeRenderProps,
  EdgeRenderProps,
  ContainerRenderProps,
} from './types/core'

export type {
  // Theme system
  ThemeTokens,
  ThemePreset,
  ThemeOverride,
  ThemeColors,
  NodeStyle,
  EdgeStyleTokens,
} from './types/theme'

export type {
  PresetDefinition,
  PresetRegistry,
} from './types/presets'

// ─── Presets ─────────────────────────────────────────────────────────────────
export {
  getPreset,
  getPresetDescription,
  getAllPresetModes,
  defaultPreset,
  minimalPreset,
  modernPreset,
  darkPreset,
  pipelinePreset,
  processPreset,
  networkPreset,
  kanbanPreset,
  blueprintPreset,
} from './presets'

// ─── Default sub-components (for use in custom renderers) ─────────────────────
export { DefaultNode } from './components/default-node'
export { DefaultEdge } from './components/default-edge'
export { DefaultContainer } from './components/default-container'

// ─── Low-level renderers (advanced / headless use) ────────────────────────────
export { NodeTypeRenderer } from './node-types'
export { EdgeTypeRenderer } from './edge-types'

// ─── Path generators ─────────────────────────────────────────────────────────
export {
  generatePath,
  generateStraightPath,
  generateSmoothPath,
  generateOrthogonalPath,
  generateStepPath,
} from './utils/path-generators'

// ─── Layout & graph utilities ─────────────────────────────────────────────────
export {
  computeLayout,
  isVerticalDirection,
} from './utils/layout'

export { findValidPathsToActiveNode } from './utils/path-finder'

// ─── Theme utilities ──────────────────────────────────────────────────────────
export { mergeThemes, getNodeStyle, getEdgeStyle } from './styles/theme-utils'
export { createThemePreset } from './types/theme'
