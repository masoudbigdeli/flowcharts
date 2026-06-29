# `@your-scope/flow-chart`

A highly customizable React flowchart component with **6 preset modes**, **9 node types**, **6 edge types**, **5 label types**, and full dark-theme support — all composable independently.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Preset Modes](#preset-modes)
  - [default](#default)
  - [minimal](#minimal)
  - [modern](#modern)
  - [pipeline](#pipeline)
  - [process](#process)
  - [network](#network)
  - [kanban](#kanban)
  - [blueprint](#blueprint)
- [Theming](#theming)
  - [Light / Dark](#light--dark)
  - [Custom Colors](#custom-colors)
- [Node Types](#node-types)
- [Edge Types](#edge-types)
- [Label Types](#label-types)
- [Compound Usage](#compound-usage)
- [Node Status](#node-status)
- [Layout & Direction](#layout--direction)
- [Edge Styles (Path Shapes)](#edge-styles-path-shapes)
- [Custom Renderers](#custom-renderers)
  - [Custom Node](#custom-node)
  - [Custom Edge](#custom-edge)
  - [Custom Container](#custom-container)
- [FlowChartProvider (headless)](#flowchartprovider-headless)
- [Full Props Reference](#full-props-reference)
- [TypeScript Types](#typescript-types)
- [Utilities & Hooks](#utilities--hooks)

---

## Installation

```bash
npm install @your-scope/flow-chart
# or
yarn add @your-scope/flow-chart
```

---

## Quick Start

```tsx
import { FlowChart } from '@your-scope/flow-chart'

const nodes = [
  { id: 'a', label: 'Start',   status: 'done'    },
  { id: 'b', label: 'Process', status: 'active'  },
  { id: 'c', label: 'End',     status: 'pending' },
]

const edges = [
  { id: 'e1', source: 'a', target: 'b' },
  { id: 'e2', source: 'b', target: 'c' },
]

export default function App() {
  return (
    <FlowChart
      nodes={nodes}
      edges={edges}
      theme="light"
      animated
    />
  )
}
```

---

## Preset Modes

The `mode` prop sets the entire visual identity of the chart — colors, spacing, default edge path style — for both light and dark themes simultaneously. You can always override individual aspects with `nodeType`, `edgeType`, `labelType`, and `themeColors`.

### `default`

Classic flowchart look with orthogonal edges and circle nodes.

```tsx
<FlowChart nodes={nodes} edges={edges} mode="default" theme="light" />
```

### `minimal`

Clean, low-contrast design. Good for embedding inside dashboards.

```tsx
<FlowChart nodes={nodes} edges={edges} mode="minimal" theme="light" />
```

### `modern`

Smooth curved edges, elevated shadows, a blue active accent.

```tsx
<FlowChart nodes={nodes} edges={edges} mode="modern" theme="dark" />
```

### `pipeline`

Purpose-built for CI/CD and build pipelines. Green monochrome palette with monospace labels.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="pipeline"
  nodeType="icon-workflow"
  edgeType="animated"
  labelType="badge"
  theme="dark"
/>
```

### `process`

Business process and decision-flow style. Blue palette with smooth-angle orthogonal edges.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="process"
  nodeType="diamond"
  edgeType="labeled"
  labelType="tooltip"
  theme="light"
/>
```

### `network`

Network topology and graph visualization. Purple accent, smooth paths.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="network"
  nodeType="icon-status"
  edgeType="solid"
  labelType="badge"
  theme="dark"
/>
```

### `kanban`

Card-style board flows. Orange accent, step-shaped edges.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="kanban"
  nodeType="icon-kanban"
  edgeType="default"
  labelType="none"
  theme="light"
/>
```

### `blueprint`

Technical engineering diagrams. Dark-blue grid aesthetic with monospace typography. This preset's primary style is dark; setting `theme="light"` produces an inverted light-blue variant.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="blueprint"
  nodeType="icon-blueprint"
  edgeType="thick"
  theme="dark"
/>
```

---

## Theming

### Light / Dark

Every preset ships with both a light and a dark variant. Changing `theme` always takes full effect — background, node fills, edge colors, and label colors all update together.

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('light')

<FlowChart nodes={nodes} edges={edges} mode="modern" theme={theme} />
```

### Custom Colors

Pass `themeColors` to override individual tokens without leaving the current preset. Any key you omit falls through to the preset's default.

```tsx
<FlowChart
  nodes={nodes}
  edges={edges}
  theme="dark"
  themeColors={{
    containerBackground: '#0D0D1A',
    containerBorder: '#1A1A3A',
    nodeActiveFill: '#7C3AED',
    nodeActiveStroke: '#A78BFA',
    edgeVisitedStroke: '#A78BFA',
    nodeLabelColor: '#E9D5FF',
  }}
/>
```

#### All `themeColors` keys

| Key | What it controls |
|-----|-----------------|
| `containerBackground` | Chart wrapper background |
| `containerBorder` | Chart wrapper border |
| `nodeDefaultFill` | Idle node fill |
| `nodeDefaultStroke` | Idle node border |
| `nodeDefaultStrokeWidth` | Idle node border width |
| `nodeActiveFill` | Active node fill |
| `nodeActiveStroke` | Active node border |
| `nodeActiveStrokeWidth` | Active node border width |
| `nodeDoneFill` | Done node fill |
| `nodeDoneStroke` | Done node border |
| `nodeDoneStrokeWidth` | Done node border width |
| `nodePendingFill` | Pending node fill |
| `nodePendingStroke` | Pending node border |
| `nodePendingStrokeWidth` | Pending node border width |
| `nodeLabelColor` | Label text color |
| `nodeLabelFontSize` | Label font size (px) |
| `edgeDefaultStroke` | Unvisited edge color |
| `edgeDefaultStrokeWidth` | Unvisited edge width |
| `edgeDefaultDashArray` | Unvisited edge dash pattern |
| `edgeVisitedStroke` | Visited path edge color |
| `edgeVisitedStrokeWidth` | Visited path edge width |
| `edgeDashedStroke` | Explicitly dashed edge color |
| `edgeDashedDashArray` | Explicitly dashed edge pattern |

---

## Node Types

The `nodeType` prop controls the shape and icon drawn for every node. Each type renders distinct SVG icons for `active`, `done`, and `pending` statuses.

| `nodeType` | Shape | Active icon | Done icon | Pending icon | Default icon |
|-----------|-------|-------------|-----------|-------------|--------------|
| `circle` | Circle | ▶ Play | ✓ Check | 🕐 Clock | ◎ Ring-dot |
| `diamond` | Diamond | ⚡ Bolt | ✓ Check | 🕐 Clock | `?` |
| `hexagon` | Hexagon | ⚡ Bolt | ✓ Check | ✕ X | `</>` Code |
| `rounded-rect` | Pill rectangle | ▶ Play (left) + inline text | ✓ Check | 🕐 Clock | → Arrow |
| `icon-workflow` | Circle with accent ring | ▶ Play | ✓ Check (filled bg) | 🕐 Clock (filled bg) | Dashed ring + dot |
| `icon-status` | Circle with concentric ring | △ Triangle | ✓ Check | 🕐 Clock | Center dot |
| `icon-tech` | Hexagon | ⚡ Bolt | ✓ Check | ✕ X | `</>` Code |
| `icon-kanban` | Card with color header bar | Orange header | Green header | Yellow header | Muted header |
| `icon-blueprint` | Grid rectangle with corner marks | ⚡ Bolt | ✓ Check | 🕐 Clock | Circle outline |

```tsx
// Diamond nodes — great for decision flows
<FlowChart nodes={nodes} edges={edges} nodeType="diamond" />

// Kanban cards — labels live inside the card header
<FlowChart nodes={nodes} edges={edges} nodeType="icon-kanban" labelType="none" />

// Blueprint technical nodes
<FlowChart nodes={nodes} edges={edges} nodeType="icon-blueprint" nodeRadius={28} />
```

> **Tip:** `rounded-rect`, `icon-kanban`, and `icon-blueprint` are wider than a circle. Increase `nodeRadius` to `26–32` and `colGap` to `100+` when using them so labels don't overlap.

---

## Edge Types

The `edgeType` prop controls the visual style of every edge, independent of the path shape (`edgeStyle`).

| `edgeType` | Description |
|-----------|-------------|
| `default` | Dashed when unvisited, solid when on an active path |
| `solid` | Always solid, with arrowhead |
| `animated` | CSS-animated dashes flowing in the direction of travel |
| `thick` | Heavier stroke weight, rounded caps |
| `arrow-both` | Arrowheads on both the source and target ends |
| `labeled` | Shows `edge.label` in a small badge at the midpoint |

```tsx
// Animated pipeline edges
<FlowChart nodes={nodes} edges={edges} edgeType="animated" />

// Labeled edges — set a label on individual edges
const edges = [
  { id: 'e1', source: 'a', target: 'b', label: 'Yes' },
  { id: 'e2', source: 'a', target: 'c', label: 'No',  dashed: true },
]
<FlowChart nodes={nodes} edges={edges} edgeType="labeled" />

// Bidirectional arrows
<FlowChart nodes={nodes} edges={edges} edgeType="arrow-both" />
```

---

## Label Types

The `labelType` prop controls how node labels are displayed.

| `labelType` | Description |
|------------|-------------|
| `default` | Plain text below the node |
| `badge` | Pill badge below the node, color-tinted by status |
| `tooltip` | Dark tooltip bubble with a pointer arrow |
| `inline` | Label text rendered inside the node shape (truncated) |
| `none` | No labels — useful when nodes are self-describing (e.g. `icon-kanban`) |

```tsx
<FlowChart nodes={nodes} edges={edges} labelType="badge" />
<FlowChart nodes={nodes} edges={edges} labelType="tooltip" />

// Kanban: labels are baked into the card header, so suppress the extra label
<FlowChart nodes={nodes} edges={edges} nodeType="icon-kanban" labelType="none" />
```

---

## Compound Usage

`nodeType`, `edgeType`, and `labelType` are fully orthogonal to `mode`. You can freely mix types from different presets:

```tsx
// Pipeline color scheme + blueprint nodes + animated edges + badge labels
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="pipeline"
  nodeType="icon-blueprint"
  edgeType="animated"
  labelType="badge"
  theme="dark"
/>

// Network colors + diamond nodes + thick edges + tooltips
<FlowChart
  nodes={nodes}
  edges={edges}
  mode="network"
  nodeType="diamond"
  edgeType="thick"
  labelType="tooltip"
  theme="light"
/>
```

---

## Node Status

Each node can carry a `status` field that drives its visual state (fill color, stroke, and icon):

| Status | Meaning |
|--------|---------|
| `"active"` | Currently running / in progress |
| `"done"` | Completed successfully |
| `"pending"` | Not yet reached |
| `"default"` (or omitted) | Idle / neutral |

The component also automatically traces the path from the start to the active node and highlights those edges as "visited".

```tsx
const nodes = [
  { id: '1', label: 'Checkout',  status: 'done'    },
  { id: '2', label: 'Payment',   status: 'done'    },
  { id: '3', label: 'Shipping',  status: 'active'  },
  { id: '4', label: 'Delivered', status: 'pending' },
]
```

---

## Layout & Direction

Control the flow direction with the `direction` prop:

| Value | Direction |
|-------|-----------|
| `"ltr"` | Left → Right (default) |
| `"rtl"` | Right → Left |
| `"ttb"` | Top → Bottom |
| `"btt"` | Bottom → Top |

For multi-lane layouts (nodes in parallel columns/rows), set `row` on each node:

```tsx
const nodes = [
  { id: 'start',   label: 'Start',   col: 0, row: 0 },
  { id: 'branch1', label: 'Branch A', col: 1, row: 0 },
  { id: 'branch2', label: 'Branch B', col: 1, row: 1 },
  { id: 'end',     label: 'End',      col: 2, row: 0 },
]

<FlowChart
  nodes={nodes}
  edges={edges}
  direction="ltr"
  colGap={100}
  rowGap={80}
/>
```

```tsx
// Top-to-bottom vertical flow
<FlowChart nodes={nodes} edges={edges} direction="ttb" />
```

---

## Edge Styles (Path Shapes)

`edgeStyle` controls the geometry of the path between nodes, independent of the visual style set by `edgeType`:

| `edgeStyle` | Path shape |
|------------|-----------|
| `"orthogonal"` | Right-angle bends (default) |
| `"orthogonal-with-smooth-angles"` | Right angles with rounded corners |
| `"smooth"` | Cubic bezier curves |
| `"straight"` | Direct straight lines |
| `"step"` | Manhattan-style stepped routing |

```tsx
<FlowChart nodes={nodes} edges={edges} edgeStyle="smooth" edgeType="animated" />
```

---

## Custom Renderers

All three rendering surfaces — nodes, edges, and the container — can be replaced entirely.

### Custom Node

```tsx
import type { NodeRenderProps } from '@your-scope/flow-chart'

function MyNode({ node, position, radius, isActive, isDone, isPending, onClick }: NodeRenderProps) {
  const fill = isActive ? '#7C3AED' : isDone ? '#059669' : '#64748B'
  return (
    <g onClick={() => onClick(node)} style={{ cursor: 'pointer' }}>
      <rect
        x={position.cx - radius}
        y={position.cy - radius * 0.6}
        width={radius * 2}
        height={radius * 1.2}
        rx={6}
        fill={fill}
      />
      <text x={position.cx} y={position.cy + 5} textAnchor="middle" fill="#fff" fontSize={11}>
        {node.label}
      </text>
    </g>
  )
}

<FlowChart nodes={nodes} edges={edges} customNode={MyNode} />
```

### Custom Edge

```tsx
import type { EdgeRenderProps } from '@your-scope/flow-chart'
import { generatePath } from '@your-scope/flow-chart'

function MyEdge({ edge, source, sourcePosition, targetPosition, isVisited, style, direction }: EdgeRenderProps) {
  const path = generatePath(
    sourcePosition.cx, sourcePosition.cy,
    targetPosition.cx, targetPosition.cy,
    source.row ?? 0, style, direction
  )
  return (
    <path
      d={path}
      fill="none"
      stroke={isVisited ? '#7C3AED' : '#CBD5E1'}
      strokeWidth={isVisited ? 2.5 : 1.5}
      strokeDasharray={isVisited ? undefined : '4,3'}
    />
  )
}

<FlowChart nodes={nodes} edges={edges} customEdge={MyEdge} />
```

### Custom Container

```tsx
import type { ContainerRenderProps } from '@your-scope/flow-chart'

function MyContainer({ children, height }: ContainerRenderProps) {
  return (
    <div style={{
      height,
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      borderRadius: 16,
      border: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}>
      {children}
    </div>
  )
}

<FlowChart nodes={nodes} edges={edges} customContainer={MyContainer} />
```

---

## FlowChartProvider (headless)

Use `FlowChartProvider` when you want to build a fully custom renderer that still consumes the layout engine, theme system, and path tracing.

```tsx
import {
  FlowChartProvider,
  useFlowChart,
  generatePath,
} from '@your-scope/flow-chart'

function CustomRenderer({ nodes, edges }) {
  const { layout, visitedEdges, config, preset } = useFlowChart(nodes, edges)
  const { positions, width, height } = layout
  const tokens = preset.tokens

  return (
    <svg width={width + 80} height={height + 80}>
      {edges.map((edge) => {
        const src = positions[edge.source]
        const tgt = positions[edge.target]
        if (!src || !tgt) return null
        const visited = visitedEdges.has(`${edge.source}->${edge.target}`)
        const path = generatePath(src.cx + 40, src.cy + 40, tgt.cx + 40, tgt.cy + 40, 0, 'smooth', 'ltr')
        return (
          <path
            key={edge.id}
            d={path}
            fill="none"
            stroke={visited ? tokens.edge.visited.stroke : tokens.edge.default.stroke}
            strokeWidth={visited ? tokens.edge.visited.strokeWidth : tokens.edge.default.strokeWidth}
          />
        )
      })}
      {nodes.map((node) => {
        const pos = positions[node.id]
        if (!pos) return null
        return (
          <circle
            key={node.id}
            cx={pos.cx + 40}
            cy={pos.cy + 40}
            r={20}
            fill={node.status === 'active' ? tokens.node.active.fill : tokens.node.default.fill}
            stroke={tokens.node.default.stroke}
            strokeWidth={1.5}
          />
        )
      })}
    </svg>
  )
}

export default function App() {
  return (
    <FlowChartProvider
      config={{ theme: 'dark', nodeRadius: 20, colGap: 80 }}
      mode="modern"
    >
      <CustomRenderer nodes={nodes} edges={edges} />
    </FlowChartProvider>
  )
}
```

---

## Full Props Reference

### `<FlowChart />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `FlowNode[]` | **required** | Array of node objects |
| `edges` | `FlowEdge[]` | **required** | Array of edge objects |
| `theme` | `'light' \| 'dark'` | `'light'` | Color scheme — always reactive to prop changes |
| `mode` | `FlowChartMode` | `'default'` | Visual preset (see [Preset Modes](#preset-modes)) |
| `nodeType` | `NodeType` | `'circle'` | Node shape and icon style |
| `edgeType` | `EdgeType` | `'default'` | Edge visual style |
| `labelType` | `LabelType` | `'default'` | Label display style |
| `edgeStyle` | `EdgeStyle` | `'orthogonal'` | Path geometry for edges |
| `direction` | `FlowDirection` | `'ltr'` | Flow direction |
| `themeColors` | `ThemeColors` | `{}` | Token-level color overrides |
| `nodeRadius` | `number` | `22` | Node size in pixels |
| `colGap` | `number` | `80` | Horizontal space between columns |
| `rowGap` | `number` | `64` | Vertical space between rows |
| `height` | `number` | `300` | Container height in pixels |
| `padding` | `number` | `40` | Inner SVG padding |
| `animated` | `boolean` | `false` | Fade-in animation on mount |
| `showLabels` | `boolean` | `true` | Show or hide all labels |
| `labelOffset` | `number` | `14` | Distance from node edge to label |
| `onNodeClick` | `(node: FlowNode) => void` | — | Click handler for nodes |
| `customNode` | `ComponentType<NodeRenderProps>` | — | Fully custom node renderer |
| `customEdge` | `ComponentType<EdgeRenderProps>` | — | Fully custom edge renderer |
| `customContainer` | `(props: ContainerRenderProps) => ReactNode` | — | Fully custom container |
| `className` | `string` | `''` | CSS class on the container |
| `containerStyle` | `CSSProperties` | `{}` | Inline styles on the container |

### `FlowNode`

```ts
interface FlowNode {
  id: string | number   // unique identifier
  label: string         // display text
  status?: 'default' | 'active' | 'done' | 'pending'
  row?: number          // lane index for parallel paths (0-based)
  col?: number          // column override (auto-computed from graph if omitted)
  data?: Record<string, any>  // arbitrary payload passed to custom renderers
}
```

### `FlowEdge`

```ts
interface FlowEdge {
  id?: string | number
  source: string | number   // id of source node
  target: string | number   // id of target node
  dashed?: boolean          // force dashed rendering
  label?: string            // text shown when edgeType="labeled"
  data?: Record<string, any>
}
```

---

## TypeScript Types

All public types are re-exported from the package root:

```ts
import type {
  FlowNode,
  FlowEdge,
  FlowChartProps,
  FlowChartConfig,
  FlowChartMode,
  NodeType,
  EdgeType,
  LabelType,
  NodeStatus,
  Theme,
  EdgeStyle,
  FlowDirection,
  NodeRenderProps,
  EdgeRenderProps,
  ContainerRenderProps,
  ThemePreset,
  ThemeTokens,
  ThemeOverride,
  NodeStyle,
  EdgeStyleTokens,
} from '@your-scope/flow-chart'
```

---

## Utilities & Hooks

### `useFlowChart(nodes, edges)`

Returns the computed layout, visited edge set, config, and resolved preset — must be called inside a `FlowChartProvider`.

```ts
const { layout, visitedEdges, config, preset, nodeMap } = useFlowChart(nodes, edges)

// layout.positions: Record<id, { cx, cy }>
// layout.width, layout.height: SVG dimensions
// visitedEdges: Set<"sourceId->targetId">
// preset.tokens: full ThemeTokens object
```

### `generatePath(x1, y1, x2, y2, sourceRow, edgeStyle, direction)`

Generates an SVG path `d` string for an edge. Useful in custom edge renderers.

```ts
import { generatePath } from '@your-scope/flow-chart'

const d = generatePath(100, 50, 300, 50, 0, 'smooth', 'ltr')
// → "M100,50 C200,50 200,50 300,50"
```

### `computeLayout(nodes, edges, nodeRadius, colGap, rowGap, direction)`

Runs the layout algorithm and returns positions without rendering anything.

```ts
import { computeLayout } from '@your-scope/flow-chart'

const { positions, width, height } = computeLayout(nodes, edges, 22, 80, 64, 'ltr')
```

### `getPreset(mode, theme)`

Returns the full `ThemePreset` object for a given mode and theme.

```ts
import { getPreset } from '@your-scope/flow-chart'

const preset = getPreset('pipeline', 'dark')
// → { tokens: { node: { active: { fill: '#16A34A', ... }, ... }, ... } }
```

### `mergeThemes(base, override)`

Deep-merges a partial theme override into a base preset.

```ts
import { mergeThemes, getPreset } from '@your-scope/flow-chart'

const myPreset = mergeThemes(getPreset('modern', 'dark'), {
  tokens: {
    node: {
      active: { fill: '#7C3AED', stroke: '#A78BFA', strokeWidth: 3 }
    }
  }
})
```

---

## License

MIT
