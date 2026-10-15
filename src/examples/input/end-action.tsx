import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Input } from '@/registry/ui/input'

const inviteLink = 'https://example.com/join/lisbon-long-weekend'

export function InputEndAction() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  async function copyInviteLink() {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopyFailed(true)
    }
  }

  return (
    <Input
      className="w-80"
      label="Invite link"
      value={inviteLink}
      readOnly
      error={
        copyFailed
          ? 'The link was not copied. Select it and copy it.'
          : undefined
      }
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
