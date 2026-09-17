import { isValidElement } from 'react'

export function readNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }

  if (typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(readNodeText).join('')
  }

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return readNodeText(node.props.children)
  }

  return ''
}
