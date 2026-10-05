import { Check, Copy, X } from 'lucide-react'

import { CopyState } from './types'

export const copyButtonContentByState = {
  [CopyState.Idle]: { label: 'Copy', icon: <Copy /> },
  [CopyState.Copied]: { label: 'Copied', icon: <Check /> },
  [CopyState.Failed]: { label: 'Copy failed', icon: <X /> },
}
