import { useActiveWeb3React } from '.'
import { ChainId } from '@plat-dex/uniswap-sdk'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../state'
import useCurrentBlockTimestamp from './useCurrentBlockTimestamp'

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
export default function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useSelector<AppState, number>(state => state.user.userDeadline)
  const blockTimestamp = useCurrentBlockTimestamp()
  const { chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (blockTimestamp && ttl) {
      if (chainId === ChainId.PLATON_TESTNET) {
        return blockTimestamp.add(ttl * 1000)
      } else {
        return blockTimestamp.add(ttl)
      }
    }

    return undefined
    // eslint-disable-next-line
  }, [blockTimestamp, ttl])
}
