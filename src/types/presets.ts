import { FlowChartMode } from "./core"
import { ThemePreset } from "./theme"

export interface PresetDefinition {
  id: FlowChartMode
  name: string
  description: string
  preset: ThemePreset
}

export interface PresetRegistry {
  [key: string]: PresetDefinition
}
