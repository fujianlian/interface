import { useActiveWeb3React } from '.'
import { useState, useEffect } from 'react'
import { ChainId } from '@uniswap/sdk'

export function useTimestampFromBlock(block: number | undefined): number | undefined {
  const { library, chainId } = useActiveWeb3React()
  const [timestamp, setTimestamp] = useState<number>()
  useEffect(() => {
    async function fetchTimestamp() {
      if (block) {
        const blockData = await library?.getBlock(block)
        if (chainId === ChainId.PLATON_TESTNET) {
          blockData && setTimestamp(blockData.timestamp / 1000)
        } else {
          blockData && setTimestamp(blockData.timestamp)
        }
      }
    }
    if (!timestamp) {
      fetchTimestamp()
    }
  }, [block, library, timestamp])
  return timestamp
}
