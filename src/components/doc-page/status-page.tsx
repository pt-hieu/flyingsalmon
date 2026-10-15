import {
  docPageClassName,
  docPageHeaderClassName,
  docPageLeadClassName,
  docPageTitleClassName,
  statusPageActionsClassName,
} from './classnames'

export interface StatusPageProps {
  title: string
  lead: React.ReactNode
  actions?: React.ReactNode
}

export function StatusPage({ title, lead, actions }: StatusPageProps) {
  return (
    <article className={docPageClassName}>
      <header className={docPageHeaderClassName}>
        <h1 className={docPageTitleClassName}>{title}</h1>
        <p className={docPageLeadClassName}>{lead}</p>
      </header>

      {actions ? (
        <div className={statusPageActionsClassName}>{actions}</div>
      ) : null}
    </article>
  )
}
