import { ReactNode, useCallback, useMemo, useState } from "react"
import { getPreset } from "../presets"
import { mergeThemes } from "../styles"
import { FlowChartConfig, FlowChartMode } from "../types"
import { FlowChartContext } from "./flowchart-context"
import { createThemePreset, ThemeColors } from "../types/theme"

interface FlowChartProviderProps {
  children: ReactNode
  config?: Partial<FlowChartConfig>
  mode?: FlowChartMode
  theme?: any
  themeColors?: ThemeColors
}

const DEFAULT_CONFIG: FlowChartConfig = {
  nodeRadius: 22,
  colGap: 80,
  rowGap: 64,
  theme: "light",
  edgeStyle: "orthogonal",
  height: 300,
  padding: 40,
  animated: false,
  showLabels: true,
  labelOffset: 14,
  themeColors: {},
}

export function FlowChartProvider({
  children,
  config: externalConfig = {},
  mode: externalMode = "default",
  theme: customTheme,
  themeColors,
}: FlowChartProviderProps) {
  const [internalConfigOverride, setInternalConfigOverride] = useState<Partial<FlowChartConfig>>({})
  const [internalMode, setInternalMode] = useState<FlowChartMode | null>(null)

  const config: FlowChartConfig = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...externalConfig,
    themeColors: {
      ...DEFAULT_CONFIG.themeColors,
      ...externalConfig.themeColors,
      ...themeColors,
    },
    ...internalConfigOverride,
  }), [externalConfig, themeColors, internalConfigOverride])
  const mode: FlowChartMode = internalMode ?? externalMode

  const updateConfig = useCallback((newConfig: Partial<FlowChartConfig>) => {
    setInternalConfigOverride((prev) => ({ ...prev, ...newConfig }))
  }, [])

  const setMode = useCallback((m: FlowChartMode) => {
    setInternalMode(m)
  }, [])
  const currentTheme = config.theme ?? "light"
  const currentThemeColors = config.themeColors ?? {}
  const preset = useMemo(() => {
    if (currentThemeColors && Object.keys(currentThemeColors).length > 0) {
      return createThemePreset(currentThemeColors, currentTheme)
    }
    const base = getPreset(mode, currentTheme)
    return customTheme ? mergeThemes(base, customTheme) : base
  }, [mode, customTheme, currentTheme, currentThemeColors])

  const value = useMemo(
    () => ({ config, mode, preset, updateConfig, setMode }),
    [config, mode, preset, updateConfig, setMode]
  )

  return (
    <FlowChartContext.Provider value={value}>
      {children}
    </FlowChartContext.Provider>
  )
}
