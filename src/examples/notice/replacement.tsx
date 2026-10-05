import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { useNotice } from '@/registry/ui/notice'

export function NoticeReplacement() {
  const { show } = useNotice()

  const tripLink = (
    <Link
      to="/components/notice"
      className={cn(
        offsetFocusRingGeometry,
        'ring-ring focus-visible:ring-offset-card rounded-sm',
      )}
    >
      View the trip
    </Link>
  )

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() =>
          show({
            variant: AlertVariant.Success,
            title: 'Trip saved',
            description: 'Six days in Lisbon, ready to share.',
            subject: tripLink,
          })
        }
      >
        Save the trip
      </Button>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() =>
          show({
            variant: AlertVariant.Error,
            title: 'The invite was not sent',
            description: 'The server did not answer.',
            subject: tripLink,
          })
        }
      >
        Invite a traveller
      </Button>
    </div>
  )
}
