import { useMemo } from "react"
import { FlowNode, FlowEdge, FlowDirection } from "../types"
import { computeLayout } from "../utils/layout"

export function useLayout(
  nodes: FlowNode[],
  edges: FlowEdge[],
  nodeRadius: number,
  colGap: number,
  rowGap: number,
  direction: FlowDirection = "ltr"
) {
  return useMemo(
    () => computeLayout(nodes, edges, nodeRadius, colGap, rowGap, direction),
    [nodes, edges, nodeRadius, colGap, rowGap, direction]
  )
}
