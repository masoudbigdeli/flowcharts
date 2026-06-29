import { FlowEdge, FlowNode } from "../types"

export function findValidPathsToActiveNode(
  edges: FlowEdge[],
  nodes: FlowNode[]
): Set<string> {
  const visitedEdges = new Set<string>()

  const activeNode = nodes.find((n) => n.status === "active")
  if (!activeNode) return visitedEdges

  const adj: Record<string | number, (string | number)[]> = {}
  for (const e of edges) {
    if (!adj[e.source]) adj[e.source] = []
    adj[e.source].push(e.target)
  }

  const hasIncoming = new Set<string | number>(edges.map((e) => e.target))
  const roots = nodes.map((n) => n.id).filter((id) => !hasIncoming.has(id))
  const root = roots.length > 0 ? roots[0] : edges[0]?.source
  if (root == null) return visitedEdges

  const allPaths = findAllPaths(root, activeNode.id, adj)

  const validPaths = allPaths.filter((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const node = nodes.find((n) => n.id === path[i])
      if (!node || node.status !== "done") return false
    }
    const last = nodes.find((n) => n.id === path[path.length - 1])
    return last?.status === "active"
  })

  for (const path of validPaths) {
    for (let i = 0; i < path.length - 1; i++) {
      visitedEdges.add(`${String(path[i])}->${String(path[i + 1])}`)
    }
  }

  return visitedEdges
}

function findAllPaths(
  start: string | number,
  target: string | number,
  adj: Record<string | number, (string | number)[]>
): (string | number)[][] {
  const allPaths: (string | number)[][] = []

  function dfs(current: string | number, path: (string | number)[]) {
    if (current === target) {
      allPaths.push([...path])
      return
    }
    for (const neighbor of adj[current] || []) {
      if (!path.includes(neighbor)) {
        path.push(neighbor)
        dfs(neighbor, path)
        path.pop()
      }
    }
  }

  dfs(start, [start])
  return allPaths
}
