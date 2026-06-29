import { ReactNode } from "react"
import { Theme, ContainerRenderProps } from "../types"
import { useFlowChartContext } from "../core/flowchart-context"

interface ContainerRendererProps {
  children: ReactNode
  theme: Theme
  height?: number
  className?: string
  style?: React.CSSProperties
  customContainer?: (props: ContainerRenderProps) => ReactNode
}

export function ContainerRenderer({
  children,
  theme,
  height = 300,
  className = "",
  style = {},
  customContainer,
}: ContainerRendererProps) {
  const { preset } = useFlowChartContext()
  const tokens = preset.tokens

  const defaultStyle: React.CSSProperties = {
    height,
    background: tokens.container.background,
    border: `1px solid ${tokens.container.border}`,
    borderRadius: tokens.container.borderRadius,
    overflow: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  }

  if (customContainer) {
    return <>{customContainer({ children, theme, height, className, style })}</>
  }

  return (
    <div className={className} style={defaultStyle}>
      {children}
    </div>
  )
}
