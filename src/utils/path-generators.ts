// utils/path-generators.ts

import { EdgeStyle, FlowDirection } from "../types"

export function generatePath (
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  sourceIndex: number, // For horizontal: row, for vertical: column
  style: EdgeStyle = "orthogonal",
  direction: FlowDirection = "ltr"
): string {
  switch (style) {
    case "straight":
      return generateStraightPath(sx, sy, tx, ty)
    case "smooth":
      return generateSmoothPath(sx, sy, tx, ty, direction)
    case "step":
      return generateStepPath(sx, sy, tx, ty, sourceIndex, direction)
    case "orthogonal-with-smooth-angles":
      return generateOrthogonalWithSmoothAnglesPath(sx, sy, tx, ty, sourceIndex, direction)
    case "orthogonal":
    default:
      return generateOrthogonalPath(sx, sy, tx, ty, sourceIndex, direction)
  }
}

export function generateStraightPath (
  sx: number,
  sy: number,
  tx: number,
  ty: number
): string {
  return `M${sx},${sy} L${tx},${ty}`
}

export function generateSmoothPath (
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  direction: FlowDirection = "ltr"
): string {
  if (direction === "ttb" || direction === "btt") {
    const dy = Math.abs(ty - sy) * 0.4
    const cp1y = direction === "ttb" ? sy + dy : sy - dy
    const cp2y = direction === "ttb" ? ty - dy : ty + dy
    return `M${sx},${sy} C${sx},${cp1y} ${tx},${cp2y} ${tx},${ty}`
  }

  const dx = Math.abs(tx - sx) * 0.4
  if (direction === "rtl") {
    return `M${sx},${sy} C${sx - dx},${sy} ${tx + dx},${ty} ${tx},${ty}`
  }
  return `M${sx},${sy} C${sx + dx},${sy} ${tx - dx},${ty} ${tx},${ty}`
}

export function generateOrthogonalPath (
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  sourceIndex: number, // For horizontal: row, for vertical: column
  direction: FlowDirection = "ltr"
): string {
  // Vertical directions (ttb, btt)
  if (direction === "ttb" || direction === "btt") {
    if (sourceIndex === 0) {
      // Same column: go horizontal first, then vertical
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${tx},${sy} L${tx},${ty}`
    } else {
      // Different columns: go vertical first, then horizontal
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${sx},${ty} L${tx},${ty}`
    }
  }

  // Horizontal directions (ltr, rtl)
  if (direction === "rtl") {
    if (sourceIndex === 0) {
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${sx},${ty} L${tx},${ty}`
    } else {
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${tx},${sy} L${tx},${ty}`
    }
  }

  // LTR (default)
  if (sourceIndex === 0) {
    if (Math.abs(sy - ty) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    return `M${sx},${sy} L${sx},${ty} L${tx},${ty}`
  } else {
    if (Math.abs(sx - tx) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    return `M${sx},${sy} L${tx},${sy} L${tx},${ty}`
  }
}

export function generateOrthogonalWithSmoothAnglesPath (
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  sourceIndex: number, // For horizontal: row, for vertical: column
  direction: FlowDirection = "ltr",
  radius: number = 8
): string {
  // Vertical directions (ttb, btt)
  if (direction === "ttb" || direction === "btt") {
    // In vertical layouts, sourceIndex represents the column
    // sourceIndex === 0 means same column (nodes are stacked vertically)
    if (sourceIndex === 0) {
      // Same column: go horizontal first, then vertical
      // Check if it's actually a straight line (same column)
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      // Path: (sx, sy) -> (tx, sy) -> (tx, ty)
      // One corner at (tx, sy)
      return generateSmoothAnglePathSingleCorner(sx, sy, tx, sy, tx, ty, radius)
    } else {
      // Different columns: go vertical first, then horizontal
      // Check if it's actually a straight line (same row)
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      // Path: (sx, sy) -> (sx, ty) -> (tx, ty)
      // One corner at (sx, ty)
      return generateSmoothAnglePathSingleCorner(sx, sy, sx, ty, tx, ty, radius)
    }
  }

  // Horizontal directions (ltr, rtl)
  if (direction === "rtl") {
    if (sourceIndex === 0) {
      // Same row: go vertical first, then horizontal
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      // Path: (sx, sy) -> (sx, ty) -> (tx, ty)
      return generateSmoothAnglePathSingleCorner(sx, sy, sx, ty, tx, ty, radius)
    } else {
      // Different rows: go horizontal first, then vertical
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      // Path: (sx, sy) -> (tx, sy) -> (tx, ty)
      return generateSmoothAnglePathSingleCorner(sx, sy, tx, sy, tx, ty, radius)
    }
  }

  // LTR (default)
  if (sourceIndex === 0) {
    // Same row: go vertical first, then horizontal
    if (Math.abs(sy - ty) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    // Path: (sx, sy) -> (sx, ty) -> (tx, ty)
    return generateSmoothAnglePathSingleCorner(sx, sy, sx, ty, tx, ty, radius)
  } else {
    // Different rows: go horizontal first, then vertical
    if (Math.abs(sx - tx) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    // Path: (sx, sy) -> (tx, sy) -> (tx, ty)
    return generateSmoothAnglePathSingleCorner(sx, sy, tx, sy, tx, ty, radius)
  }
}

// Helper function for paths with a single corner
function generateSmoothAnglePathSingleCorner (
  x1: number, y1: number, // Start
  x2: number, y2: number, // Corner
  x3: number, y3: number, // End
  radius: number = 8
): string {
  // Calculate distances
  const dist1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const dist2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2))
  const maxRadius = Math.min(dist1 / 2, dist2 / 2, radius)
  const r = Math.max(2, maxRadius)

  // Calculate direction vectors
  const dx1 = x2 - x1
  const dy1 = y2 - y1
  const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
  const dx2 = x3 - x2
  const dy2 = y3 - y2
  const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

  // Calculate start and end points of the arc
  const p1x = x2 - (dx1 / len1) * r
  const p1y = y2 - (dy1 / len1) * r
  const p2x = x2 + (dx2 / len2) * r
  const p2y = y2 + (dy2 / len2) * r

  // Build the path with rounded corner
  let path = `M${x1},${y1}`
  path += ` L${p1x},${p1y}`

  if (len1 > 0 && len2 > 0 && r > 0) {
    const cross = dx1 * dy2 - dy1 * dx2
    const sweep = cross > 0 ? 1 : 0
    path += ` A${r},${r} 0 0,${sweep} ${p2x},${p2y}`
  }

  path += ` L${x3},${y3}`

  return path
}

// Keep the original function for paths with two corners
function generateSmoothAnglePath (
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  x4: number, y4: number,
  radius: number = 8
): string {
  // Calculate distances to determine max radius
  const dist1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const dist2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2))
  const dist3 = Math.sqrt(Math.pow(x4 - x3, 2) + Math.pow(y4 - y3, 2))
  const maxRadius = Math.min(dist1 / 2, dist2 / 2, dist3 / 2, radius)
  const r = Math.max(2, maxRadius)

  // Calculate the direction vectors
  const dx1 = x2 - x1
  const dy1 = y2 - y1
  const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
  const dx2 = x3 - x2
  const dy2 = y3 - y2
  const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
  const dx3 = x4 - x3
  const dy3 = y4 - y3
  const len3 = Math.sqrt(dx3 * dx3 + dy3 * dy3)

  // Calculate the start and end points of the arc at corner 1
  const p1x = x2 - (dx1 / len1) * r
  const p1y = y2 - (dy1 / len1) * r
  const p2x = x2 + (dx2 / len2) * r
  const p2y = y2 + (dy2 / len2) * r

  // Calculate the start and end points of the arc at corner 2
  const p3x = x3 - (dx2 / len2) * r
  const p3y = y3 - (dy2 / len2) * r
  const p4x = x3 + (dx3 / len3) * r
  const p4y = y3 + (dy3 / len3) * r

  // Build the path with arc corners
  let path = `M${x1},${y1}`
  path += ` L${p1x},${p1y}`

  // First arc (if the corner is valid)
  if (len1 > 0 && len2 > 0 && r > 0) {
    const cross = dx1 * dy2 - dy1 * dx2
    const sweep = cross > 0 ? 1 : 0
    path += ` A${r},${r} 0 0,${sweep} ${p2x},${p2y}`
  }

  path += ` L${p3x},${p3y}`

  // Second arc (if the corner is valid)
  if (len2 > 0 && len3 > 0 && r > 0) {
    const cross = dx2 * dy3 - dy2 * dx3
    const sweep = cross > 0 ? 1 : 0
    path += ` A${r},${r} 0 0,${sweep} ${p4x},${p4y}`
  }

  path += ` L${x4},${y4}`

  return path
}



export function generateStepPath (
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  sourceIndex: number,
  direction: FlowDirection = "ltr"
): string {
  const midX = (sx + tx) / 2
  const midY = (sy + ty) / 2

  // Vertical directions (ttb, btt)
  if (direction === "ttb" || direction === "btt") {
    if (sourceIndex === 0) {
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${midX},${sy} L${midX},${midY} L${tx},${midY} L${tx},${ty}`
    } else {
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${sx},${midY} L${midX},${midY} L${midX},${ty} L${tx},${ty}`
    }
  }

  // Horizontal directions (ltr, rtl)
  if (direction === "rtl") {
    if (sourceIndex === 0) {
      if (Math.abs(sy - ty) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${sx},${midY} L${midX},${midY} L${midX},${ty} L${tx},${ty}`
    } else {
      if (Math.abs(sx - tx) < 0.1) {
        return `M${sx},${sy} L${tx},${ty}`
      }
      return `M${sx},${sy} L${midX},${sy} L${midX},${midY} L${tx},${midY} L${tx},${ty}`
    }
  }

  // LTR (default)
  if (sourceIndex === 0) {
    if (Math.abs(sy - ty) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    return `M${sx},${sy} L${sx},${midY} L${midX},${midY} L${midX},${ty} L${tx},${ty}`
  } else {
    if (Math.abs(sx - tx) < 0.1) {
      return `M${sx},${sy} L${tx},${ty}`
    }
    return `M${sx},${sy} L${midX},${sy} L${midX},${midY} L${tx},${midY} L${tx},${ty}`
  }
}
