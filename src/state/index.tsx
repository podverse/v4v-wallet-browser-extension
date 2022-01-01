const OmniAural = require('omniaural').default

const settingsBoostAmountSet = (val: number) => {
  OmniAural.state.settings.boostAmount.set(val)
}

OmniAural.addActions({ settingsBoostAmountSet })
