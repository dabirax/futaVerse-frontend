import { Check } from 'lucide-react'

interface Step {
  label: string
}

interface SignupStepIndicatorProps {
  steps: Step[]
  currentStep: number
  role: 'student' | 'alumnus'
}

const roleColors = {
  student: {
    active: 'bg-indigo text-white',
    completed: 'bg-indigo text-white',
    line: 'bg-indigo',
    label: 'text-ink',
    labelActive: 'text-ink font-semibold',
  },
  alumnus: {
    active: 'bg-maroon text-white',
    completed: 'bg-maroon text-white',
    line: 'bg-maroon',
    label: 'text-ink',
    labelActive: 'text-ink font-semibold',
  },
}

export function SignupStepIndicator({
  steps,
  currentStep,
  role,
}: SignupStepIndicatorProps) {
  const colors = roleColors[role]

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors
                  ${isCompleted ? colors.completed : isActive ? colors.active : 'bg-surface border-line'}
                `}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span
                    className={`font-mono text-xs ${isActive ? 'text-white' : 'text-ink-faint'}`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`
                  font-mono text-[10px] uppercase tracking-widest whitespace-nowrap
                  ${isCompleted || isActive ? colors.labelActive : 'text-ink-faint'}
                `}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`
                  flex-1 h-0.5 mx-2 mt-[-14px]
                  ${isCompleted ? colors.line : 'bg-line'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
