import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  berajikoRpc: string
  berasUser: string
  analytics: string
  jobEvent: string
  nftUrl: string
  tokenUrl: string
  jikoChat: string
}
const conf: Record<Env, Conf> = {
  development: {
    jikoChat: 'https://jiko-chat-dev.fly.dev',
    berajikoRpc: 'https://berajiko-dev.fly.dev',
    berasUser: 'https://beras-user.fly.dev',
    analytics: 'https://api-analytics-dev.beraji.com',
    jobEvent: 'https://api-job-event-dev.beraji.com',
    nftUrl: '',
    tokenUrl: '',
  },
  staging: {
    jikoChat: 'https://jiko-chat-dev.fly.dev',
    berajikoRpc: 'https://berajiko-dev.fly.dev',
    berasUser: 'https://beras-user.fly.dev',
    analytics: 'https://api-analytics-dev.beraji.com',
    jobEvent: 'https://api-job-event-dev.beraji.com',
    nftUrl: '',
    tokenUrl: '',
  },
  production: {
    jikoChat: 'https://jiko-chat.fly.dev',
    berajikoRpc: 'https://berajiko-server.fly.dev',
    berasUser: 'https://users-server.fly.dev',
    analytics: 'https://api-analytics.beraji.com',
    jobEvent: 'https://api-job-event.beraji.com',
    nftUrl: 'https://magiceden.io/collections/berachain',
    tokenUrl: 'https://app.oogabooga.io',
  },
}

export default conf
