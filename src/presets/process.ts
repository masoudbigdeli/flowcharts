import { ThemePreset } from "../types"

const base = {
  edgeStyle: "orthogonal-with-smooth-angles" as const,
  nodeRadius: 24,
  colGap: 88,
  rowGap: 68,
}

export const processPreset: ThemePreset = {
  id: "process", name: "Process", ...base,
  tokens: {
    container: { background: "#EFF6FF", border: "#BFDBFE", borderRadius: 16, padding: 48 },
    node: {
      default: { fill: "#FFFFFF", stroke: "#93C5FD", strokeWidth: 2 },
      active:  { fill: "#2563EB", stroke: "#1D4ED8", strokeWidth: 3 },
      done:    { fill: "#DBEAFE", stroke: "#60A5FA", strokeWidth: 2 },
      pending: { fill: "#FEF3C7", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#93C5FD", strokeWidth: 2 },
      visited: { stroke: "#2563EB", strokeWidth: 3 },
      dashed:  { stroke: "#BFDBFE", strokeWidth: 2, dashArray: "5,4" },
    },
    typography: { nodeLabel: { fontSize: 12, color: "#1E3A8A", fontWeight: "500" } },
  },
}

export const processDarkPreset: ThemePreset = {
  id: "process", name: "Process", ...base,
  tokens: {
    container: { background: "#0C1427", border: "#1E3A8A", borderRadius: 16, padding: 48 },
    node: {
      default: { fill: "#1E3A8A", stroke: "#3B82F6", strokeWidth: 2 },
      active:  { fill: "#2563EB", stroke: "#60A5FA", strokeWidth: 3 },
      done:    { fill: "#1E3A8A", stroke: "#93C5FD", strokeWidth: 2 },
      pending: { fill: "#451A03", stroke: "#F59E0B", strokeWidth: 2 },
    },
    edge: {
      default: { stroke: "#3B82F6", strokeWidth: 2 },
      visited: { stroke: "#60A5FA", strokeWidth: 3 },
      dashed:  { stroke: "#1E3A8A", strokeWidth: 2, dashArray: "5,4" },
    },
    typography: { nodeLabel: { fontSize: 12, color: "#BFDBFE", fontWeight: "500" } },
  },
}
