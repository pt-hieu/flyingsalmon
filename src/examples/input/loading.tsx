import { useState } from 'react'

import { Input, InputType } from '@/registry/ui/input'

export function InputLoading() {
  const [email, setEmail] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string>()

  async function checkEmail() {
    if (!email) return

    setChecking(true)
    const isOnTrip = await isAlreadyOnTrip(email)
    setError(isOnTrip ? 'Linh is already on this trip' : undefined)
    setChecking(false)
  }

  return (
    <Input
      className="w-72"
      label="Invite by email"
      type={InputType.Email}
      placeholder="linh@example.com"
      description="Type linh@example.com, then tab out to check"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
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
