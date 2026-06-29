import { createContext, useContext } from "react"
import { ThemePreset } from "../types/theme"
import { FlowChartConfig, FlowChartMode } from "../types/core"

export interface FlowChartContextValue {
  config: FlowChartConfig
  mode: FlowChartMode
  preset: ThemePreset
  updateConfig: (config: Partial<FlowChartConfig>) => void
  setMode: (mode: FlowChartMode) => void
}

export const FlowChartContext = createContext<FlowChartContextValue | null>(null)

export function useFlowChartContext() {
  const context = useContext(FlowChartContext)
  if (!context) {
    throw new Error("useFlowChartContext must be used within FlowChartProvider")
  }
  return context
}
