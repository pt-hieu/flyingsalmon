import { Link } from '@tanstack/react-router'

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
      subject: <Link to="/components/notice">View the trip</Link>,
    })
  }

  return (
    <Button variant={ButtonVariant.Outline} onClick={copyTripLink}>
      Copy the trip link
    </Button>
  )
}
