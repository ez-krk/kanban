import { ReactElement } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DashboardScreen from '@/components/pages/user/kanban/DashboardScreen'

const seo = {
  pathname: '/user/kanban',
  title: {
    ja: 'AIチャット',
    en: 'kanban',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'kanban'], seo)
export { getStaticPaths, getStaticProps }

export default function Dashboard() {
  return (
    <>
      <DashboardScreen />
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
