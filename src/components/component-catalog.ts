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
  [ComponentCategory.SurfacesAndOverlays]: 'Surfaces & overlays',
  [ComponentCategory.Navigation]: 'Navigation',
}

const catalogEntries = [
  {
    to: '/components/button',
    registryName: 'button',
    label: 'Button',
    category: ComponentCategory.Inputs,
    aliases: ['action', 'cta', 'icon button', 'loading button'],
  },
  {
    to: '/components/calendar',
    registryName: 'calendar',
    label: 'Calendar',
    category: ComponentCategory.Inputs,
    aliases: ['month view', 'date grid'],
  },
  {
    to: '/components/checkbox',
    registryName: 'checkbox',
    label: 'Checkbox',
    category: ComponentCategory.Inputs,
    aliases: ['check box', 'tick box'],
  },
  {
    to: '/components/combobox',
    registryName: 'combobox',
    label: 'Combobox',
    category: ComponentCategory.Inputs,
    aliases: ['autocomplete', 'typeahead', 'autosuggest', 'tags input'],
  },
  {
    to: '/components/date-picker',
    registryName: 'date-picker',
    label: 'Date Picker',
    category: ComponentCategory.Inputs,
    aliases: ['datepicker', 'date input', 'date range picker'],
  },
  {
    to: '/components/form',
    registryName: 'form',
    label: 'Form',
    category: ComponentCategory.Inputs,
    aliases: ['fieldset', 'form layout'],
  },
  {
    to: '/components/input',
    registryName: 'input',
    label: 'Input',
    category: ComponentCategory.Inputs,
    aliases: ['text field', 'textfield', 'text input'],
  },
  {
    to: '/components/number-field',
    registryName: 'number-field',
    label: 'Number Field',
    category: ComponentCategory.Inputs,
    aliases: ['number input', 'numeric input', 'spin button'],
  },
  {
    to: '/components/radio-group',
    registryName: 'radio-group',
    label: 'Radio Group',
    category: ComponentCategory.Inputs,
    aliases: ['radio', 'radio button', 'option group'],
  },
  {
    to: '/components/select',
    registryName: 'select',
    label: 'Select',
    category: ComponentCategory.Inputs,
    aliases: ['dropdown', 'picker', 'listbox'],
  },
  {
    to: '/components/switch',
    registryName: 'switch',
    label: 'Switch',
    category: ComponentCategory.Inputs,
    aliases: ['toggle', 'toggle switch'],
  },
  {
    to: '/components/textarea',
    registryName: 'textarea',
    label: 'Textarea',
    category: ComponentCategory.Inputs,
    aliases: ['text area', 'multiline'],
  },
  {
    to: '/components/toggle-group',
    registryName: 'toggle-group',
    label: 'Toggle Group',
    category: ComponentCategory.Inputs,
    aliases: ['segmented control', 'toggle buttons', 'button group'],
  },
  {
    to: '/components/avatar',
    registryName: 'avatar',
    label: 'Avatar',
    category: ComponentCategory.DataDisplay,
    aliases: ['profile picture', 'user image', 'initials'],
  },
  {
    to: '/components/avatar-group',
    registryName: 'avatar-group',
    label: 'Avatar Group',
    category: ComponentCategory.DataDisplay,
    aliases: ['avatar stack', 'facepile'],
  },
  {
    to: '/components/badge',
    registryName: 'badge',
    label: 'Badge',
    category: ComponentCategory.DataDisplay,
    aliases: ['chip', 'tag', 'pill', 'label'],
  },
  {
    to: '/components/carousel',
    registryName: 'carousel',
    label: 'Carousel',
    category: ComponentCategory.DataDisplay,
    aliases: ['slider', 'slideshow', 'gallery'],
    docsPending: true,
  },
  {
    to: '/components/icon-tooltip',
    registryName: 'icon-tooltip',
    label: 'Icon Tooltip',
    category: ComponentCategory.DataDisplay,
    aliases: ['info icon', 'icon hint', 'emoji tooltip'],
  },
  {
    to: '/components/separator',
    registryName: 'separator',
    label: 'Separator',
    category: ComponentCategory.DataDisplay,
    aliases: ['divider', 'rule', 'hr'],
  },
  {
    to: '/components/table',
    registryName: 'table',
    label: 'Table',
    category: ComponentCategory.DataDisplay,
    aliases: ['data grid', 'datagrid', 'data table'],
  },
  {
    to: '/components/timeline',
    registryName: 'timeline',
    label: 'Timeline',
    category: ComponentCategory.DataDisplay,
    aliases: ['activity feed', 'history'],
  },
  {
    to: '/components/tooltip',
    registryName: 'tooltip',
    label: 'Tooltip',
    category: ComponentCategory.DataDisplay,
    aliases: ['hint', 'hover text', 'info tip'],
  },
  {
    to: '/components/alert',
    registryName: 'alert',
    label: 'Alert',
    category: ComponentCategory.Feedback,
    aliases: ['callout', 'inline message'],
  },
  {
    to: '/components/empty-state',
    registryName: 'empty-state',
    label: 'Empty State',
    category: ComponentCategory.Feedback,
    aliases: ['blank slate', 'zero state', 'no results'],
  },
  {
    to: '/components/notice',
    registryName: 'notice',
    label: 'Notice',
    category: ComponentCategory.Feedback,
    aliases: ['toast', 'banner', 'snackbar', 'notification'],
  },
  {
    to: '/components/progress',
    registryName: 'progress',
    label: 'Progress',
    category: ComponentCategory.Feedback,
    aliases: ['progress bar', 'loading bar', 'meter'],
  },
  {
    to: '/components/skeleton',
    registryName: 'skeleton',
    label: 'Skeleton',
    category: ComponentCategory.Feedback,
    aliases: ['placeholder', 'shimmer'],
  },
  {
    to: '/components/spinner',
    registryName: 'spinner',
    label: 'Spinner',
    category: ComponentCategory.Feedback,
    aliases: ['loader', 'circular progress', 'activity indicator'],
  },
  {
    to: '/components/accordion',
    registryName: 'accordion',
    label: 'Accordion',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['collapse', 'collapsible', 'disclosure', 'expansion panel'],
  },
  {
    to: '/components/card',
    registryName: 'card',
    label: 'Card',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['paper', 'panel', 'tile'],
  },
  {
    to: '/components/dialog',
    registryName: 'dialog',
    label: 'Dialog',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['modal', 'popup', 'confirm'],
  },
  {
    to: '/components/drawer',
    registryName: 'drawer',
    label: 'Drawer',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['sheet', 'side panel', 'slide over', 'flyout'],
  },
  {
    to: '/components/dropdown-menu',
    registryName: 'dropdown-menu',
    label: 'Dropdown Menu',
    category: ComponentCategory.SurfacesAndOverlays,
    aliases: ['menu', 'context menu', 'action menu', 'overflow menu'],
  },
  {
    to: '/components/breadcrumb',
    registryName: 'breadcrumb',
    label: 'Breadcrumb',
    category: ComponentCategory.Navigation,
    aliases: ['breadcrumbs', 'trail'],
  },
  {
    to: '/components/pagination',
    registryName: 'pagination',
    label: 'Pagination',
    category: ComponentCategory.Navigation,
    aliases: ['pager', 'page numbers'],
  },
  {
    to: '/components/sidebar',
    registryName: 'sidebar',
    label: 'Sidebar',
    category: ComponentCategory.Navigation,
    aliases: ['side nav', 'navigation rail', 'nav drawer'],
  },
  {
    to: '/components/stepper',
    registryName: 'stepper',
    label: 'Stepper',
    category: ComponentCategory.Navigation,
    aliases: ['steps', 'wizard', 'step indicator'],
  },
  {
    to: '/components/tabs',
    registryName: 'tabs',
    label: 'Tabs',
    category: ComponentCategory.Navigation,
    aliases: ['tab bar', 'tab list'],
  },
  {
    to: '/components/text-link',
    registryName: 'text-link',
    label: 'Text Link',
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
  docsPending?: boolean
}

const registryDescriptionsByName = new Map(
  registry.items.map((registryItem) => [
    registryItem.name,
    registryItem.description,
  ]),
)

export const componentCatalog: CatalogComponent[] = catalogEntries.map(
  ({ registryName, ...catalogEntry }) => ({
    ...catalogEntry,
    description: registryDescriptionsByName.get(registryName) ?? '',
  }),
)
