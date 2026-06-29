import { ThemePreset } from "../types"

export const kanbanPreset: ThemePreset = {
  id: "kanban",
  name: "Kanban",
  tokens: {
    container: {
      background: "#F8F9FA",
      border: "#DEE2E6",
      borderRadius: 14,
      padding: 40,
    },
    node: {
      default: { fill: "#FFFFFF", stroke: "#CED4DA", strokeWidth: 1.5 },
      active: { fill: "#FF6B35", stroke: "#E55A2B", strokeWidth: 2.5 },
      done: { fill: "#E8F5E9", stroke: "#4CAF50", strokeWidth: 2 },
      pending: { fill: "#FFF8E1", stroke: "#FFC107", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#ADB5BD", strokeWidth: 1.5 },
      visited: { stroke: "#FF6B35", strokeWidth: 2.5 },
      dashed: { stroke: "#DEE2E6", strokeWidth: 1.5, dashArray: "5,4" },
    },
    typography: {
      nodeLabel: { fontSize: 11, color: "#343A40", fontWeight: "500" },
    },
  },
  edgeStyle: "step",
  nodeRadius: 28,
  colGap: 84,
  rowGap: 64,
}

export const kanbanDarkPreset: ThemePreset = {
  ...kanbanPreset,
  tokens: {
    container: {
      background: "#1A1A2E",
      border: "#16213E",
      borderRadius: 14,
      padding: 40,
    },
    node: {
      default: { fill: "#16213E", stroke: "#0F3460", strokeWidth: 1.5 },
      active: { fill: "#FF6B35", stroke: "#FF8C42", strokeWidth: 2.5 },
      done: { fill: "#1B4332", stroke: "#4CAF50", strokeWidth: 2 },
      pending: { fill: "#3D2B1F", stroke: "#FFC107", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#0F3460", strokeWidth: 1.5 },
      visited: { stroke: "#FF6B35", strokeWidth: 2.5 },
      dashed: { stroke: "#16213E", strokeWidth: 1.5, dashArray: "5,4" },
    },
    typography: {
      nodeLabel: { fontSize: 11, color: "#E0E0E0", fontWeight: "500" },
    },
  },
}
