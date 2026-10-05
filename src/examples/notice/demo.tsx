import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { useNotice } from '@/registry/ui/notice'

export function NoticeDemo() {
  const { show } = useNotice()

  function copyTripLink() {
    show({
      variant: AlertVariant.Success,
      title: 'Link copied',
      description: 'Anyone with the link can open this trip.',
      subject: (
        <Link
          to="/components/notice"
          className={cn(
            offsetFocusRingGeometry,
            'ring-ring focus-visible:ring-offset-card rounded-sm',
          )}
        >
          View the trip
        </Link>
      ),
    })
  }

  return (
    <Button variant={ButtonVariant.Outline} onClick={copyTripLink}>
      Copy the trip link
    </Button>
  )
}
