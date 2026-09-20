import { useEffect } from 'react'

import { AlertVariant, NoticeProvider, useNotice } from 'flyingsalmon'
import type { NoticeInput } from 'flyingsalmon'

function NoticeOnMount({ notice }: { notice: NoticeInput }) {
  const { show } = useNotice()

  useEffect(() => {
    show(notice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export function Info() {
  return (
    <div className="relative h-56 w-full transform-gpu">
      <NoticeProvider>
        <NoticeOnMount
          notice={{
            variant: AlertVariant.Info,
            title: 'Link copied',
            description: 'Anyone with the link can open this trip.',
            subject: <a href="#">View the trip</a>,
          }}
        />
      </NoticeProvider>
    </div>
  )
}

export function Success() {
  return (
    <div className="relative h-56 w-full transform-gpu">
      <NoticeProvider>
        <NoticeOnMount
          notice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            description: 'Six days in Da Nang, ready to share.',
            subject: <a href="#">View the trip</a>,
          }}
        />
      </NoticeProvider>
    </div>
  )
}

export function Error() {
  return (
    <div className="relative h-56 w-full transform-gpu">
      <NoticeProvider>
        <NoticeOnMount
          notice={{
            variant: AlertVariant.Error,
            title: 'The trip could not be saved',
            description:
              'Our planner did not answer. Your Kyoto details are kept.',
            subject: <button type="button">Reopen the form</button>,
          }}
        />
      </NoticeProvider>
    </div>
  )
}
