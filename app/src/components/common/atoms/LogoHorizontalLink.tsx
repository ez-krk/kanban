import Link from '@/components/routing/Link'
import { AiOutlineFire } from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  className?: string
  href?: string
  onClick?: () => void
}

export default function LogoHorizontalLink({
  className,
  href = '/',
  ...rest
}: Props) {
  return (
    <>
      <Link href={href} {...rest}>
        <span className="sr-only">work3</span>
        <span className="hidden w-full text-center font-bold text-gray-700 hover:text-gray-900  dark:block  dark:text-gray-50 dark:hover:text-gray-200">
          work3
        </span>
      </Link>
    </>
  )
}
