import { CSSProperties } from "react"
import { EdgeStyle } from "./core"

export interface ThemeTokens {
  container: {
    background: string
    border: string
    borderRadius: number
    padding: number
  }
  node: {
    default: NodeStyle
    active: NodeStyle
    done: NodeStyle
    pending: NodeStyle
  }
  edge: {
    default: EdgeStyleTokens
    visited: EdgeStyleTokens
    dashed: EdgeStyleTokens
  }
  typography: {
    nodeLabel: {
      fontSize: number
      color: string
      fontFamily?: string
      fontWeight?: string | number
    }
    [key: string]: any
  }
  [key: string]: any
}

export interface NodeStyle {
  fill: string
  stroke: string
  strokeWidth: number
  radius?: number
  shadow?: string
  opacity?: number
  labelColor?: string
  className?: string
  style?: CSSProperties
}

export interface EdgeStyleTokens {
  stroke: string
  strokeWidth: number
  dashArray?: string
  opacity?: number
  shadow?: string
  className?: string
  style?: CSSProperties
}

export interface ThemePreset {
  id: string
  name: string
  tokens: ThemeTokens
  edgeStyle?: EdgeStyle
  nodeRadius?: number
  colGap?: number
  rowGap?: number
}

export interface ThemeOverride {
  tokens?: Partial<ThemeTokens>
  edgeStyle?: EdgeStyle
  nodeRadius?: number
  colGap?: number
  rowGap?: number
}

export interface ThemeColors {
  // Container
  containerBackground?: string
  containerBorder?: string

  // Node - Default
  nodeDefaultFill?: string
  nodeDefaultStroke?: string
  nodeDefaultStrokeWidth?: number

  // Node - Active
  nodeActiveFill?: string
  nodeActiveStroke?: string
  nodeActiveStrokeWidth?: number

  // Node - Done
  nodeDoneFill?: string
  nodeDoneStroke?: string
  nodeDoneStrokeWidth?: number

  // Node - Pending
  nodePendingFill?: string
  nodePendingStroke?: string
  nodePendingStrokeWidth?: number

  // Node Label
  nodeLabelColor?: string  // ← Single label color (will be used for both themes)
  nodeLabelFontSize?: number

  // Edge - Default
  edgeDefaultStroke?: string
  edgeDefaultStrokeWidth?: number
  edgeDefaultDashArray?: string

  // Edge - Visited
  edgeVisitedStroke?: string
  edgeVisitedStrokeWidth?: number

  // Edge - Dashed
  edgeDashedStroke?: string
  edgeDashedStrokeWidth?: number
  edgeDashedDashArray?: string

  // Arrow
  arrowColor?: string
}

export function createThemePreset (
  colors: ThemeColors,
  baseTheme: 'light' | 'dark' = 'light'
): ThemePreset {
  const isDark = baseTheme === 'dark'

  // Default light theme colors
  const lightDefaults = {
    containerBackground: "#F7F8FA",
    containerBorder: "#E2E8F0",
    nodeDefaultFill: "#FFFFFF",
    nodeDefaultStroke: "#94A3B8",
    nodeDefaultStrokeWidth: 1.5,
    nodeActiveFill: "#22C55E",
    nodeActiveStroke: "#16A34A",
    nodeActiveStrokeWidth: 2.5,
    nodeDoneFill: "#86EFAC",
    nodeDoneStroke: "#4ADE80",
    nodeDoneStrokeWidth: 1.5,
    nodePendingFill: "#FEF08A",
    nodePendingStroke: "#EAB308",
    nodePendingStrokeWidth: 1.5,
    nodeLabelColor: "#1E293B",  // Light theme label color
    nodeLabelFontSize: 12,
    edgeDefaultStroke: "#CBD5E1",
    edgeDefaultStrokeWidth: 1.5,
    edgeDefaultDashArray: "5,4",
    edgeVisitedStroke: "#22C55E",
    edgeVisitedStrokeWidth: 2.2,
    edgeDashedStroke: "#CBD5E1",
    edgeDashedStrokeWidth: 1.5,
    edgeDashedDashArray: "5,4",
    arrowColor: "#94A3B8",
  }

  // Default dark theme colors
  const darkDefaults = {
    containerBackground: "#0F172A",
    containerBorder: "#1E293B",
    nodeDefaultFill: "#1E293B",
    nodeDefaultStroke: "#334155",
    nodeDefaultStrokeWidth: 1.5,
    nodeActiveFill: "#22C55E",
    nodeActiveStroke: "#16A34A",
    nodeActiveStrokeWidth: 2.5,
    nodeDoneFill: "#065F46",
    nodeDoneStroke: "#34D399",
    nodeDoneStrokeWidth: 1.5,
    nodePendingFill: "#78350F",
    nodePendingStroke: "#F59E0B",
    nodePendingStrokeWidth: 1.5,
    nodeLabelColor: "#E2E8F0",  // Dark theme label color
    nodeLabelFontSize: 12,
    edgeDefaultStroke: "#475569",
    edgeDefaultStrokeWidth: 1.5,
    edgeDefaultDashArray: "5,4",
    edgeVisitedStroke: "#22C55E",
    edgeVisitedStrokeWidth: 2.2,
    edgeDashedStroke: "#334155",
    edgeDashedStrokeWidth: 1.5,
    edgeDashedDashArray: "5,4",
    arrowColor: "#94A3B8",
  }

  // Choose defaults based on theme
  const defaults = isDark ? darkDefaults : lightDefaults

  // Merge user colors with defaults - IMPORTANT: user colors override defaults
  const c = { ...defaults, ...colors }

  // IMPORTANT: The label color should come from user colors if provided, otherwise from defaults
  // But if user provided nodeLabelColor, it should override the theme default
  const labelColor = colors.nodeLabelColor !== undefined
    ? colors.nodeLabelColor
    : defaults.nodeLabelColor

  return {
    id: isDark ? 'dark' : 'light',
    name: isDark ? 'Dark' : 'Light',
    tokens: {
      container: {
        background: c.containerBackground!,
        border: c.containerBorder!,
        borderRadius: 12,
        padding: 40,
      },
      node: {
        default: {
          fill: c.nodeDefaultFill!,
          stroke: c.nodeDefaultStroke!,
          strokeWidth: c.nodeDefaultStrokeWidth!,
        },
        active: {
          fill: c.nodeActiveFill!,
          stroke: c.nodeActiveStroke!,
          strokeWidth: c.nodeActiveStrokeWidth!,
        },
        done: {
          fill: c.nodeDoneFill!,
          stroke: c.nodeDoneStroke!,
          strokeWidth: c.nodeDoneStrokeWidth!,
        },
        pending: {
          fill: c.nodePendingFill!,
          stroke: c.nodePendingStroke!,
          strokeWidth: c.nodePendingStrokeWidth!,
        },
      },
      edge: {
        default: {
          stroke: c.edgeDefaultStroke!,
          strokeWidth: c.edgeDefaultStrokeWidth!,
          dashArray: c.edgeDefaultDashArray,
        },
        visited: {
          stroke: c.edgeVisitedStroke!,
          strokeWidth: c.edgeVisitedStrokeWidth!,
        },
        dashed: {
          stroke: c.edgeDashedStroke!,
          strokeWidth: c.edgeDashedStrokeWidth!,
          dashArray: c.edgeDashedDashArray,
        },
      },
      typography: {
        nodeLabel: {
          fontSize: c.nodeLabelFontSize!,
          color: labelColor,  // ← Use the determined label color
        },
      },
    },
    edgeStyle: "orthogonal",
    nodeRadius: 22,
    colGap: 80,
    rowGap: 64,
  }
}
