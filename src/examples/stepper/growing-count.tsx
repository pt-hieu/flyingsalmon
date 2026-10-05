import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Stepper } from '@/registry/ui/stepper'

const initialQuestionCount = 3

export function StepperGrowingCount() {
  const [questionCount, setQuestionCount] = useState(initialQuestionCount)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Stepper count={questionCount} current={2} label="Trip questions" />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() => setQuestionCount((count) => count + 1)}
        >
          Ask a follow-up
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() => setQuestionCount(initialQuestionCount)}
        >
          Reset
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          Question 2 of {questionCount}
        </span>
      </div>
    </div>
  )
}
