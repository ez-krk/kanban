import Link from '@/components/routing/Link'
import { AiOutlineFire } from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  className?: string
  href?: string
  onClick?: () => void
}

export default function LogoNavbarLink({
  className,
  href = '/',
  ...rest
}: Props) {
  return (
    <>
      <Link href={href} {...rest}>
        <span className="sr-only">work3</span>
        <div className="flex items-center">
          <span className="ml-2 font-bold text-gray-700  hover:text-gray-900  dark:hidden  dark:text-gray-50 dark:hover:text-gray-200">
            work3
          </span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 hidden font-bold text-gray-700 hover:text-gray-900  dark:block  dark:text-gray-50 dark:hover:text-gray-200">
            work3
          </span>
        </div>
      </Link>
    </>
  )
}
