import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FieldErrorMessage, useFieldIds } from '@/registry/lib/field'

interface EmailFieldProps {
  id?: string
  hint?: string
  error?: string
}

function EmailField({ id, hint, error }: EmailFieldProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: hint ? 'email-hint' : undefined,
  })

  return (
    <>
      <label htmlFor={fieldId}>Email</label>
      <input id={fieldId} aria-describedby={describedBy} />
      {hint ? <p id="email-hint">{hint}</p> : null}
      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </>
  )
}

describe('useFieldIds with FieldErrorMessage', () => {
  it('labels the field through a generated id when the caller gives none', () => {
    render(<EmailField />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('id')
  })

  it('keeps the id the caller gives', () => {
    render(<EmailField id="work-email" />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'work-email')
  })

  it('leaves the field undescribed without a hint or an error', () => {
    render(<EmailField />)

    expect(screen.getByLabelText('Email')).not.toHaveAttribute(
      'aria-describedby',
    )
  })

  it('describes the field by its error message', () => {
    render(<EmailField error="Enter an email address" />)

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Enter an email address',
    )
  })

  it('describes the field by the caller hint when there is no error', () => {
    render(<EmailField hint="Use your work address" />)

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Use your work address',
    )
  })

  it('reads the caller hint before the error message', () => {
    render(
      <EmailField
        hint="Use your work address"
        error="Enter an email address"
      />,
    )

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Use your work address Enter an email address',
    )
  })

  it('renders nothing where the error message goes when there is no error', () => {
    const { container } = render(<FieldErrorMessage id="email-error" />)

    expect(container).toBeEmptyDOMElement()
  })
})
