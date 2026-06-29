# Contributing

Thank you for your interest in contributing to `react-flowchart-kit`!

## Development setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/react-flowchart-kit.git
cd react-flowchart-kit

# 2. Install dependencies
npm install

# 3. Start the build in watch mode
npm run dev

# 4. In a separate terminal, run the example app
cd example
npm install
npm run dev
```

The example app at `http://localhost:5173` hot-reloads when you edit anything in `src/`.

## Project structure

```
src/
├── index.ts              # Public entry point — all exports
├── flow-chart.tsx        # Main <FlowChart> component
├── types/                # All TypeScript types
│   ├── core.ts           # Node, edge, prop, config types
│   ├── theme.ts          # Theme token types + createThemePreset()
│   └── presets.ts        # Preset registry types
├── core/                 # React context + provider
│   ├── flowchart-context.tsx
│   └── flowchart-provider.tsx
├── hooks/                # useFlowChart, useLayout, useVisitedPaths
├── presets/              # 9 built-in presets (light + dark each)
├── node-types/           # NodeTypeRenderer — all 9 node shapes + icons
├── edge-types/           # EdgeTypeRenderer — all 6 edge styles
├── renderers/            # Internal NodeRenderer, EdgeRenderer, ContainerRenderer
├── components/           # DefaultNode, DefaultEdge, DefaultContainer
├── styles/               # mergeThemes, getNodeStyle, getEdgeStyle
└── utils/                # Layout engine, path generators, path finder
```

## Adding a new preset

1. Create `src/presets/my-preset.ts` exporting `myPreset` (light) and `myPresetDark` (dark)
2. Register it in `src/presets/index.ts` under the `PRESETS` map
3. Add `'my-preset'` to the `FlowChartMode` union in `src/types/core.ts`
4. Export it from `src/index.ts`

## Adding a new node type

1. Add the string literal to the `NodeType` union in `src/types/core.ts`
2. Add a new `if (nodeType === 'my-type')` branch in `src/node-types/index.tsx`
3. Export the new type name from `src/index.ts` (it's covered by `export type { NodeType }`)

## Releasing a new version

```bash
# Bump version (patch | minor | major)
npm version patch

# Push the commit + tag — GitHub Actions will publish to npm automatically
git push origin main --follow-tags
```

## Code style

- TypeScript strict mode — no `any` unless genuinely necessary
- Functional components only, no class components
- Keep `src/node-types/index.tsx` and `src/edge-types/index.tsx` self-contained (no extra deps)
- No CSS files — all styling is inline or SVG attributes
