import { ThemeOverride, ThemePreset, ThemeTokens } from "../types"

export function mergeThemes(base: ThemePreset, override: ThemeOverride): ThemePreset {
  return {
    ...base,
    tokens: deepMerge(base.tokens, override.tokens || {}),
    edgeStyle: override.edgeStyle || base.edgeStyle,
    nodeRadius: override.nodeRadius || base.nodeRadius,
    colGap: override.colGap || base.colGap,
    rowGap: override.rowGap || base.rowGap,
  }
}

function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target } as T

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue
    const sv = source[key]
    const tv = target[key]

    if (sv && typeof sv === "object" && !Array.isArray(sv)) {
      result[key] = deepMerge(
        tv && typeof tv === "object" && !Array.isArray(tv) ? tv : {},
        sv
      ) as T[Extract<keyof T, string>]
    } else {
      result[key] = sv as T[Extract<keyof T, string>]
    }
  }

  return result
}

export function getNodeStyle(status: string, themeTokens: ThemeTokens) {
  const s = themeTokens.node || {}
  switch (status) {
    case "active": return s.active || {}
    case "done": return s.done || {}
    case "pending": return s.pending || {}
    default: return s.default || {}
  }
}

export function getEdgeStyle(
  isVisited: boolean,
  isDashed: boolean,
  themeTokens: ThemeTokens
) {
  const s = themeTokens.edge || {}
  if (isVisited) return s.visited || {}
  if (isDashed) return s.dashed || {}
  return s.default || {}
}
