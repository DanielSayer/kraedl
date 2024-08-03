'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hover: py-1 ps-6 font-semibold hover:border-l-4 hover:border-l-primary hover:bg-muted',
            {
              'border-l-4 border-l-primary bg-muted font-bold text-primary':
                pathname === item.href,
            },
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
