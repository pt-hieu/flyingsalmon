import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Stepper } from '@/registry/ui/stepper'

const questionCount = 4

export function StepperForwardAndBack() {
  const [currentQuestion, setCurrentQuestion] = useState(1)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Stepper
        count={questionCount}
        current={currentQuestion}
        label="Trip questions"
      />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() =>
            setCurrentQuestion((question) => Math.max(question - 1, 1))
          }
        >
          Back
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() =>
            setCurrentQuestion((question) =>
              Math.min(question + 1, questionCount),
            )
          }
        >
          Next
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          Question {currentQuestion} of {questionCount}
        </span>
      </div>
    </div>
  )
}
