import { useRef, useState } from 'react'

import { Input, InputType } from '@/registry/ui/input'

export function InputLoading() {
  const [email, setEmail] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string>()
  const latestCheck = useRef(0)

  function changeEmail(nextEmail: string) {
    latestCheck.current += 1
    setEmail(nextEmail)
    setChecking(false)
    setError(undefined)
  }

  async function checkEmail() {
    if (!email) return

    latestCheck.current += 1
    const checkNumber = latestCheck.current
    setChecking(true)

    try {
      const isOnTrip = await isAlreadyOnTrip(email)

      if (checkNumber === latestCheck.current) {
        setError(isOnTrip ? 'Linh is already on this trip' : undefined)
      }
    } finally {
      if (checkNumber === latestCheck.current) setChecking(false)
    }
  }

  return (
    <Input
      className="w-72"
      label="Invite by email"
      type={InputType.Email}
      placeholder="linh@example.com"
      description="Type linh@example.com, then tab out to check"
      value={email}
      onChange={(event) => changeEmail(event.target.value)}
      onBlur={checkEmail}
      loading={checking}
      error={error}
    />
  )
}

async function isAlreadyOnTrip(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return email === 'linh@example.com'
}
