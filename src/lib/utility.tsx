import { Constants } from "../resources"

export const getHostname = (url: string) => {
  return new URL(url).hostname
}

export const getUITheme = (hostname?: string, uiTheme?: string) => {
  hostname = hostname || 'default'
  uiTheme = uiTheme || 'default'
  const selectedThemes = Constants.UIThemes[hostname] || Constants.UIThemes.default
  const selectedTheme = selectedThemes[uiTheme]
  return selectedTheme
}
