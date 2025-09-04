import configs from '@/configs'
import axios from 'axios'

import { ISocial, ISocialPost, TimeFrame, PriceChangePercentNft } from './type'
import { AnalyticsService } from '@beraji/web3-sdk'

const analyticsAPI = axios.create({
  baseURL: `${configs.cluster.analytics}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getTrendPosts() {
  const { data } = await analyticsAPI.get<{
    listSocialWithPostLatest: { social: ISocial; post: ISocialPost }[]
  }>(`/socials/trends-posts`)
  return data.listSocialWithPostLatest
}

export async function getNftPriceChange(
  nftId: string,
  priceChangeTime: TimeFrame,
) {
  const { data } = await AnalyticsService.con.get<PriceChangePercentNft>(
    `/nfts/price-change`,
    {
      params: { nftId, priceChangeTime },
    },
  )
  return data
}
