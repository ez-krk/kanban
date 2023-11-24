import { ReactElement } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DashboardScreen from '@/components/pages/user/kanban/DashboardScreen'
import { useWallet } from '@solana/wallet-adapter-react'

const seo = {
  pathname: '/user/pastebin',
  title: {
    ja: 'AIチャット',
    en: 'pastebin',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'dashboard'], seo)
export { getStaticPaths, getStaticProps }

export default function Dashboard() {
  const { publicKey } = useWallet()
  return (
    <>
      <DashboardScreen />
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
