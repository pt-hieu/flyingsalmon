import { CodeBlock } from './code-block'
import { CodeLanguage } from './types'

export interface InstallCommandProps {
  name: string
}

export function InstallCommand({ name }: InstallCommandProps) {
  return (
    <CodeBlock
      code={`npx shadcn@latest add @flyingsalmon/${name}`}
      language={CodeLanguage.Bash}
      label="Install command"
    />
  )
}
