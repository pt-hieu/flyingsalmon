import { Link } from '@tanstack/react-router'

import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { useNotice } from '@/registry/ui/notice'
import type { NoticeInput } from '@/registry/ui/notice'

const tripLink = <Link to="/components/notice">View the trip</Link>

const notices: { label: string; notice: NoticeInput }[] = [
  {
    label: 'Info',
    notice: {
      variant: AlertVariant.Info,
      title: 'Link copied',
      description: 'Anyone with the link can open this trip.',
      subject: tripLink,
    },
  },
  {
    label: 'Success',
    notice: {
      variant: AlertVariant.Success,
      title: 'Trip saved',
      description: 'Six days in Lisbon, ready to share.',
      subject: tripLink,
    },
  },
  {
    label: 'Warning',
    notice: {
      variant: AlertVariant.Warning,
      title: 'Passport expires soon',
      description: 'Linh’s passport runs out a month after the trip.',
      subject: tripLink,
    },
  },
  {
    label: 'Error',
    notice: {
      variant: AlertVariant.Error,
      title: 'The trip could not be saved',
      description: 'The planner did not answer.',
      subject: tripLink,
    },
  },
]

export function NoticeVariants() {
  const { show } = useNotice()

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {notices.map(({ label, notice }) => (
        <Button
          key={label}
          variant={ButtonVariant.Outline}
          size={ButtonSize.Small}
          onClick={() => show(notice)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
