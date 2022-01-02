import OmniAural from 'omniaural'

const isStreamingSet = (val: boolean) => {
  OmniAural.state.isStreaming.set(val)
}

const settingsPaymentsToPodcastBoostAmountSet = (val: number) => {
  OmniAural.state.settings.payments.toPodcast.boostAmount.set(val)
}

const settingsPaymentsToPodcastStreamingAmountSet = (val: number) => {
  OmniAural.state.settings.payments.toPodcast.streamingAmount.set(val)
}

const settingsPaymentsToPodcastAppBoostAmountSet = (val: number) => {
  OmniAural.state.settings.payments.toPodcastApp.boostAmount.set(val)
}

const settingsPaymentsToPodcastAppStreamingAmountSet = (val: number) => {
  OmniAural.state.settings.payments.toPodcastApp.streamingAmount.set(val)
}

const settingsUpdateAll = (settings: any) => {
  OmniAural.state.settings.set(settings)
}

export const syncStorageToGlobalState = async () => {
  const storageData = await chrome.storage.local.get(['isStreaming', 'settings'])
  const { isStreaming, settings } = storageData
  OmniAural.isStreamingSet(isStreaming)
  OmniAural.settingsUpdateAll(settings)
}

OmniAural.addActions({
  isStreamingSet,
  settingsUpdateAll,
  settingsPaymentsToPodcastBoostAmountSet,
  settingsPaymentsToPodcastStreamingAmountSet,
  settingsPaymentsToPodcastAppBoostAmountSet,
  settingsPaymentsToPodcastAppStreamingAmountSet
})
