import registry from '../../registry.json'

export enum ComponentCategory {
  Inputs = 'inputs',
  DataDisplay = 'data-display',
  Feedback = 'feedback',
  SurfacesAndOverlays = 'surfaces-and-overlays',
  Navigation = 'navigation',
}

export const componentCategoryOrder = [
  ComponentCategory.Inputs,
  ComponentCategory.DataDisplay,
  ComponentCategory.Feedback,
  ComponentCategory.SurfacesAndOverlays,
  ComponentCategory.Navigation,
]

export const componentCategoryLabels: Record<ComponentCategory, string> = {
  [ComponentCategory.Inputs]: 'Inputs',
  [ComponentCategory.DataDisplay]: 'Data display',
  [ComponentCategory.Feedback]: 'Feedback',
  [ComponentCategory.SurfacesAndOverlays]: 'Surfaces & floating components',
  [ComponentCategory.Navigation]: 'Navigation',
}

const catalogEntries = [
  {
    to: '/components/button',
    label: 'Button',
    category: ComponentCategory.Inputs,
    aliases: ['action', 'cta', 'icon button', 'loading button'],
  },
  {
    to: '/components/calendar',
    label: 'Calendar',
    category: ComponentCategory.Inputs,
    aliases: ['month view', 'date grid'],
  },
  {
    to: '/components/checkbox',
    label: 'Checkbox',
    category: ComponentCategory.Inputs,
    aliases: ['check box', 'tick box'],
  },
  {
    to: '/components/combobox',
    label: 'Combobox',
    category: ComponentCategory.Inputs,
    aliases: ['autocomplete', 'typeahead', 'autosuggest', 'tags input'],
  },
  {
    to: '/components/date-picker',
    label: 'Date picker',
    category: ComponentCategory.Inputs,
    aliases: ['datepicker', 'date input', 'date range picker'],
  },
  {
    to: '/components/form',
    label: 'Form',
    category: ComponentCategory.Inputs,
    aliases: ['fieldset', 'form layout'],
  },
  {
    to: '/components/input',
    label: 'Input',
    category: ComponentCategory.Inputs,
    aliases: ['text field', 'textfield', 'text input'],
  },
  {
    to: '/components/number-field',
    label: 'Number field',
    category: ComponentCategory.Inputs,
    aliases: ['number input', 'numeric input', 'spin button'],
  },
  {
    to: '/components/radio-group',
    label: 'Radio group',
    category: ComponentCategory.Inputs,
    aliases: ['radio', 'radio button', 'option group'],
  },
  {
    to: '/components/select',
    label: 'Select',
    category: ComponentCategory.Inputs,
    aliases: ['dropdown', 'picker', 'listbox'],
  },
  {
    to: '/components/slider',
    label: 'Slider',
    category: ComponentCategory.Inputs,
    aliases: ['range', 'range input', 'stepped slider', 'scale'],
  },
  {
    to: '/components/switch',
    label: 'Switch',
    category: ComponentCategory.Inputs,
    aliases: ['toggle', 'toggle switch'],
  },
  {
    to: '/components/textarea',
    label: 'Textarea',
    category: ComponentCategory.Inputs,
    aliases: ['text area', 'multiline'],
  },
  {
    to: '/components/toggle-group',
    label: 'Toggle group',
    category: ComponentCategory.Inputs,
    aliases: ['segmented control', 'toggle buttons', 'button group'],
  },
  {
    to: '/components/avatar',
    label: 'Avatar',
    category: ComponentCategory.DataDisplay,
    aliases: ['profile picture', 'user image', 'initials'],
  },
  {
    to: '/components/avatar-group',
    label: 'Avatar group',
    category: ComponentCategory.DataDisplay,
    aliases: ['avatar stack', 'facepile'],
  },
  {
    to: '/components/badge',
    label: 'Badge',
    category: ComponentCategory.DataDisplay,
    aliases: ['chip', 'tag', 'pill', 'label'],
  },
  {
    to: '/components/separator',
    label: 'Separator',
    category: ComponentCategory.DataDisplay,
    aliases: ['divider', 'rule', 'hr'],
  },
  {
    to: '/components/sticker',
    label: 'Sticker',
    category: ComponentCategory.DataDisplay,
    aliases: ['illustration', 'doodle', 'drawing', 'spot illustration'],
  },
  {
    to: '/components/table',
    label: 'Table',
    category: ComponentCategory.DataDisplay,
    aliases: ['data grid', 'datagrid', 'data table'],
  },
  {
    to: '/components/timeline',
    label: 'Timeline',
    category: ComponentCategory.DataDisplay,
    aliases: ['activity feed', 'history'],
  },
  {
    to: '/components/alert',
    label: 'Alert',
    category: ComponentCategory.Feedback,
    aliases: ['callout', 'inline message'],
  },
  {
    to: '/components/empty-state',
    label: 'Empty state',
    category: ComponentCategory.Feedback,
    aliases: ['blank slate', 'zero state', 'no results'],
  },
  {
    to: '/components/error-state',
    label: 'Error state',
    category: ComponentCategory.Feedback,
    aliases: ['failed state', 'error page', 'retry'],
  },
  {
    to: '/components/notice',
    label: 'Notice',
    category: ComponentCategory.Feedback,
    aliases: ['toast', 'banner', 'snackbar', 'notification'],
  },
  {
    to: '/components/progress',
    label: 'Progress',
    category: ComponentCategory.Feedback,
    aliases: ['progress bar', 'loading bar', 'meter'],
  },
  {
    to: '/components/skeleton',
    label: 'Skeleton',
    category: ComponentCategory.Feedback,
    aliases: ['placeholder', 'shimmer'],
  },
  {
    to: '/components/spinner',
    label: 'Spinner',
    category: ComponentCategory.Feedback,
    aliases: ['loader', 'circular progress', 'activity indicator'],
  },
  {
    to: '/components/accordion',
    label: 'Accordion',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['collapse', 'collapsible', 'disclosure', 'expansion panel'],
  },
  {
    to: '/components/card',
    label: 'Card',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['paper', 'panel', 'tile'],
  },
  {
    to: '/components/dialog',
    label: 'Dialog',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['modal', 'popup', 'confirm'],
  },
  {
    to: '/components/drawer',
    label: 'Drawer',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['sheet', 'side panel', 'slide over', 'flyout'],
  },
  {
    to: '/components/dropdown-menu',
    label: 'Dropdown menu',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['menu', 'context menu', 'action menu', 'overflow menu'],
  },
  {
    to: '/components/icon-tooltip',
    label: 'Icon tooltip',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['info icon', 'icon hint', 'emoji tooltip'],
  },
  {
    to: '/components/tooltip',
    label: 'Tooltip',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['hint', 'hover text', 'info tip'],
  },
  {
    to: '/components/breadcrumb',
    label: 'Breadcrumb',
    category: ComponentCategory.Navigation,
    aliases: ['breadcrumbs', 'trail'],
  },
  {
    to: '/components/page-header',
    label: 'Page header',
    category: ComponentCategory.Navigation,
    aliases: ['page title', 'heading'],
  },
  {
    to: '/components/pagination',
    label: 'Pagination',
    category: ComponentCategory.Navigation,
    aliases: ['pager', 'page numbers'],
  },
  {
    to: '/components/sidebar',
    label: 'Sidebar',
    category: ComponentCategory.Navigation,
    aliases: ['side nav', 'navigation rail', 'nav drawer'],
  },
  {
    to: '/components/stepper',
    label: 'Stepper',
    category: ComponentCategory.Navigation,
    aliases: ['steps', 'wizard', 'step indicator'],
  },
  {
    to: '/components/tabs',
    label: 'Tabs',
    category: ComponentCategory.Navigation,
    aliases: ['tab bar', 'tab list'],
  },
  {
    to: '/components/text-link',
    label: 'Text link',
    category: ComponentCategory.Navigation,
    aliases: ['link', 'anchor', 'hyperlink'],
  },
] as const

export type ComponentRoute = (typeof catalogEntries)[number]['to']

export interface CatalogComponent {
  to: ComponentRoute
  label: string
  category: ComponentCategory
  aliases: readonly string[]
  description: string
}

const componentRoutePrefix = '/components/'

const registryDescriptionsByName = new Map(
  registry.items.map((registryItem) => [
    registryItem.name,
    registryItem.description,
  ]),
)

function registryDescription(route: ComponentRoute) {
  const registryName = route.slice(componentRoutePrefix.length)
  const description = registryDescriptionsByName.get(registryName)
  if (description === undefined) {
    throw new Error(
      `${route} has no registry item named "${registryName}" in registry.json`,
    )
  }

  return description
}

export const componentCatalog: CatalogComponent[] = catalogEntries.map(
  (catalogEntry) => ({
    ...catalogEntry,
    description: registryDescription(catalogEntry.to),
  }),
)
