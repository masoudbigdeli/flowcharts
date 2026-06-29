import { FlowNode, FlowEdge, LayoutResult, Position, FlowDirection } from "../types"

export function isVerticalDirection(direction: FlowDirection): boolean {
  return direction === "ttb" || direction === "btt"
}

export function computeLayout(
  nodes: FlowNode[],
  edges: FlowEdge[],
  nodeRadius: number,
  colGap: number,
  rowGap: number,
  direction: FlowDirection = "ltr"
): LayoutResult {
  const inDeg: Record<string | number, number> = Object.fromEntries(
    nodes.map((n) => [n.id, 0])
  )

  const adj: Record<string | number, (string | number)[]> = Object.fromEntries(
    nodes.map((n) => [n.id, []])
  )

  for (const e of edges) {
    inDeg[e.target] = (inDeg[e.target] || 0) + 1
    adj[e.source].push(e.target)
  }

  const col: Record<string | number, number> = Object.fromEntries(
    nodes.map((n) => [n.id, n.col ?? 0])
  )

  const queue = nodes.map((n) => n.id).filter((id) => inDeg[id] === 0)
  let i = 0

  while (i < queue.length) {
    const cur = queue[i++]
    for (const nxt of adj[cur] || []) {
      col[nxt] = Math.max(col[nxt], col[cur] + 1)
      if (--inDeg[nxt] === 0) queue.push(nxt)
    }
  }

  const row: Record<string | number, number> = Object.fromEntries(
    nodes.map((n) => [n.id, n.row ?? 0])
  )

  const D = nodeRadius * 2
  const positions: Record<string | number, Position> = {}
  const maxCol = Math.max(...Object.values(col))
  const vertical = isVerticalDirection(direction)

  for (const n of nodes) {
    if (vertical) {
      const depthIndex = col[n.id]
      const laneIndex = row[n.id]

      let cy = depthIndex * (D + colGap) + nodeRadius
      if (direction === "btt") {
        cy = (maxCol - depthIndex) * (D + colGap) + nodeRadius
      }

      positions[n.id] = {
        cx: laneIndex * (D + rowGap),
        cy,
      }
    } else {
      let cx = col[n.id] * (D + colGap) + nodeRadius
      if (direction === "rtl") {
        cx = (maxCol - col[n.id]) * (D + colGap) + nodeRadius
      }

      positions[n.id] = {
        cx,
        cy: -row[n.id] * (D + rowGap),
      }
    }
  }

  if (!vertical) {
    const minY = Math.min(...Object.values(positions).map((p) => p.cy))
    for (const id in positions) {
      positions[id].cy -= minY
    }
  } else {
    const minX = Math.min(...Object.values(positions).map((p) => p.cx))
    for (const id in positions) {
      positions[id].cx -= minX
    }
  }

  const maxX = Math.max(...Object.values(positions).map((p) => p.cx))
  const maxY = Math.max(...Object.values(positions).map((p) => p.cy))

  return { positions, width: maxX, height: maxY }
}
