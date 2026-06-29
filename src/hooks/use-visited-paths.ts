import { useMemo } from "react"
import { FlowEdge, FlowNode } from "../types"
import { findValidPathsToActiveNode } from "../utils/path-finder"

export function useVisitedPaths(edges: FlowEdge[], nodes: FlowNode[]) {
  return useMemo(
    () => findValidPathsToActiveNode(edges, nodes),
    [edges, nodes]
  )
}
