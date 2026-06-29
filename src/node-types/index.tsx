import { FC } from "react"
import { NodeRenderProps, NodeType, LabelType } from "../types"
import { useFlowChartContext } from "../core/flowchart-context"

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function IconCheck({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.38
  return (
    <polyline
      points={`${cx - s},${cy} ${cx - s * 0.25},${cy + s * 0.65} ${cx + s},${cy - s * 0.55}`}
      fill="none" stroke={color} strokeWidth={r * 0.18} strokeLinecap="round" strokeLinejoin="round"
    />
  )
}

function IconClock({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.5
  return (
    <>
      <circle cx={cx} cy={cy} r={s} fill="none" stroke={color} strokeWidth={r * 0.14} />
      <line x1={cx} y1={cy} x2={cx} y2={cy - s * 0.65} stroke={color} strokeWidth={r * 0.14} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + s * 0.45} y2={cy + s * 0.35} stroke={color} strokeWidth={r * 0.14} strokeLinecap="round" />
    </>
  )
}

function IconPlay({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.38
  return <polygon points={`${cx - s * 0.5},${cy - s * 0.85} ${cx + s * 0.9},${cy} ${cx - s * 0.5},${cy + s * 0.85}`} fill={color} />
}

function IconBolt({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.44
  return (
    <polygon
      points={`${cx - s * 0.1},${cy - s} ${cx - s * 0.6},${cy + s * 0.1} ${cx - s * 0.05},${cy + s * 0.1} ${cx + s * 0.1},${cy + s} ${cx + s * 0.6},${cy - s * 0.1} ${cx + s * 0.05},${cy - s * 0.1}`}
      fill={color}
    />
  )
}

function IconCode({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.35
  return (
    <>
      <polyline points={`${cx - s * 0.1},${cy - s * 0.7} ${cx - s * 0.8},${cy} ${cx - s * 0.1},${cy + s * 0.7}`}
        fill="none" stroke={color} strokeWidth={r * 0.15} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${cx + s * 0.1},${cy - s * 0.7} ${cx + s * 0.8},${cy} ${cx + s * 0.1},${cy + s * 0.7}`}
        fill="none" stroke={color} strokeWidth={r * 0.15} strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

function IconArrowRight({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.38
  return (
    <>
      <line x1={cx - s} y1={cy} x2={cx + s * 0.5} y2={cy} stroke={color} strokeWidth={r * 0.16} strokeLinecap="round" />
      <polyline points={`${cx},${cy - s * 0.55} ${cx + s * 0.5},${cy} ${cx},${cy + s * 0.55}`}
        fill="none" stroke={color} strokeWidth={r * 0.16} strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

function IconCircleDot({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r * 0.42} fill="none" stroke={color} strokeWidth={r * 0.14} />
      <circle cx={cx} cy={cy} r={r * 0.16} fill={color} />
    </>
  )
}

function IconX({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 0.32
  return (
    <>
      <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} stroke={color} strokeWidth={r * 0.18} strokeLinecap="round" />
      <line x1={cx + s} y1={cy - s} x2={cx - s} y2={cy + s} stroke={color} strokeWidth={r * 0.18} strokeLinecap="round" />
    </>
  )
}

// ─── Shapes ───────────────────────────────────────────────────────────────────

function hexagonPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  })
  return `M${pts.join("L")}Z`
}

function diamondPath(cx: number, cy: number, r: number): string {
  return `M${cx},${cy - r} L${cx + r * 0.85},${cy} L${cx},${cy + r} L${cx - r * 0.85},${cy} Z`
}

// ─── Label ───────────────────────────────────────────────────────────────────

interface LabelProps {
  label: string; cx: number; cy: number; r: number
  labelOffset: number; labelType: LabelType; color: string
  fontSize: number; status: string; stroke: string
}

function NodeLabel({ label, cx, cy, r, labelOffset, labelType, color, fontSize, status, stroke }: LabelProps) {
  if (labelType === "none") return null

  if (labelType === "inline") {
    return (
      <text x={cx} y={cy + fontSize * 0.35} textAnchor="middle"
        fontSize={Math.min(fontSize, r * 0.6)} fill={color} fontWeight="500"
        style={{ pointerEvents: "none", userSelect: "none" }}>
        {label.length > 6 ? label.slice(0, 5) + "…" : label}
      </text>
    )
  }

  if (labelType === "badge") {
    const pd = 6
    const textW = Math.max(label.length * fontSize * 0.55, 28)
    const bw = textW + pd * 2; const bh = fontSize + pd
    const bx = cx - bw / 2; const by = cy + r + labelOffset - bh / 2
    const cols: Record<string, string> = { active: "#22C55E", done: "#3B82F6", pending: "#F59E0B", default: "#94A3B8" }
    const bc = cols[status] || cols.default
    return (
      <g>
        <rect x={bx} y={by} width={bw} height={bh} rx={bh / 2} fill={bc} opacity={0.15} />
        <rect x={bx} y={by} width={bw} height={bh} rx={bh / 2} fill="none" stroke={bc} strokeWidth={1} opacity={0.5} />
        <text x={cx} y={by + bh * 0.68} textAnchor="middle" fontSize={fontSize} fill={color} fontWeight="600"
          style={{ pointerEvents: "none", userSelect: "none" }}>{label}</text>
      </g>
    )
  }

  if (labelType === "tooltip") {
    const pd = 6
    const textW = Math.max(label.length * fontSize * 0.55, 32)
    const bw = textW + pd * 2; const bh = fontSize + pd * 1.5
    const bx = cx - bw / 2; const by = cy + r + labelOffset
    return (
      <g>
        <rect x={bx} y={by} width={bw} height={bh} rx={4} fill="rgba(15,23,42,0.88)" />
        <polygon points={`${cx - 5},${by} ${cx + 5},${by} ${cx},${by - 5}`} fill="rgba(15,23,42,0.88)" />
        <text x={cx} y={by + bh * 0.67} textAnchor="middle" fontSize={fontSize} fill="#F8FAFC" fontWeight="500"
          style={{ pointerEvents: "none", userSelect: "none" }}>{label}</text>
      </g>
    )
  }

  // default
  return (
    <text x={cx} y={cy + r + labelOffset} textAnchor="middle" fontSize={fontSize} fill={color}
      style={{ pointerEvents: "none", userSelect: "none" }}>{label}</text>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export const NodeTypeRenderer: FC<NodeRenderProps & { nodeType?: NodeType; labelType?: LabelType }> = (props) => {
  const { node, position: { cx, cy }, radius: r, isActive, isDone, isPending, onClick,
    nodeType = "circle", labelType = "default", labelOffset = 14, showLabels = true } = props

  const { preset } = useFlowChartContext()
  const tokens = preset.tokens
  const status = isActive ? "active" : isDone ? "done" : isPending ? "pending" : "default"
  const style = tokens.node[status]
  const labelColor = tokens.typography.nodeLabel.color
  const fontSize = tokens.typography.nodeLabel.fontSize

  // Icon color: white on filled backgrounds (active), stroke color otherwise
  const iconColor = isActive
    ? "#FFFFFF"
    : style.stroke

  const labelEl = showLabels ? (
    <NodeLabel label={node.label} cx={cx} cy={cy} r={r}
      labelOffset={labelOffset} labelType={labelType} color={labelColor}
      fontSize={fontSize} status={status} stroke={style.stroke} />
  ) : null

  const handleClick = () => onClick(node)

  if (nodeType === "diamond") {
    const dr = r * 1.15
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <path d={diamondPath(cx, cy, dr)} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        {isActive && <IconBolt cx={cx} cy={cy} r={r} color={iconColor} />}
        {isDone && <IconCheck cx={cx} cy={cy} r={r} color={iconColor} />}
        {isPending && <IconClock cx={cx} cy={cy} r={r} color={iconColor} />}
        {!isActive && !isDone && !isPending && (
          <text x={cx} y={cy + fontSize * 0.35} textAnchor="middle" fontSize={fontSize * 0.85} fill={iconColor} fontWeight="700">?</text>
        )}
        {labelEl}
      </g>
    )
  }

  if (nodeType === "hexagon" || nodeType === "icon-tech") {
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <path d={hexagonPath(cx, cy, r)} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        {isActive && <IconBolt cx={cx} cy={cy} r={r} color={iconColor} />}
        {isDone && <IconCheck cx={cx} cy={cy} r={r} color={iconColor} />}
        {isPending && <IconX cx={cx} cy={cy} r={r} color={iconColor} />}
        {!isActive && !isDone && !isPending && <IconCode cx={cx} cy={cy} r={r} color={iconColor} />}
        {labelEl}
      </g>
    )
  }

  if (nodeType === "rounded-rect") {
    const w = r * 2.6; const h = r * 1.45
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2}
          fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        {isActive && <IconPlay cx={cx - r * 0.5} cy={cy} r={r * 0.72} color={iconColor} />}
        {isDone && <IconCheck cx={cx - r * 0.5} cy={cy} r={r * 0.72} color={iconColor} />}
        {isPending && <IconClock cx={cx - r * 0.5} cy={cy} r={r * 0.72} color={iconColor} />}
        {!isActive && !isDone && !isPending && <IconArrowRight cx={cx - r * 0.5} cy={cy} r={r * 0.72} color={iconColor} />}
        {showLabels && labelType !== "inline" && (
          <text x={cx + r * 0.35} y={cy + fontSize * 0.35}
            textAnchor="middle" fontSize={Math.min(fontSize, r * 0.56)} fill={labelColor} fontWeight="500"
            style={{ pointerEvents: "none", userSelect: "none" }}>
            {node.label.length > 7 ? node.label.slice(0, 6) + "…" : node.label}
          </text>
        )}
      </g>
    )
  }

  if (nodeType === "icon-workflow") {
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <circle cx={cx} cy={cy} r={r} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        {isActive && (
          <>
            <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke={iconColor} strokeWidth={1} opacity={0.35} />
            <IconPlay cx={cx} cy={cy} r={r} color={iconColor} />
          </>
        )}
        {isDone && (
          <>
            <circle cx={cx} cy={cy} r={r * 0.68} fill={style.stroke} opacity={0.18} />
            <IconCheck cx={cx} cy={cy} r={r} color={style.stroke} />
          </>
        )}
        {isPending && (
          <>
            <circle cx={cx} cy={cy} r={r * 0.68} fill={style.stroke} opacity={0.13} />
            <IconClock cx={cx} cy={cy} r={r} color={style.stroke} />
          </>
        )}
        {!isActive && !isDone && !isPending && (
          <>
            <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={style.stroke} strokeWidth={1} strokeDasharray="3,2.5" opacity={0.55} />
            <circle cx={cx} cy={cy} r={r * 0.13} fill={style.stroke} opacity={0.65} />
          </>
        )}
        {labelEl}
      </g>
    )
  }

  if (nodeType === "icon-status") {
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <circle cx={cx} cy={cy} r={r} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke={style.stroke} strokeWidth={0.75} opacity={0.3} />
        {isActive && (
          <polygon
            points={`${cx},${cy - r * 0.38} ${cx + r * 0.34},${cy + r * 0.22} ${cx - r * 0.34},${cy + r * 0.22}`}
            fill={iconColor} opacity={0.9}
          />
        )}
        {isDone && <IconCheck cx={cx} cy={cy} r={r} color={iconColor} />}
        {isPending && <IconClock cx={cx} cy={cy} r={r} color={iconColor} />}
        {!isActive && !isDone && !isPending && (
          <circle cx={cx} cy={cy} r={r * 0.22} fill={style.stroke} opacity={0.5} />
        )}
        {labelEl}
      </g>
    )
  }

  if (nodeType === "icon-kanban") {
    const w = r * 2.6; const h = r * 1.7; const headerH = h * 0.3
    const statusColor = isActive ? "#FF6B35" : isDone ? "#4CAF50" : isPending ? "#FFC107" : style.stroke
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={5}
          fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={headerH} rx={5} fill={statusColor} opacity={0.9} />
        <rect x={cx - w / 2} y={cy - h / 2 + headerH * 0.55} width={w} height={headerH * 0.45} fill={statusColor} opacity={0.9} />
        <line x1={cx - w * 0.32} y1={cy + h * 0.06} x2={cx + w * 0.32} y2={cy + h * 0.06}
          stroke={style.stroke} strokeWidth={1} opacity={0.35} />
        <line x1={cx - w * 0.32} y1={cy + h * 0.2} x2={cx + w * 0.12} y2={cy + h * 0.2}
          stroke={style.stroke} strokeWidth={1} opacity={0.2} />
        {showLabels && (
          <text x={cx} y={cy - h / 2 + headerH * 0.72}
            textAnchor="middle" fontSize={fontSize * 0.82} fill="#FFFFFF" fontWeight="700"
            style={{ pointerEvents: "none", userSelect: "none" }}>
            {node.label.length > 8 ? node.label.slice(0, 7) + "…" : node.label}
          </text>
        )}
      </g>
    )
  }

  if (nodeType === "icon-blueprint") {
    const bs = r * 1.5
    return (
      <g onClick={handleClick} style={{ cursor: "pointer" }}>
        <rect x={cx - bs} y={cy - bs} width={bs * 2} height={bs * 2} rx={3}
          fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
        {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([dx, dy], i) => (
          <g key={i}>
            <line x1={cx + dx * bs} y1={cy + dy * bs}
              x2={cx + dx * bs} y2={cy + dy * (bs - bs * 0.3)}
              stroke={style.stroke} strokeWidth={1} opacity={0.65} />
            <line x1={cx + dx * bs} y1={cy + dy * bs}
              x2={cx + dx * (bs - bs * 0.3)} y2={cy + dy * bs}
              stroke={style.stroke} strokeWidth={1} opacity={0.65} />
          </g>
        ))}
        <line x1={cx - bs * 0.55} y1={cy - bs * 0.72} x2={cx - bs * 0.55} y2={cy + bs * 0.72}
          stroke={style.stroke} strokeWidth={0.5} opacity={0.25} />
        <line x1={cx + bs * 0.55} y1={cy - bs * 0.72} x2={cx + bs * 0.55} y2={cy + bs * 0.72}
          stroke={style.stroke} strokeWidth={0.5} opacity={0.25} />
        <line x1={cx - bs * 0.72} y1={cy} x2={cx + bs * 0.72} y2={cy}
          stroke={style.stroke} strokeWidth={0.5} opacity={0.25} />
        {isActive && <IconBolt cx={cx} cy={cy} r={r * 0.52} color={style.stroke} />}
        {isDone && <IconCheck cx={cx} cy={cy} r={r * 0.52} color={style.stroke} />}
        {isPending && <IconClock cx={cx} cy={cy} r={r * 0.52} color={style.stroke} />}
        {!isActive && !isDone && !isPending && (
          <circle cx={cx} cy={cy} r={r * 0.22} fill="none" stroke={style.stroke} strokeWidth={1.5} />
        )}
        {labelEl}
      </g>
    )
  }

  // circle (default)
  return (
    <g onClick={handleClick} style={{ cursor: "pointer" }}>
      <circle cx={cx} cy={cy} r={r} fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
      {isActive && <IconPlay cx={cx} cy={cy} r={r} color={iconColor} />}
      {isDone && <IconCheck cx={cx} cy={cy} r={r} color={iconColor} />}
      {isPending && <IconClock cx={cx} cy={cy} r={r} color={iconColor} />}
      {!isActive && !isDone && !isPending && <IconCircleDot cx={cx} cy={cy} r={r} color={iconColor} />}
      {labelEl}
    </g>
  )
}
