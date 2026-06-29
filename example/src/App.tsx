import { useState } from 'react'
import {
  FlowChart,
  FlowChartProvider,
  useFlowChart,
  generatePath,
  type FlowChartMode,
  type NodeType,
  type EdgeType,
  type LabelType,
  type Theme,
  type FlowNode,
  type FlowEdge,
  type NodeRenderProps,
  type EdgeRenderProps,
} from 'react-flowchart-kit'

// ─── Shared data ──────────────────────────────────────────────────────────────

const pipelineNodes: FlowNode[] = [
  { id: 'source', label: 'Source',  status: 'done'    },
  { id: 'build',  label: 'Build',   status: 'done'    },
  { id: 'test',   label: 'Test',    status: 'active'  },
  { id: 'deploy', label: 'Deploy',  status: 'pending' },
  { id: 'live',   label: 'Live',    status: 'pending' },
]
const pipelineEdges: FlowEdge[] = [
  { id: 'e1', source: 'source', target: 'build'  },
  { id: 'e2', source: 'build',  target: 'test'   },
  { id: 'e3', source: 'test',   target: 'deploy' },
  { id: 'e4', source: 'deploy', target: 'live'   },
]

const processNodes: FlowNode[] = [
  { id: 'start',   label: 'Start',   status: 'done'    },
  { id: 'review',  label: 'Review',  status: 'done'    },
  { id: 'approve', label: 'Approve', status: 'active',  row: 0 },
  { id: 'reject',  label: 'Reject',  status: 'pending', row: 1 },
  { id: 'end',     label: 'End',     status: 'pending' },
]
const processEdges: FlowEdge[] = [
  { id: 'e1', source: 'start',   target: 'review'  },
  { id: 'e2', source: 'review',  target: 'approve' },
  { id: 'e3', source: 'review',  target: 'reject',  dashed: true, label: 'No' },
  { id: 'e4', source: 'approve', target: 'end'     },
]

const networkNodes: FlowNode[] = [
  { id: 'hub',  label: 'Hub',   status: 'active'  },
  { id: 'a',    label: 'Alpha', status: 'done',    row: 0 },
  { id: 'b',    label: 'Beta',  status: 'done',    row: 1 },
  { id: 'c',    label: 'Gamma', status: 'pending', row: 2 },
  { id: 'sink', label: 'Sink',  status: 'pending' },
]
const networkEdges: FlowEdge[] = [
  { id: 'e1', source: 'hub', target: 'a'    },
  { id: 'e2', source: 'hub', target: 'b'    },
  { id: 'e3', source: 'hub', target: 'c'    },
  { id: 'e4', source: 'a',   target: 'sink' },
  { id: 'e5', source: 'b',   target: 'sink' },
  { id: 'e6', source: 'c',   target: 'sink' },
]

const kanbanNodes: FlowNode[] = [
  { id: 'todo1', label: 'Design',   status: 'done'    },
  { id: 'todo2', label: 'API',      status: 'done',    row: 1 },
  { id: 'doing', label: 'Frontend', status: 'active'  },
  { id: 'review',label: 'QA',       status: 'pending' },
  { id: 'done',  label: 'Ship',     status: 'pending' },
]
const kanbanEdges: FlowEdge[] = [
  { id: 'e1', source: 'todo1', target: 'doing'  },
  { id: 'e2', source: 'todo2', target: 'doing'  },
  { id: 'e3', source: 'doing', target: 'review' },
  { id: 'e4', source: 'review',target: 'done'   },
]

const blueprintNodes: FlowNode[] = [
  { id: 'in',    label: 'Input',   status: 'done'    },
  { id: 'p1',    label: 'Proc-1',  status: 'done',    row: 0 },
  { id: 'p2',    label: 'Proc-2',  status: 'active',  row: 1 },
  { id: 'merge', label: 'Merge',   status: 'pending' },
  { id: 'out',   label: 'Output',  status: 'pending' },
]
const blueprintEdges: FlowEdge[] = [
  { id: 'e1', source: 'in',    target: 'p1'    },
  { id: 'e2', source: 'in',    target: 'p2'    },
  { id: 'e3', source: 'p1',    target: 'merge' },
  { id: 'e4', source: 'p2',    target: 'merge' },
  { id: 'e5', source: 'merge', target: 'out'   },
]

// ─── Preset definitions ───────────────────────────────────────────────────────

const PRESETS: {
  mode: FlowChartMode
  label: string
  nodeType: NodeType
  edgeType: EdgeType
  labelType: LabelType
  edgeStyle: any
  nodeRadius: number
  colGap: number
  nodes: FlowNode[]
  edges: FlowEdge[]
  desc: string
}[] = [
  {
    mode: 'pipeline', label: 'Pipeline', nodeType: 'icon-workflow', edgeType: 'animated',
    labelType: 'badge', edgeStyle: 'orthogonal', nodeRadius: 26, colGap: 96,
    nodes: pipelineNodes, edges: pipelineEdges,
    desc: 'CI/CD & build flows — animated edges, workflow icons, badge labels',
  },
  {
    mode: 'process', label: 'Process', nodeType: 'diamond', edgeType: 'labeled',
    labelType: 'tooltip', edgeStyle: 'orthogonal-with-smooth-angles', nodeRadius: 24, colGap: 90,
    nodes: processNodes, edges: processEdges,
    desc: 'Business process flows — diamond nodes, labeled edges, tooltip labels',
  },
  {
    mode: 'network', label: 'Network', nodeType: 'icon-status', edgeType: 'solid',
    labelType: 'badge', edgeStyle: 'smooth', nodeRadius: 22, colGap: 80,
    nodes: networkNodes, edges: networkEdges,
    desc: 'Network topology — status icons, smooth solid edges, badge labels',
  },
  {
    mode: 'kanban', label: 'Kanban', nodeType: 'icon-kanban', edgeType: 'default',
    labelType: 'none', edgeStyle: 'step', nodeRadius: 28, colGap: 100,
    nodes: kanbanNodes, edges: kanbanEdges,
    desc: 'Kanban task boards — card nodes with inline labels, step edges',
  },
  {
    mode: 'blueprint', label: 'Blueprint', nodeType: 'icon-blueprint', edgeType: 'thick',
    labelType: 'default', edgeStyle: 'orthogonal', nodeRadius: 28, colGap: 88,
    nodes: blueprintNodes, edges: blueprintEdges,
    desc: 'Technical diagrams — blueprint grid nodes, thick edges',
  },
  {
    mode: 'modern', label: 'Modern', nodeType: 'hexagon', edgeType: 'arrow-both',
    labelType: 'default', edgeStyle: 'smooth', nodeRadius: 24, colGap: 96,
    nodes: pipelineNodes, edges: pipelineEdges,
    desc: 'Modern UI flows — hexagon nodes, bidirectional arrow edges',
  },
]

const NODE_TYPES: NodeType[] = [
  'circle', 'diamond', 'hexagon', 'rounded-rect',
  'icon-workflow', 'icon-status', 'icon-tech', 'icon-kanban', 'icon-blueprint',
]
const EDGE_TYPES: EdgeType[] = ['default', 'solid', 'animated', 'thick', 'arrow-both', 'labeled']
const LABEL_TYPES: LabelType[] = ['default', 'badge', 'tooltip', 'inline', 'none']

// ─── Custom node example ──────────────────────────────────────────────────────

function StarNode({ node, position, radius, isActive, isDone, isPending, onClick }: NodeRenderProps) {
  const fill = isActive ? '#F59E0B' : isDone ? '#10B981' : isPending ? '#6366F1' : '#94A3B8'
  const r = radius
  const pts = Array.from({ length: 5 }, (_, i) => {
    const outer = (i * Math.PI * 2) / 5 - Math.PI / 2
    const inner = outer + Math.PI / 5
    return [
      `${position.cx + Math.cos(outer) * r},${position.cy + Math.sin(outer) * r}`,
      `${position.cx + Math.cos(inner) * r * 0.42},${position.cy + Math.sin(inner) * r * 0.42}`,
    ]
  }).flat().join(' ')
  return (
    <g onClick={() => onClick(node)} style={{ cursor: 'pointer' }}>
      <polygon points={pts} fill={fill} stroke="#fff" strokeWidth={1.5} />
      <text x={position.cx} y={position.cy + r + 14} textAnchor="middle" fontSize={11} fill="#374151">
        {node.label}
      </text>
    </g>
  )
}

// ─── Custom edge example ──────────────────────────────────────────────────────

function GradientEdge({ edge, source, sourcePosition, targetPosition, isVisited, style, direction }: EdgeRenderProps) {
  const path = generatePath(
    sourcePosition.cx, sourcePosition.cy,
    targetPosition.cx, targetPosition.cy,
    source.row ?? 0, style, direction
  )
  const gradId = `grad-${edge.id ?? `${edge.source}-${edge.target}`}`
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={isVisited ? '#22C55E' : '#94A3B8'} />
          <stop offset="100%" stopColor={isVisited ? '#3B82F6' : '#CBD5E1'} />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={`url(#${gradId})`}
        strokeWidth={isVisited ? 2.5 : 1.5}
        strokeLinejoin="round"
        strokeDasharray={isVisited ? undefined : '5,4'}
      />
    </>
  )
}

// ─── Headless example ─────────────────────────────────────────────────────────

function HeadlessChart({ nodes, edges }: { nodes: FlowNode[]; edges: FlowEdge[] }) {
  const { layout, visitedEdges, preset } = useFlowChart(nodes, edges)
  const { positions, width, height } = layout
  const tokens = preset.tokens
  const pad = 40

  return (
    <svg width={width + pad * 2 + 44} height={height + pad * 2 + 44}>
      {edges.map((edge, i) => {
        const src = positions[edge.source]
        const tgt = positions[edge.target]
        if (!src || !tgt) return null
        const visited = visitedEdges.has(`${edge.source}->${edge.target}`)
        const path = generatePath(src.cx + pad, src.cy + pad, tgt.cx + pad, tgt.cy + pad, 0, 'smooth', 'ltr')
        return (
          <path key={i} d={path} fill="none"
            stroke={visited ? tokens.edge.visited.stroke : tokens.edge.default.stroke}
            strokeWidth={visited ? tokens.edge.visited.strokeWidth : tokens.edge.default.strokeWidth}
            strokeDasharray={visited ? undefined : '5,4'}
          />
        )
      })}
      {nodes.map((node) => {
        const pos = positions[node.id]
        if (!pos) return null
        const s = node.status === 'active' ? tokens.node.active
          : node.status === 'done' ? tokens.node.done
          : node.status === 'pending' ? tokens.node.pending
          : tokens.node.default
        return (
          <g key={node.id}>
            <circle cx={pos.cx + pad} cy={pos.cy + pad} r={22}
              fill={s.fill} stroke={s.stroke} strokeWidth={s.strokeWidth} />
            <text x={pos.cx + pad} y={pos.cy + pad + 36}
              textAnchor="middle" fontSize={11} fill={tokens.typography.nodeLabel.color}>
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type Tab = 'presets' | 'compound' | 'custom' | 'headless'

export default function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [tab, setTab] = useState<Tab>('presets')
  const [activePreset, setActivePreset] = useState(0)
  const [nt, setNt] = useState<NodeType>('circle')
  const [et, setEt] = useState<EdgeType>('default')
  const [lt, setLt] = useState<LabelType>('default')

  const isDark = theme === 'dark'
  const p = PRESETS[activePreset]

  const bg     = isDark ? '#0F172A' : '#F1F5F9'
  const card   = isDark ? '#1E293B' : '#FFFFFF'
  const border = isDark ? '#334155' : '#E2E8F0'
  const text   = isDark ? '#E2E8F0' : '#1E293B'
  const sub    = isDark ? '#94A3B8' : '#64748B'
  const accent = '#6366F1'
  const code   = isDark ? '#0F172A' : '#1E293B'

  const TABS: { id: Tab; label: string }[] = [
    { id: 'presets',  label: '📦 Preset Modes' },
    { id: 'compound', label: '🔀 Compound Types' },
    { id: 'custom',   label: '✏️ Custom Renderers' },
    { id: 'headless', label: '⚙️ Headless' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, padding: 24, transition: 'all 0.3s',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px' }}>react-flowchart-kit</h1>
          <p style={{ fontSize: 13, color: sub, marginTop: 3 }}>
            6 presets · 9 node types · 6 edge types · 5 label types · full dark theme
          </p>
        </div>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${border}`,
            background: card, color: text, cursor: 'pointer', fontSize: 13 }}>
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${border}`, paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: 13,
            background: 'transparent', color: tab === t.id ? accent : sub, fontWeight: tab === t.id ? 600 : 400,
            borderBottom: tab === t.id ? `2px solid ${accent}` : '2px solid transparent',
            marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Presets tab ── */}
      {tab === 'presets' && (
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {PRESETS.map((pr, i) => (
              <button key={pr.mode} onClick={() => setActivePreset(i)} style={{
                padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12,
                border: `1.5px solid ${i === activePreset ? accent : border}`,
                background: i === activePreset ? accent + '18' : 'transparent',
                color: i === activePreset ? accent : sub, fontWeight: i === activePreset ? 600 : 400,
              }}>
                {pr.label}
              </button>
            ))}
          </div>

          {/* Info card */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: sub }}>{p.desc}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {[['mode', p.mode], ['nodeType', p.nodeType], ['edgeType', p.edgeType], ['labelType', p.labelType], ['edgeStyle', p.edgeStyle]].map(([k, v]) => (
                <span key={k} style={{ padding: '2px 9px', borderRadius: 5, fontSize: 11,
                  background: isDark ? '#0F172A' : '#F1F5F9', fontFamily: 'monospace' }}>
                  <span style={{ color: accent }}>{k}</span>=<span style={{ color: text }}>"{v}"</span>
                </span>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}` }}>
            <FlowChart nodes={p.nodes} edges={p.edges}
              mode={p.mode} nodeType={p.nodeType} edgeType={p.edgeType}
              labelType={p.labelType} edgeStyle={p.edgeStyle}
              theme={theme} height={260} animated showLabels
              nodeRadius={p.nodeRadius} colGap={p.colGap} rowGap={80}
            />
          </div>

          {/* Code */}
          <pre style={{ marginTop: 10, background: code, color: '#94A3B8', padding: '14px 18px',
            borderRadius: 10, fontSize: 12, lineHeight: 1.7, overflowX: 'auto' }}>{
`<FlowChart
  nodes={nodes}
  edges={edges}
  mode="${p.mode}"
  nodeType="${p.nodeType}"
  edgeType="${p.edgeType}"
  labelType="${p.labelType}"
  edgeStyle="${p.edgeStyle}"
  theme="${theme}"
  animated
/>`
          }</pre>
        </div>
      )}

      {/* ── Compound tab ── */}
      {tab === 'compound' && (
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
          {/* Controls */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {([
              ['Node Type', NODE_TYPES, nt, setNt],
              ['Edge Type', EDGE_TYPES, et, setEt],
              ['Label Type', LABEL_TYPES, lt, setLt],
            ] as const).map(([title, opts, val, setter]) => (
              <div key={title}>
                <div style={{ fontSize: 10, fontWeight: 700, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {(opts as readonly string[]).map(o => (
                    <button key={o} onClick={() => (setter as any)(o)} style={{
                      padding: '5px 10px', borderRadius: 6, textAlign: 'left', cursor: 'pointer',
                      border: `1.5px solid ${val === o ? accent : 'transparent'}`,
                      background: val === o ? accent + '18' : 'transparent',
                      color: val === o ? accent : sub, fontSize: 11, fontFamily: 'monospace',
                    }}>{o}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, marginBottom: 10 }}>
              <FlowChart nodes={pipelineNodes} edges={pipelineEdges}
                nodeType={nt} edgeType={et} labelType={lt}
                theme={theme} height={240} animated showLabels
                nodeRadius={nt === 'icon-blueprint' || nt === 'icon-kanban' ? 30 : 24}
                colGap={110} rowGap={80}
              />
            </div>
            <pre style={{ background: code, color: '#94A3B8', padding: '12px 16px',
              borderRadius: 10, fontSize: 12, lineHeight: 1.7 }}>{
`// Mix any types from different presets!
<FlowChart
  nodeType="${nt}"
  edgeType="${et}"
  labelType="${lt}"
  theme="${theme}"
/>`
            }</pre>
          </div>
        </div>
      )}

      {/* ── Custom renderers tab ── */}
      {tab === 'custom' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Custom Node (Star shape)</div>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, marginBottom: 8 }}>
              <FlowChart nodes={pipelineNodes} edges={pipelineEdges}
                customNode={StarNode} theme={theme} height={220} animated
                colGap={90} nodeRadius={22}
              />
            </div>
            <pre style={{ background: code, color: '#94A3B8', padding: '12px 16px',
              borderRadius: 10, fontSize: 11, lineHeight: 1.7 }}>{
`function StarNode({ node, position, radius,
  isActive, onClick }: NodeRenderProps) {
  const fill = isActive ? '#F59E0B' : '#94A3B8'
  // draw a 5-pointed star polygon ...
  return <g onClick={() => onClick(node)}>...</g>
}

<FlowChart customNode={StarNode} />`
            }</pre>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Custom Edge (Gradient)</div>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, marginBottom: 8 }}>
              <FlowChart nodes={pipelineNodes} edges={pipelineEdges}
                customEdge={GradientEdge} theme={theme} height={220} animated
                colGap={90} nodeRadius={22}
              />
            </div>
            <pre style={{ background: code, color: '#94A3B8', padding: '12px 16px',
              borderRadius: 10, fontSize: 11, lineHeight: 1.7 }}>{
`function GradientEdge({ edge, source,
  sourcePosition, targetPosition,
  isVisited, style, direction }: EdgeRenderProps) {
  const path = generatePath(...)
  return (
    <>
      <defs><linearGradient .../></defs>
      <path d={path} stroke="url(#grad)" />
    </>
  )
}

<FlowChart customEdge={GradientEdge} />`
            }</pre>
          </div>
        </div>
      )}

      {/* ── Headless tab ── */}
      {tab === 'headless' && (
        <div>
          <div style={{ fontSize: 13, color: sub, marginBottom: 14 }}>
            Use <code style={{ background: isDark ? '#0F172A' : '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>FlowChartProvider</code> +{' '}
            <code style={{ background: isDark ? '#0F172A' : '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>useFlowChart</code> to build a fully custom renderer
            while still using the layout engine, path tracing, and token system.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`,
              background: isDark ? '#1E293B' : '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <FlowChartProvider config={{ theme, nodeRadius: 22, colGap: 80, rowGap: 64 }} mode="modern">
                <HeadlessChart nodes={pipelineNodes} edges={pipelineEdges} />
              </FlowChartProvider>
            </div>
            <pre style={{ background: code, color: '#94A3B8', padding: '16px 18px',
              borderRadius: 12, fontSize: 11, lineHeight: 1.75, overflowX: 'auto' }}>{
`function HeadlessChart({ nodes, edges }) {
  // Access layout, visited edges, and preset tokens
  const { layout, visitedEdges, preset } =
    useFlowChart(nodes, edges)

  const { positions, width, height } = layout
  const tokens = preset.tokens

  return (
    <svg width={width + 80} height={height + 80}>
      {edges.map(edge => {
        const visited = visitedEdges
          .has(\`\${edge.source}->\${edge.target}\`)
        const path = generatePath(...)
        return (
          <path
            stroke={visited
              ? tokens.edge.visited.stroke
              : tokens.edge.default.stroke}
          />
        )
      })}
      {nodes.map(node => {
        const s = tokens.node[node.status ?? 'default']
        return (
          <circle fill={s.fill} stroke={s.stroke} />
        )
      })}
    </svg>
  )
}

// Wrap with provider to inject theme + config
<FlowChartProvider
  config={{ theme: 'dark', nodeRadius: 22 }}
  mode="modern"
>
  <HeadlessChart nodes={nodes} edges={edges} />
</FlowChartProvider>`
            }</pre>
          </div>
        </div>
      )}
    </div>
  )
}
