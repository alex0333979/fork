/**
 * Make humanized time string
 * @param value number value in seconds
 * @example
 * * 70(seconds) => 1 min 10sec
 */

export const humanizeTime = (value: number): string => {
  const d = Math.floor(value / (3600 * 24))
  const h = Math.floor((value % (3600 * 24)) / 3600)
  const m = Math.floor((value % 3600) / 60)
  const s = Math.floor(value % 60)

  const pluralize = (v: number, singular: string): string => {
    if (v === 0) return ''
    if (v === 1) return `${v} ${singular} `
    return `${v} ${singular}s `
  }

  const dDisplay = pluralize(d, 'day')
  const hDisplay = pluralize(h, 'hour')
  const mDisplay = pluralize(m, 'min')
  const sDisplay = pluralize(s, 'sec')
  return dDisplay + hDisplay + mDisplay + sDisplay
}
