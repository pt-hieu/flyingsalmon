import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Input } from '@/registry/ui/input'

const inviteLink = 'https://hottrip.app/join/lisbon-long-weekend'

export function InputEndAction() {
  const [copied, setCopied] = useState(false)

  async function copyInviteLink() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
  }

  return (
    <Input
      className="w-80"
      label="Invite link"
      value={inviteLink}
      readOnly
      onBlur={() => setCopied(false)}
      endAdornment={
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.FieldIcon}
          aria-label={copied ? 'Invite link copied' : 'Copy invite link'}
          icon={copied ? <Check /> : <Copy />}
          onClick={copyInviteLink}
        />
      }
    />
  )
}
