import { ThemePreset } from "../types"

const base = {
  edgeStyle: "smooth" as const,
  nodeRadius: 24,
  colGap: 100,
  rowGap: 80,
}

export const modernPreset: ThemePreset = {
  id: "modern", name: "Modern", ...base,
  tokens: {
    container: { background: "#F8FAFC", border: "#E2E8F0", borderRadius: 16, padding: 50 },
    node: {
      default: { fill: "#FFFFFF", stroke: "#CBD5E1", strokeWidth: 2 },
      active:  { fill: "#3B82F6", stroke: "#2563EB", strokeWidth: 3 },
      done:    { fill: "#D1FAE5", stroke: "#34D399", strokeWidth: 2 },
      pending: { fill: "#FEF3C7", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#94A3B8", strokeWidth: 2 },
      visited: { stroke: "#3B82F6", strokeWidth: 3 },
      dashed:  { stroke: "#CBD5E1", strokeWidth: 2, dashArray: "6,4" },
    },
    typography: { nodeLabel: { fontSize: 13, color: "#0F172A", fontWeight: "500" } },
  },
}

export const modernDarkPreset: ThemePreset = {
  id: "modern", name: "Modern", ...base,
  tokens: {
    container: { background: "#0F172A", border: "#1E293B", borderRadius: 16, padding: 50 },
    node: {
      default: { fill: "#1E293B", stroke: "#334155", strokeWidth: 2 },
      active:  { fill: "#3B82F6", stroke: "#60A5FA", strokeWidth: 3 },
      done:    { fill: "#064E3B", stroke: "#34D399", strokeWidth: 2 },
      pending: { fill: "#451A03", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#475569", strokeWidth: 2 },
      visited: { stroke: "#60A5FA", strokeWidth: 3 },
      dashed:  { stroke: "#334155", strokeWidth: 2, dashArray: "6,4" },
    },
    typography: { nodeLabel: { fontSize: 13, color: "#E2E8F0", fontWeight: "500" } },
  },
}
