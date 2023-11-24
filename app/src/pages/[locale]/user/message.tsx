import { ReactElement } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import ChatScreen from '@/components/pages/user/chat/ChatScreen'

const seo = {
  pathname: '/user/message',
  title: {
    ja: 'message',
    en: 'message',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'chat'], seo)
export { getStaticPaths, getStaticProps }

export default function Chat() {
  return (
    <>
      <ChatScreen />
    </>
  )
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
