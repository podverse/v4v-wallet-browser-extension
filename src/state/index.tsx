import OmniAural from 'omniaural'

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
  settingsPaymentsToPodcastBoostAmountSet,
  settingsPaymentsToPodcastStreamingAmountSet,
  settingsPaymentsToPodcastAppBoostAmountSet,
  settingsPaymentsToPodcastAppStreamingAmountSet
})
