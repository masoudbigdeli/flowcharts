import { ThemePreset } from "../types"

export const networkPreset: ThemePreset = {
  id: "network",
  name: "Network",
  tokens: {
    container: {
      background: "#FAFAFA",
      border: "#E5E7EB",
      borderRadius: 12,
      padding: 44,
    },
    node: {
      default: { fill: "#F3F4F6", stroke: "#9CA3AF", strokeWidth: 2 },
      active: { fill: "#7C3AED", stroke: "#6D28D9", strokeWidth: 3 },
      done: { fill: "#EDE9FE", stroke: "#A78BFA", strokeWidth: 2 },
      pending: { fill: "#FEF3C7", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#D1D5DB", strokeWidth: 1.5 },
      visited: { stroke: "#7C3AED", strokeWidth: 2.5 },
      dashed: { stroke: "#E5E7EB", strokeWidth: 1.5, dashArray: "4,4" },
    },
    typography: {
      nodeLabel: { fontSize: 11, color: "#374151", fontWeight: "600" },
    },
  },
  edgeStyle: "smooth",
  nodeRadius: 22,
  colGap: 76,
  rowGap: 60,
}

export const networkDarkPreset: ThemePreset = {
  ...networkPreset,
  tokens: {
    container: {
      background: "#09090B",
      border: "#27272A",
      borderRadius: 12,
      padding: 44,
    },
    node: {
      default: { fill: "#18181B", stroke: "#3F3F46", strokeWidth: 2 },
      active: { fill: "#7C3AED", stroke: "#A78BFA", strokeWidth: 3 },
      done: { fill: "#2E1065", stroke: "#8B5CF6", strokeWidth: 2 },
      pending: { fill: "#451A03", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#3F3F46", strokeWidth: 1.5 },
      visited: { stroke: "#8B5CF6", strokeWidth: 2.5 },
      dashed: { stroke: "#27272A", strokeWidth: 1.5, dashArray: "4,4" },
    },
    typography: {
      nodeLabel: { fontSize: 11, color: "#D4D4D8", fontWeight: "600" },
    },
  },
}
