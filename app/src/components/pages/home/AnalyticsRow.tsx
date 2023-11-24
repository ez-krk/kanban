import { ANALYTICS_PUBKEY, SOLANA_RPC_ENDPOINT } from '@/constants'
import {
  AccountInfo,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AnalyticsRow() {
  const { t } = useTranslation()

  const [data, setData] = useState<AccountInfo<Buffer> | null>(null)

  const connection = new Connection(SOLANA_RPC_ENDPOINT)
  useEffect(() => {
    const fetchCache = async () => {
      return await connection.getAccountInfo(new PublicKey(ANALYTICS_PUBKEY))
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
  return <div className="mt-6 lg:mt-8">
    
  </div>
}
