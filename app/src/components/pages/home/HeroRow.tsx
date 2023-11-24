import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import clsx from 'clsx'
import Container from '@/components/common/atoms/Container'
import Button from '@/components/common/atoms/Button'
import nextjsLogo from '@/assets/img/logo/projects/nextjs.svg'
// import i18nextLogo from '@/assets/img/logo/projects/i18next.webp'
// import recoilLogo from '@/assets/img/logo/projects/recoil.svg'
// import eslintLogo from '@/assets/img/logo/projects/eslint.svg'
// import prettierLogo from '@/assets/img/logo/projects/prettier.png'
import firebaseLogo from '@/assets/img/logo/projects/Firebase.svg'
import tailwindcssLogo from '@/assets/img/logo/projects/tailwindcss.svg'
import typescriptLogo from '@/assets/img/logo/projects/TypeScriptHorizontal.svg'
import solanaLogo from '@/assets/img/logo/projects/solana.svg'
import anchorLogo from '@/assets/img/logo/projects/anchor.png'
import heliusLogo from '@/assets/img/logo/projects/helius.png'
import rustLogo from '@/assets/img/logo/projects/rust.svg'
import skeetLogo from '@/assets/img/logo/projects/skeet.svg'
import bluepill from '@/assets/img/props/bluepill.svg'
import redpill from '@/assets/img/props/redpill.svg'
import AnalyticsRow from './AnalyticsRow'
import HomeTableRow from './TableRow'

export default function HomeHeroRow() {
  const { t } = useTranslation()
  const { publicKey } = useWallet()

  return (
    <>
      <Container className="pb-40 pt-24 text-center lg:pb-64 lg:pt-40">
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-7xl">
          work3
        </h1>

        {/* <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700 dark:text-gray-200">
          {t('home:HeroRow.line')}
        </p> */}
        <p className="mx-auto mt-10 max-w-2xl text-xl font-bold tracking-tight text-gray-700 dark:text-gray-200">
          {t('home:HeroRow.body')}
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/auth/login" className="">
            {t('home:HeroRow.getThingsDone')}
          </Button>
          {/* <Button
            href="https://github.com/3uild-3thos/whitehat"
            variant="outline"
            className=""
            target="_blank"
            rel="noreferrer"
          >
            github
          </Button> */}
        </div>
        <AnalyticsRow />
        <div className="max-w-screen mt-8 flex flex-col md:flex-row lg:mt-10">
          <div className="w-[100%]">
            <p className="mx-auto w-[100%] text-center text-xl font-bold tracking-tight text-gray-700 dark:text-gray-200">
              {t('home:Bounty.openBounty')}
            </p>
            <HomeTableRow />
          </div>
          <div className="w-[100%]">
            <p className="mx-auto max-w-2xl text-xl font-bold tracking-tight text-gray-700 dark:text-gray-200">
              {t('home:PR.pullRequest')}
            </p>
            <HomeTableRow />
          </div>
        </div>
      </Container>
    </>
  )
}
