import type { SatoshiStreamStats, V4VItem, ValueRecipient, ValueRecipientNormalized, ValueTag, ValueTransaction } from "../types"
import { v4 as uuidv4 } from 'uuid'

export const normalizeValueRecipients = (recipients: ValueRecipient[], total: number, roundDownValues: boolean) => {
  const normalizedValueRecipients: ValueRecipientNormalized[] = calculateNormalizedSplits(recipients)
  const feeRecipient = normalizedValueRecipients.find((valueRecipient) => valueRecipient.fee === true)
  let feeAmount = 0
  if (feeRecipient) {
    feeAmount = (total / 100) * (feeRecipient.normalizedSplit || 0)
    total = total - feeAmount
  }

  const finalNormalizedValueRecipients: ValueRecipientNormalized[] = []
  for (const normalizedValueRecipient of normalizedValueRecipients) {
    let amount = (total / 100) * (normalizedValueRecipient.normalizedSplit || 0)

    if (feeAmount && normalizedValueRecipient.fee) {
      amount = feeAmount
    }

    amount = roundDownValues ? Math.floor(amount) : amount

    finalNormalizedValueRecipients.push({
      ...normalizedValueRecipient,
      amount: parseFloat(amount.toFixed(2))
    })
  }

  return finalNormalizedValueRecipients
}

const calculateNormalizedSplits = (recipients: ValueRecipient[]) => {
  let normalizedValueRecipients: ValueRecipientNormalized[] = []

  const totalSplit = recipients.reduce((total, recipient) => {
    return total + recipient.split
  }, 0)

  normalizedValueRecipients = recipients.map((recipient) => {
    return {
      ...recipient,
      normalizedSplit: (recipient.split / totalSplit) * 100,
      amount: 0 // temporarily set the amount to 0
    }
  })

  normalizedValueRecipients = normalizedValueRecipients.filter((x) => isValidNormalizedValueRecipient(x))

  return normalizedValueRecipients
}

const isValidNormalizedValueRecipient = (normalizedValueRecipient: ValueRecipientNormalized) =>
  !!(
    normalizedValueRecipient?.address &&
    normalizedValueRecipient?.amount >= 0 &&
    normalizedValueRecipient?.normalizedSplit > 0 &&
    normalizedValueRecipient?.split > 0 &&
    normalizedValueRecipient?.type
  )

export const convertValueTagIntoValueTransactions = (
  valueTag: ValueTag,
  v4vItem: V4VItem,
  action: string,
  amount: number,
  roundDownValues: boolean
) => {
  const { method, type } = valueTag

  if (!method || !type) {
    throw new Error("Invalid value tag found in the podcaster's RSS feed. Please contact us for support.")
  }

  if (!(type === 'lightning' && method === 'keysend')) {
    throw new Error(
      // eslint-disable-next-line max-len
      'Invalid value tag found in the podcaster\'s RSS feed. The only accepted value tag types currently are "lightning" and "keysend". Please contact us for support.'
    )
  }

  const valueTransactions: ValueTransaction[] = []
  const recipients = valueTag.recipients

  const normalizedValueRecipients = normalizeValueRecipients(recipients, amount, roundDownValues)

  for (const normalizedValueRecipient of normalizedValueRecipients) {
    const valueTransaction = convertValueTagIntoValueTransaction(
      normalizedValueRecipient,
      v4vItem,
      action,
      method,
      type
    )

    if (valueTransaction) valueTransactions.push(valueTransaction)
  }

  return valueTransactions
}

const convertValueTagIntoValueTransaction = (
  normalizedValueRecipient: ValueRecipientNormalized,
  v4vItem: V4VItem,
  action: string,
  method: string,
  type: string
) => {
  const timestamp = Date.now()
  const speed = 1 // TODO: get current playback speed
  const currentPlaybackPosition = 0 // TODO: get current playback position
  const pubkey = 'v4v-wallet-pubkey'

  const satoshiStreamStats = createSatoshiStreamStats(
    v4vItem,
    currentPlaybackPosition.toString(),
    action,
    speed.toString(),
    pubkey,
    normalizedValueRecipient.amount.toString(),
    normalizedValueRecipient.name || '',
    normalizedValueRecipient.customKey || '',
    normalizedValueRecipient.customValue || ''
  )

  return {
    createdAt: timestamp,
    method,
    normalizedValueRecipient,
    satoshiStreamStats,
    type
  }
}

export const createSatoshiStreamStats = (
  v4vItem: V4VItem,
  currentPlaybackPosition: string,
  action: string,
  speed: string,
  pubkey: string,
  amount: string,
  name: string,
  customKey: string,
  customValue: string
) => {
  const podcast = v4vItem?.podcastTitle || 'Unknown podcast title'
  const episode = v4vItem?.episodeTitle || 'Unknown episode title'
  const podcastIndexId = v4vItem?.podcastIndexFeedId || null
  const ts = parseInt(currentPlaybackPosition, 10)
  const amountNum = parseInt(amount, 10) * 1000 // in millisats

  return {
    7629169: {
      podcast,
      feedID: podcastIndexId,
      episode,
      ts,
      action,
      speed,
      pubkey,
      value_msat: amountNum,
      uuid: uuidv4(),
      app_name: 'V4V Wallet Browser Extension',
      name
    },
    7629175: podcastIndexId,
    ...(customKey ? { [customKey]: customValue } : {})
  } as SatoshiStreamStats
}
