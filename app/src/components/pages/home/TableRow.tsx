import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Button from '@/components/common/atoms/Button'
import clsx from 'clsx'
import { Bounty } from '@/types'
import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ellipsis } from '@/utils/ellipsis'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Tooltip from '@/components/common/atoms/Tooltip'
import usdc from '@/assets/img/logo/usdc.svg'
import Link from 'next/link'

export default function HomeTableRow() {
  const { t } = useTranslation()

  const { publicKey } = useWallet()
  const connection = useConnection()

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    // currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  const [data, setData] = useState<Bounty[] | null>([
    {
      id: 1,
      description: 'Freelance Designer',
      contractor: 'Shaga',
      modal: 'Bounty',
      amount: 5000,
      currency: 'USDC',
      end: 'Closing in 8 days',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/freelance-designer',
    },
    {
      id: 2,
      description:
        'Write an Advanced Developer Tutorial on Address Lookup Tables',
      contractor: 'Superteam Germany',
      modal: 'Bounty',
      amount: 800,
      currency: 'USDC',
      end: 'Closing in 13 days',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/write-an-advanced-article-on-address-lookup-tables',
    },
    {
      id: 3,
      description: 'SEO Optimization for Superteam Earn',
      contractor: 'Superteam',
      modal: 'Project',
      amount: 500,
      currency: 'USDC',
      end: 'Rolling Deadline',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/seo-optimization-for-superteam-earn',
    },
    {
      id: 4,
      description: 'Translate SNS SDK into Swift',
      contractor: 'Bonfida',
      modal: 'Project',
      amount: 700,
      currency: 'USDC',
      end: 'Rolling Deadline',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/translate-sns-sdk-into-swift',
    },
    {
      id: 5,
      description: 'Translate the SNS SDK into Java',
      contractor: 'Bonfida',
      modal: 'Project',
      amount: 700,
      currency: 'USDC',
      end: 'Rolling Deadline',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/translate-the-sns-sdk-into-java',
    },
    {
      id: 6,
      description: 'Translate the SNS SDK into Python',
      contractor: 'Bonfida',
      modal: 'Project',
      amount: 700,
      currency: 'USDC',
      end: 'Rolling Deadline',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/translate-the-sns-sdk-into-python',
    },
    {
      id: 7,
      description:
        'Build a Quicknode Marketplace Add-on for Compressed NFTs on Solana',
      contractor: 'QuickNode',
      modal: 'Project',
      amount: 2500,
      currency: 'USDC',
      end: 'Closing in 23 days',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/build-a-quicknode-marketplace-add-on-for-compressed-nfts-on-solana',
    },
    {
      id: 8,
      description: 'Translate the SNS SDK into Golang',
      contractor: 'Bonfida',
      modal: 'Project',
      amount: 700,
      currency: 'USDC',
      end: 'Rolling Deadline',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/translate-the-sns-sdk-into-golang',
    },
    {
      id: 9,
      description: 'Clone Contributor Program',
      contractor: 'Clone Protocol',
      modal: 'Bounty',
      amount: 2000,
      currency: 'USDC',
      end: 'Closing in 2 months',
      source: 'superteam',
      link: 'https://earn.superteam.fun/listings/bounties/clone-contributor-program',
    },
  ])

  useEffect(() => {
    const fetchCache = async () => {
      return data
    }
    fetchCache()
      .then((response) => {
        if (response) {
          setData(response)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="mt-6 lg:mt-8">
      {data ? (
        <div className="tracking-tight text-gray-700 dark:text-gray-200">
          {data.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className="mx-auto flex h-[50px] items-center justify-between border-t border-black text-xs text-gray-900 hover:bg-gray-900 hover:text-gray-50 dark:border-gray-50 dark:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900 md:w-[500px]"
              >
                <div className="w-24 text-center lowercase">
                  <span className="flex items-center justify-center">
                    {item.currency.toLowerCase() == 'usdc' ? (
                      <Image
                        src={usdc}
                        alt="usdc logo"
                        width={15}
                        height={15}
                      />
                    ) : (
                      item.currency.toLowerCase()
                    )}
                    <span className="ml-1">
                      {formatter.format(item.amount)}
                    </span>
                  </span>
                </div>
                <div className="w-44 text-center lowercase">
                  {item.description}
                </div>
                <div className="w-16 text-center lowercase">{item.modal}</div>
                <div className="w-16 text-center lowercase">
                  {item.end.includes('days' || 'month')
                    ? item.end.split('ing')[1].split('in')[1]
                    : item.end.split(' ')[0]}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div>something went wrong</div>
      )}
    </div>
  )
}
