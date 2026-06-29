# Changelog

All notable changes to `react-flowchart-kit` will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2024-01-01

### Added

- **6 preset modes**: `default`, `minimal`, `modern`, `pipeline`, `process`, `network`, `kanban`, `blueprint` — each with full light and dark variants
- **9 node types** via `nodeType` prop: `circle`, `diamond`, `hexagon`, `rounded-rect`, `icon-workflow`, `icon-status`, `icon-tech`, `icon-kanban`, `icon-blueprint`
- **6 edge types** via `edgeType` prop: `default`, `solid`, `animated`, `thick`, `arrow-both`, `labeled`
- **5 label types** via `labelType` prop: `default`, `badge`, `tooltip`, `inline`, `none`
- SVG icon rendering per node status (active/done/pending/default) for every node type
- Full dark theme support — `theme` prop is always reactive, no stale closures
- `FlowChartProvider` + `useFlowChart` hook for headless/custom rendering
- `generatePath`, `computeLayout`, `findValidPathsToActiveNode` utilities
- `mergeThemes`, `createThemePreset` for programmatic theme construction
- Custom renderer support: `customNode`, `customEdge`, `customContainer` props
- Flow direction support: `ltr`, `rtl`, `ttb`, `btt`
- Edge path styles: `orthogonal`, `orthogonal-with-smooth-angles`, `smooth`, `straight`, `step`
- `themeColors` prop for fine-grained token overrides without leaving a preset
- `animated` fade-in on mount
- `onNodeClick` callback
- Full TypeScript types exported from package root
