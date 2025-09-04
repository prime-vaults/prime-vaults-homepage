export enum SocialType {
  X = 'X',
}

export type IEngagement = {
  totalView: number
  totalLike: number
  totalComment: number
  totalShare: number
  totalSave: number
}

export type IStats = {
  followers?: number
  // last 5 posts total engagement
  engagement?: IEngagement
}

export type ISocial = {
  _id?: string
  name: string
  socialId: string
  username: string
  socialType: SocialType
  url?: string
  profile_image_url?: string
  stats?: IStats
  updatedAt?: string
}

export type IPostRecent = {
  id: string
  authorId: string
  posts: ISocialPost[]
  createdAt: string
  updatedAt: string
}

export type ISocialPost = {
  text: string
  postId: string
  retweetCount: number
  replyCount: number
  likeCount: number
  quoteCount: number
  impressionCount: number
  bookmarkCount: number
  createdAt: string
}

export type IChannel = {
  _id?: string
  socialId: string
  username: string
  followersCount?: number
  followingCount?: number
  postCount?: number
  listedCount?: number
  likeCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface INft {
  _id: string
  address: string
  chainId: number
  provider_type: string
  provider_slug: string
  logo: string
  banner: string
  name: string
  symbol: string
  createdAt: string
  updatedAt: string
  market: IMarket
}

export interface IMarket {
  _id: string
  _nftId: string
  floorNative: number
  floorUsd: number
  nativeSymbol: string
  createdAt: string
  updatedAt: string
}

export interface IToken {
  _id: string
  address: string
  chainId: number
  name: string
  symbol: string
  cgkId: string
  decimals: number
  price: number
  logo: string
  createdAt: string
  updatedAt: string
  provider_slug: string
  provider_type: string
}

export enum TimeFrame {
  OneHour = '1h',
  OneDay = '1d',
  OneWeek = '1w',
  OneMonth = '1m',
  OneYear = '1y',
}

type PriceChangeToken = {
  usd: number
  timestamp: string
}

type PriceChangeNft = {
  floorUsd: number
  floorNative: number
  timestamp: string
}

export type PriceChangePercentToken = {
  priceChangePercentage?: number
  latestPrice: PriceChangeToken
  previousPrice?: PriceChangeToken
}

export type PriceChangePercentNft = {
  priceChangePercentage?: number
  latestPrice: PriceChangeNft
  previousPrice?: PriceChangeNft
}
