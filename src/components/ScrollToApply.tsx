import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { RefObject } from 'react'

interface ScrollToApplyProps {
  targetRef: RefObject<Element | null>
  label?: string
}

export default function ScrollToApply({
  targetRef,
  label = 'Scroll to apply',
}: ScrollToApplyProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show only while the apply section is below the viewport
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top > 0)
      },
      { threshold: 0.1 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() =>
        targetRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded bg-indigo px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-indigo-hover"
    >
      <ChevronDown className="h-4 w-4 animate-bounce" />
      {label}
    </button>
  )
}
