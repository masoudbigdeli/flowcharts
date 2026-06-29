import { ThemePreset } from "../types"

export const defaultPreset: ThemePreset = {
  id: "default",
  name: "Default",
  tokens: {
    container: {
      background: "#F7F8FA",
      border: "#E2E8F0",
      borderRadius: 12,
      padding: 40,
    },
    node: {
      default: { fill: "#FFFFFF", stroke: "#94A3B8", strokeWidth: 1.5 },
      active: { fill: "#22C55E", stroke: "#16A34A", strokeWidth: 2.5 },
      done: { fill: "#86EFAC", stroke: "#4ADE80", strokeWidth: 1.5 },
      pending: { fill: "#FEF08A", stroke: "#EAB308", strokeWidth: 1.5 },
    },
    edge: {
      default: { stroke: "#CBD5E1", strokeWidth: 1.5, dashArray: "5,4" },
      visited: { stroke: "#22C55E", strokeWidth: 2.2 },
      dashed: { stroke: "#CBD5E1", strokeWidth: 1.5, dashArray: "5,4" },
    },
    typography: {
      nodeLabel: { fontSize: 12, color: "#1E293B" },
    },
  },
  edgeStyle: "orthogonal",
  nodeRadius: 22,
  colGap: 80,
  rowGap: 64,
}
