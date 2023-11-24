import { AiOutlineFire } from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  className?: string
  onClick?: () => void
}

export default function LogoNavbar({ className, ...rest }: Props) {
  return (
    <>
      <div {...rest}>
        <span className="sr-only">kanban</span>
        <div className="flex items-center justify-center">
          {/* <AiOutlineFire
            className={clsx(
              'h-10 w-10 dark:hidden dark:text-gray-50 dark:hover:text-gray-200',
              className
            )}
          /> */}
          <span className="ml-2 font-bold text-gray-700  hover:text-gray-900  dark:hidden  dark:text-gray-50 dark:hover:text-gray-200">
            <span className="text-red-600">看板</span> kanban
          </span>
        </div>
        <div className="flex items-center justify-center">
          {/* <AiOutlineFire
            className={clsx(
              'hidden h-10 w-10 dark:block dark:text-gray-50 dark:hover:text-gray-200',
              className
            )}
          /> */}
          <span className="ml-2 hidden font-bold text-gray-700 hover:text-gray-900  dark:block  dark:text-gray-50 dark:hover:text-gray-200">
            <span className="text-red-600">看板</span> kanban
          </span>
        </div>
      </div>
    </>
  )
}
