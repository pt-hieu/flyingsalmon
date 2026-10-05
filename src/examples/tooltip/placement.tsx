import { Button, ButtonVariant } from '@/registry/ui/button'
import { Tooltip, TooltipAlign, TooltipSide } from '@/registry/ui/tooltip'

export function TooltipPlacement() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip content="Opens above" side={TooltipSide.Top}>
        <Button variant={ButtonVariant.Outline}>Top</Button>
      </Tooltip>
      <Tooltip content="Opens below" side={TooltipSide.Bottom}>
        <Button variant={ButtonVariant.Outline}>Bottom</Button>
      </Tooltip>
      <Tooltip content="Opens to the left" side={TooltipSide.Left}>
        <Button variant={ButtonVariant.Outline}>Left</Button>
      </Tooltip>
      <Tooltip content="Opens to the right" side={TooltipSide.Right}>
        <Button variant={ButtonVariant.Outline}>Right</Button>
      </Tooltip>
      <Tooltip
        content="Lines up with the start"
        side={TooltipSide.Bottom}
        align={TooltipAlign.Start}
      >
        <Button variant={ButtonVariant.Outline}>Bottom, start</Button>
      </Tooltip>
    </div>
  )
}
