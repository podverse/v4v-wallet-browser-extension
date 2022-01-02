import OmniAural from 'omniaural'

export const syncStorageToGlobalState = async () => {
  const storageData = await chrome.storage.local.get(['settings'])
  const { settings } = storageData
  OmniAural.settingsUpdateAll(settings)
}

const settingsUpdateAll = (settings: any) => {
  OmniAural.state.settings.set(settings)
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

OmniAural.addActions({
  settingsUpdateAll,
  settingsPaymentsToPodcastBoostAmountSet,
  settingsPaymentsToPodcastStreamingAmountSet,
  settingsPaymentsToPodcastAppBoostAmountSet,
  settingsPaymentsToPodcastAppStreamingAmountSet
})
