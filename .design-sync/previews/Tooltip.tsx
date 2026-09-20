import { Plus, Share2, Trash2 } from 'lucide-react'

import {
  Avatar,
  Button,
  ButtonSize,
  ButtonVariant,
  Tooltip,
  TooltipProvider,
  TooltipSide,
} from 'flyingsalmon'

export function IconActions() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip content="Add item" defaultOpen>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Icon}
            aria-label="Add item"
          >
            <Plus />
          </Button>
        </Tooltip>
        <Tooltip content="Share">
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Icon}
            aria-label="Share"
          >
            <Share2 />
          </Button>
        </Tooltip>
        <Tooltip content="Delete">
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Icon}
            aria-label="Delete"
          >
            <Trash2 />
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function AvatarLabel() {
  return (
    <TooltipProvider>
      <Tooltip content="Brian Nguyen" defaultOpen>
        <Avatar tabIndex={0} name="Brian Nguyen" />
      </Tooltip>
    </TooltipProvider>
  )
}

export function Placement() {
  return (
    <TooltipProvider>
      <div className="flex gap-10">
        <Tooltip content="Add item" side={TooltipSide.Right} defaultOpen>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Icon}
            aria-label="Add item"
          >
            <Plus />
          </Button>
        </Tooltip>
        <Tooltip content="Delete" side={TooltipSide.Bottom} defaultOpen>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Icon}
            aria-label="Delete"
          >
            <Trash2 />
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
