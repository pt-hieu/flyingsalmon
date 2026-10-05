import { useMemo } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

import {
  examplePreviewClassName,
  exampleTabsContentClassName,
} from './classnames'
import { CodeBlock } from './code-block'
import type { ExampleSource } from './types'
import { toConsumerSource } from './utils'

export interface ExampleFrameProps extends ExampleSource {
  label: string
}

export function ExampleFrame({ source, demo, label }: ExampleFrameProps) {
  const consumerSource = useMemo(() => toConsumerSource(source), [source])

  return (
    <Tabs defaultValue="preview">
      <TabsList aria-label={label}>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        forceMount
        className={exampleTabsContentClassName}
      >
        <div className={examplePreviewClassName}>{demo}</div>
      </TabsContent>

      <TabsContent value="code" className={exampleTabsContentClassName}>
        <CodeBlock code={consumerSource} label={`${label} code`} />
      </TabsContent>
    </Tabs>
  )
}
