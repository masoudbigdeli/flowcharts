import { NodeRenderProps } from "../types"
import { NodeTypeRenderer } from "../node-types"

export function DefaultNode(props: NodeRenderProps) {
  return <NodeTypeRenderer {...props} nodeType={props.nodeType ?? "circle"} labelType={props.labelType ?? "default"} />
}
