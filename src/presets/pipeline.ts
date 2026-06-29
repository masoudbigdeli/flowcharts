import { ThemePreset } from "../types"

const base = {
  edgeStyle: "orthogonal" as const,
  nodeRadius: 26,
  colGap: 90,
  rowGap: 70,
}

export const pipelinePreset: ThemePreset = {
  id: "pipeline", name: "Pipeline", ...base,
  tokens: {
    container: { background: "#F0FDF4", border: "#BBF7D0", borderRadius: 14, padding: 48 },
    node: {
      default: { fill: "#FFFFFF", stroke: "#86EFAC", strokeWidth: 2 },
      active:  { fill: "#16A34A", stroke: "#15803D", strokeWidth: 3 },
      done:    { fill: "#DCFCE7", stroke: "#4ADE80", strokeWidth: 2 },
      pending: { fill: "#FEF9C3", stroke: "#CA8A04", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#86EFAC", strokeWidth: 2 },
      visited: { stroke: "#16A34A", strokeWidth: 3 },
      dashed:  { stroke: "#BBF7D0", strokeWidth: 2, dashArray: "6,3" },
    },
    typography: { nodeLabel: { fontSize: 11, color: "#14532D", fontWeight: "600", fontFamily: "monospace" } },
  },
}

export const pipelineDarkPreset: ThemePreset = {
  id: "pipeline", name: "Pipeline", ...base,
  tokens: {
    container: { background: "#052E16", border: "#14532D", borderRadius: 14, padding: 48 },
    node: {
      default: { fill: "#14532D", stroke: "#16A34A", strokeWidth: 2 },
      active:  { fill: "#16A34A", stroke: "#4ADE80", strokeWidth: 3 },
      done:    { fill: "#064E3B", stroke: "#34D399", strokeWidth: 2 },
      pending: { fill: "#451A03", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#16A34A", strokeWidth: 2 },
      visited: { stroke: "#4ADE80", strokeWidth: 3 },
      dashed:  { stroke: "#14532D", strokeWidth: 2, dashArray: "6,3" },
    },
    typography: { nodeLabel: { fontSize: 11, color: "#DCFCE7", fontWeight: "600", fontFamily: "monospace" } },
  },
}
