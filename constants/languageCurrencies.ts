export interface ILanguage {
  label: string
  value: string
}

export interface ICurrency {
  label: string
  currency?: string
  symbol?: string
  value: string
}

export const languages: ILanguage[] = [
  {
    label: 'English',
    value: 'en',
  },
]

export const currencies: ICurrency[] = [
  {
    label: 'USA Dollar',
    currency: 'USD',
    symbol: '$',
    value: 'us',
  },
  {
    label: 'Euro',
    currency: 'EUR',
    symbol: '€',
    value: 'eu',
  },
  {
    label: 'Pound Sterling',
    currency: 'GBP',
    symbol: '£',
    value: 'gb',
  },
]
