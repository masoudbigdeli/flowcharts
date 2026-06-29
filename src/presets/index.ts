import { FlowChartMode, Theme } from "../types"
import { ThemePreset } from "../types/theme"
import { defaultPreset } from "./default"
import { minimalPreset } from "./minimal"
import { modernPreset, modernDarkPreset } from "./modern"
import { darkPreset } from "./dark"
import { pipelinePreset, pipelineDarkPreset } from "./pipeline"
import { processPreset, processDarkPreset } from "./process"
import { networkPreset, networkDarkPreset } from "./network"
import { kanbanPreset, kanbanDarkPreset } from "./kanban"
import { blueprintPreset, blueprintLightPreset } from "./blueprint"

type PresetEntry = {
  light: ThemePreset
  dark: ThemePreset
  description: string
}

const PRESETS: Record<string, PresetEntry> = {
  default: {
    light: defaultPreset,
    dark: darkPreset,
    description: "Classic flowchart with orthogonal edges",
  },
  minimal: {
    light: minimalPreset,
    dark: darkPreset, // minimal falls back to dark for dark theme
    description: "Clean and minimal design",
  },
  modern: {
    light: modernPreset,
    dark: modernDarkPreset,
    description: "Modern design with smooth curves",
  },
  dark: {
    light: darkPreset,
    dark: darkPreset,
    description: "Dark theme for low-light environments",
  },
  pipeline: {
    light: pipelinePreset,
    dark: pipelineDarkPreset,
    description: "CI/CD pipeline and build workflows",
  },
  process: {
    light: processPreset,
    dark: processDarkPreset,
    description: "Business process flows",
  },
  network: {
    light: networkPreset,
    dark: networkDarkPreset,
    description: "Network topology and graph visualization",
  },
  kanban: {
    light: kanbanPreset,
    dark: kanbanDarkPreset,
    description: "Kanban board and task flow",
  },
  blueprint: {
    light: blueprintLightPreset,
    dark: blueprintPreset,
    description: "Technical engineering blueprint style",
  },
}

export function getPreset(mode: FlowChartMode = "default", theme: Theme = "light"): ThemePreset {
  const entry = PRESETS[mode]
  if (!entry) {
    console.warn(`Preset "${mode}" not found, falling back to default`)
    return theme === "dark" ? PRESETS.default.dark : PRESETS.default.light
  }
  return theme === "dark" ? entry.dark : entry.light
}

export function getPresetDescription(mode: FlowChartMode): string {
  return PRESETS[mode]?.description ?? ""
}

export function getAllPresetModes(): FlowChartMode[] {
  return Object.keys(PRESETS) as FlowChartMode[]
}

export { defaultPreset } from "./default"
export { minimalPreset } from "./minimal"
export { modernPreset } from "./modern"
export { darkPreset } from "./dark"
export { pipelinePreset } from "./pipeline"
export { processPreset } from "./process"
export { networkPreset } from "./network"
export { kanbanPreset } from "./kanban"
export { blueprintPreset } from "./blueprint"
