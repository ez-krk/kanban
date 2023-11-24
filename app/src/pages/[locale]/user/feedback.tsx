import { ReactElement } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DashboardScreen from '@/components/pages/user/kanban/DashboardScreen'
import KanbanBoard from '@/components/kanban/KanbanBoard'
import Wallet from '@/components/common/atoms/Wallet'
import { useWallet } from '@solana/wallet-adapter-react'

const seo = {
  pathname: '/user/feedback',
  title: {
    ja: 'AIチャット',
    en: 'feedback',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'feedback'], seo)
export { getStaticPaths, getStaticProps }

export default function Feedback() {
  const { publicKey } = useWallet()
  return (
    <>
      {/* {!publicKey ? (
        <div className="flex h-[420px] h-full items-center justify-center">
          <Wallet />
        </div>
      ) : (
        <div className="content-height flex w-full flex-col items-start justify-start overflow-auto sm:flex-row">
          <KanbanBoard />
        </div>
      )} */}
      <DashboardScreen />
    </>
  )
}

Feedback.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
