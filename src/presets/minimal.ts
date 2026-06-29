import { ThemePreset } from "../types"

export const minimalPreset: ThemePreset = {
  id: "minimal",
  name: "Minimal",
  tokens: {
    container: {
      background: "#FFFFFF",
      border: "#E5E7EB",
      borderRadius: 8,
      padding: 20,
    },
    node: {
      default: { fill: "#FFFFFF", stroke: "#D1D5DB", strokeWidth: 1 },
      active: { fill: "#10B981", stroke: "#059669", strokeWidth: 2 },
      done: { fill: "#D1FAE5", stroke: "#34D399", strokeWidth: 1 },
      pending: { fill: "#FEF3C7", stroke: "#F59E0B", strokeWidth: 1 },
    },
    edge: {
      default: { stroke: "#D1D5DB", strokeWidth: 1 },
      visited: { stroke: "#10B981", strokeWidth: 2 },
      dashed: { stroke: "#E5E7EB", strokeWidth: 1, dashArray: "4,4" },
    },
    typography: {
      nodeLabel: { fontSize: 11, color: "#374151" },
    },
  },
  edgeStyle: "straight",
  nodeRadius: 18,
  colGap: 60,
  rowGap: 50,
}
