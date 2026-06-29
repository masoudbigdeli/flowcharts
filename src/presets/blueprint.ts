import { ThemePreset } from "../types"

export const blueprintPreset: ThemePreset = {
  id: "blueprint",
  name: "Blueprint",
  tokens: {
    container: {
      background: "#0A1628",
      border: "#1A3A5C",
      borderRadius: 8,
      padding: 44,
    },
    node: {
      default: { fill: "#0D2137", stroke: "#4A9ECC", strokeWidth: 1.5 },
      active: { fill: "#1565C0", stroke: "#42A5F5", strokeWidth: 2.5 },
      done: { fill: "#0D3B2A", stroke: "#26A69A", strokeWidth: 1.5 },
      pending: { fill: "#2C1810", stroke: "#FF8A65", strokeWidth: 1.5 },
    },
    edge: {
      default: { stroke: "#2A6696", strokeWidth: 1.5 },
      visited: { stroke: "#42A5F5", strokeWidth: 2.5 },
      dashed: { stroke: "#1A3A5C", strokeWidth: 1.5, dashArray: "6,3" },
    },
    typography: {
      nodeLabel: { fontSize: 10, color: "#90CAF9", fontWeight: "400", fontFamily: "monospace" },
    },
  },
  edgeStyle: "orthogonal",
  nodeRadius: 20,
  colGap: 80,
  rowGap: 60,
}

// Blueprint is inherently dark-themed; light variant has inverted blues
export const blueprintLightPreset: ThemePreset = {
  ...blueprintPreset,
  tokens: {
    container: {
      background: "#E3F2FD",
      border: "#90CAF9",
      borderRadius: 8,
      padding: 44,
    },
    node: {
      default: { fill: "#FFFFFF", stroke: "#1565C0", strokeWidth: 1.5 },
      active: { fill: "#1565C0", stroke: "#0D47A1", strokeWidth: 2.5 },
      done: { fill: "#E0F2F1", stroke: "#00897B", strokeWidth: 1.5 },
      pending: { fill: "#FFF3E0", stroke: "#E64A19", strokeWidth: 1.5 },
    },
    edge: {
      default: { stroke: "#42A5F5", strokeWidth: 1.5 },
      visited: { stroke: "#1565C0", strokeWidth: 2.5 },
      dashed: { stroke: "#90CAF9", strokeWidth: 1.5, dashArray: "6,3" },
    },
    typography: {
      nodeLabel: { fontSize: 10, color: "#0D47A1", fontWeight: "500", fontFamily: "monospace" },
    },
  },
}
