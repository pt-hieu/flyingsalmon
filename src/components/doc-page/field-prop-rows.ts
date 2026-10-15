import type { PropRow } from './types'

const fieldErrorDescription =
  'The failure message. Turns the border, the ring, and the label destructive.'

export function fieldLabelRow(part: string): PropRow {
  return {
    name: 'label',
    type: 'string',
    description: `The visible label. Renders above the ${part} and is wired to it.`,
  }
}

export function fieldDescriptionRow(part: string): PropRow {
  return {
    name: 'description',
    type: 'string',
    description: `Helper text under the ${part}.`,
  }
}

export function fieldSizeRow(sizeType: string): PropRow {
  return {
    name: 'size',
    type: sizeType,
    default: `${sizeType}.Default`,
    description: 'Default and Small match the field heights of the same names.',
  }
}

export function fieldErrorRow(componentNote?: string): PropRow {
  return {
    name: 'error',
    type: 'string',
    description: componentNote
      ? `${fieldErrorDescription} ${componentNote}`
      : fieldErrorDescription,
  }
}

export const fieldDisabledRow: PropRow = {
  name: 'disabled',
  type: 'boolean',
  default: 'false',
  description:
    'Dims the field and its label and removes both from the tab order.',
}

export const fieldReadOnlyRow: PropRow = {
  name: 'readOnly',
  type: 'boolean',
  default: 'false',
  description:
    'Keeps the value readable on a muted background. The field stays focusable.',
}

export const fieldRequiredRow: PropRow = {
  name: 'required',
  type: 'boolean',
  default: 'false',
  description: 'Marks the label and sets the native attribute.',
}
