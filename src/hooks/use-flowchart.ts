import { useMemo } from "react"
import { useFlowChartContext } from "../core"
import { FlowEdge, FlowNode } from "../types"
import { computeLayout } from "../utils/layout"
import { findValidPathsToActiveNode } from "../utils/path-finder"

export function useFlowChart(nodes: FlowNode[], edges: FlowEdge[]) {
  const { config, preset } = useFlowChartContext()

  const nodeRadius = config.nodeRadius ?? 22
  const colGap = config.colGap ?? 80
  const rowGap = config.rowGap ?? 64
  const direction = config.direction ?? "ltr"

  const layout = useMemo(
    () => computeLayout(nodes, edges, nodeRadius, colGap, rowGap, direction),
    [nodes, edges, nodeRadius, colGap, rowGap, direction]
  )

  const visitedEdges = useMemo(
    () => findValidPathsToActiveNode(edges, nodes),
    [edges, nodes]
  )

  const nodeMap = useMemo(
    () => nodes.reduce<Record<string | number, FlowNode>>((acc, node) => {
      acc[node.id] = node
      return acc
    }, {}),
    [nodes]
  )

  return { layout, visitedEdges, nodeMap, config, preset, direction }
}
