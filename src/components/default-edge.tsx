import { EdgeRenderProps } from "../types"
import { EdgeTypeRenderer } from "../edge-types"

export function DefaultEdge(props: EdgeRenderProps) {
  return <EdgeTypeRenderer {...props} edgeType={props.edgeType ?? "default"} />
}
