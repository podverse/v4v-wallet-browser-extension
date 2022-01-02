export const storageInitializeSettings = async () => {
  await chrome.storage.local.set({
    settings: {
      payments: {
        toPodcast: {
          boostAmount: 190,
          streamingAmount: 19
        },
        toPodcastApp: {
          boostAmount: 10,
          streamingAmount: 1
        }
      }
    }
  })
}

export const storageUpdateToPodcastBoostAmount = async (val: number) => {
  const storageData = await chrome.storage.local.get(['settings'])
  const { settings } = storageData

  await chrome.storage.local.set({
    settings: {
      ...settings,
      payments: {
        toPodcast: {
          boostAmount: val,
          streamingAmount: settings.payments.toPodcast.streamingAmount
        },
        toPodcastApp: {
          boostAmount: settings.payments.toPodcastApp.boostAmount,
          streamingAmount: settings.payments.toPodcastApp.streamingAmount
        }
      }
    }
  })
}

export const storageUpdateToPodcastStreamingAmount = async (val: number) => {
  const storageData = await chrome.storage.local.get(['settings'])
  const { settings } = storageData

  await chrome.storage.local.set({
    settings: {
      ...settings,
      payments: {
        toPodcast: {
          boostAmount: settings.payments.toPodcast.boostAmount,
          streamingAmount: val
        },
        toPodcastApp: {
          boostAmount: settings.payments.toPodcastApp.boostAmount,
          streamingAmount: settings.payments.toPodcastApp.streamingAmount
        }
      }
    }
  })
}

export const storageUpdateToPodcastAppBoostAmount = async (val: number) => {
  const storageData = await chrome.storage.local.get(['settings'])
  const { settings } = storageData

  await chrome.storage.local.set({
    settings: {
      ...settings,
      payments: {
        toPodcast: {
          boostAmount: settings.payments.toPodcast.boostAmount,
          streamingAmount: settings.payments.toPodcast.streamingAmount
        },
        toPodcastApp: {
          boostAmount: val,
          streamingAmount: settings.payments.toPodcastApp.streamingAmount
        }
      }
    }
  })
}

export const storageUpdateToPodcastAppStreamingAmount = async (val: number) => {
  const storageData = await chrome.storage.local.get(['settings'])
  const { settings } = storageData

  await chrome.storage.local.set({
    settings: {
      ...settings,
      payments: {
        toPodcast: {
          boostAmount: settings.payments.toPodcast.boostAmount,
          streamingAmount: settings.payments.toPodcast.streamingAmount
        },
        toPodcastApp: {
          boostAmount: settings.payments.toPodcastApp.boostAmount,
          streamingAmount: val
        }
      }
    }
  })
}
