import type { RelatedPage } from './types'

export const fieldsRelatedPage: RelatedPage = {
  to: '/fields',
  label: 'Fields',
  description:
    'The label, description, error, loading, and disabled behaviour every field shares.',
}

export const choiceFieldsRelatedPage: RelatedPage = {
  to: '/fields',
  label: 'Fields',
  description: 'The label, error, and wrapper behaviour every field shares.',
}

export const formRelatedPage: RelatedPage = {
  to: '/components/form',
  label: 'Form',
  description: 'Lays fields out with an actions row and a result slot.',
}
