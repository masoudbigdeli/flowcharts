import { ContainerRenderProps } from "../types"

export function DefaultContainer({
  children,
  theme,
  height = 300,
  className = "",
  style = {},
}: ContainerRenderProps) {
  const defaultStyle: React.CSSProperties = {
    height,
    background: theme === "dark" ? "#0F172A" : "#F7F8FA",
    border: `1px solid ${theme === "dark" ? "#1E293B" : "#E2E8F0"}`,
    borderRadius: 12,
    overflow: "auto",
    ...style,
  }

  return (
    <div className={className} style={defaultStyle}>
      {children}
    </div>
  )
}
