import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-indigo text-white hover:bg-indigo-hover shadow-sm hover:shadow-md',
        secondary:
          'bg-maroon text-white hover:bg-maroon-hover shadow-sm hover:shadow-md',
        gold: 'bg-gold text-ink hover:bg-gold-hover shadow-sm hover:shadow-md',
        outline:
          'border border-line-strong bg-transparent text-ink hover:bg-indigo-soft hover:text-indigo hover:border-indigo',
        ghost: 'hover:bg-surface-2 text-ink-soft hover:text-ink',
        link: 'text-indigo underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-white hover:bg-destructive-hover shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        default: 'h-10 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
