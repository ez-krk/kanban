import { AiOutlineFire } from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  className?: string
  onClick?: () => void
}

export default function LogoHorizontal({ className, ...rest }: Props) {
  return (
    <>
      <div {...rest}>
        <span className="sr-only">work3</span>
        <div className="flex items-center">
          <AiOutlineFire
            className={clsx(
              'dark:hidden dark:text-gray-50 dark:hover:text-gray-200',
              className
            )}
          />
        </div>
        <div className="flex items-center">
          <AiOutlineFire
            className={clsx(
              'hidden dark:block dark:text-gray-50 dark:hover:text-gray-200',
              className
            )}
          />
        </div>
      </div>
    </>
  )
}
