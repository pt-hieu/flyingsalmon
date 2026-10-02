import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  FieldDescription,
  FieldErrorMessage,
  useFieldIds,
} from '@/registry/lib/field'

interface EmailFieldProps {
  id?: string
  hint?: string
  error?: string
  description?: string
}

function EmailField({ id, hint, error, description }: EmailFieldProps) {
  const { fieldId, errorMessageId, descriptionId, describedBy } = useFieldIds({
    id,
    error,
    description,
    describedBy: hint ? 'email-hint' : undefined,
  })

  return (
    <>
      <label htmlFor={fieldId}>Email</label>
      <input id={fieldId} aria-describedby={describedBy} />
      {hint ? <p id="email-hint">{hint}</p> : null}
      <FieldDescription id={descriptionId}>{description}</FieldDescription>
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

  it('describes the field by its description', () => {
    render(<EmailField description="We reply within a day" />)

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'We reply within a day',
    )
  })

  it('reads the error message before the description', () => {
    render(
      <EmailField
        description="We reply within a day"
        error="Enter an email address"
      />,
    )

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Enter an email address We reply within a day',
    )
  })

  it('reads the caller hint, then the error message, then the description', () => {
    render(
      <EmailField
        hint="Use your work address"
        description="We reply within a day"
        error="Enter an email address"
      />,
    )

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Use your work address Enter an email address We reply within a day',
    )
  })

  it('shows the description as text under the field', () => {
    render(<EmailField description="We reply within a day" />)

    expect(screen.getByText('We reply within a day')).toBeVisible()
  })

  it('renders nothing where the description goes when there is none', () => {
    const { container } = render(<FieldDescription id="email-description" />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing where the error message goes when there is no error', () => {
    const { container } = render(<FieldErrorMessage id="email-error" />)

    expect(container).toBeEmptyDOMElement()
  })
})
