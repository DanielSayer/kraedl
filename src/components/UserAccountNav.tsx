import Image from 'next/image'
import Link from 'next/link'
import { Icons } from './Icons'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button, buttonVariants } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { authorizedNavOptions } from '@/lib/constants/NavOptions'

interface UserAccountNavProps {
  email: string
  imageUrl: string
  name: string
}

const UserAccountNav = ({ email, imageUrl, name }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible border-0">
        <Button className="aspect-square h-8 w-8 rounded-full border-0 dark:ring-1">
          <Avatar className="relative h-8 w-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 text-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-muted" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {authorizedNavOptions.map((option) => (
          <DropdownMenuItem asChild key={option.ref}>
            <Link href={option.ref} className="cursor-pointer hover:underline">
              {option.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-end">
          <Link
            href="/api/auth/signout"
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAccountNav
