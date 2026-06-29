export { FlowChart, FlowChart as FlowChartComponent } from './flow-chart'
export { default } from './flow-chart'

export { FlowChartProvider } from './core/flowchart-provider'
export { useFlowChartContext } from './core/flowchart-context'

export { useFlowChart } from './hooks/use-flowchart'
export { useLayout } from './hooks/use-layout'
export { useVisitedPaths } from './hooks/use-visited-paths'

export type {
  FlowNode,
  FlowEdge,
  NodeStatus,
  Position,
  LayoutResult,

  FlowChartProps,
  FlowChartBaseProps,
  FlowChartConfig,

  Theme,
  EdgeStyle,
  FlowChartMode,
  FlowDirection,
  LayoutAxis,

  NodeType,
  EdgeType,
  LabelType,

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

export { DefaultNode } from './components/default-node'
export { DefaultEdge } from './components/default-edge'
export { DefaultContainer } from './components/default-container'

export { NodeTypeRenderer } from './node-types'
export { EdgeTypeRenderer } from './edge-types'

export {
  generatePath,
  generateStraightPath,
  generateSmoothPath,
  generateOrthogonalPath,
  generateStepPath,
} from './utils/path-generators'

export {
  computeLayout,
  isVerticalDirection,
} from './utils/layout'

export { findValidPathsToActiveNode } from './utils/path-finder'

export { mergeThemes, getNodeStyle, getEdgeStyle } from './styles/theme-utils'
export { createThemePreset } from './types/theme'
