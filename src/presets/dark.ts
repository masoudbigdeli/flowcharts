import { ThemePreset } from "../types"

export const darkPreset: ThemePreset = {
  id: "dark",
  name: "Dark",
  tokens: {
    container: {
      background: "#0F172A",
      border: "#1E293B",
      borderRadius: 12,
      padding: 40,
    },
    node: {
      default: { fill: "#1E293B", stroke: "#334155", strokeWidth: 1.5 },
      active: { fill: "#22C55E", stroke: "#16A34A", strokeWidth: 2.5 },
      done: { fill: "#065F46", stroke: "#34D399", strokeWidth: 1.5 },
      pending: { fill: "#78350F", stroke: "#F59E0B", strokeWidth: 1.5 },
    },
    edge: {
      default: { stroke: "#475569", strokeWidth: 1.5 },
      visited: { stroke: "#22C55E", strokeWidth: 2.2 },
      dashed: { stroke: "#334155", strokeWidth: 1.5, dashArray: "5,4" },
    },
    typography: {
      nodeLabel: { fontSize: 12, color: "#E2E8F0" },
    },
  },
  edgeStyle: "orthogonal",
  nodeRadius: 22,
  colGap: 80,
  rowGap: 64,
}
