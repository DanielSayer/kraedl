'use client'

import { buttonVariants } from '@/components/ui/button'
import { clientNavOptions } from '@/lib/constants/ClientNavOptions'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideNav({ clientId }: { clientId: string }) {
  const pathname = usePathname()

  return (
    <nav className="mt-4 flex space-x-2 px-6 lg:flex-col lg:space-x-0 lg:space-y-1">
      {clientNavOptions.map((item) => {
        const isCurrentPath = pathname === item.href.replace('[id]', clientId)
        return (
          <Link
            key={item.href}
            href={item.href}
            as={item.href.replace('[id]', clientId)}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'hover: py-1 ps-6 font-semibold hover:border-l-4 hover:border-l-primary hover:bg-muted',
              {
                'border-l-4 border-l-primary bg-muted font-bold text-primary':
                  isCurrentPath,
              },
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
