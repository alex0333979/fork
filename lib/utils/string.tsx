export function camelCaseToSentence(str: string): string {
  const result = str.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export function humanize(str: string): string {
  const frags = str.split('_')
  for (let i = 0; i < frags.length; i++) {
    frags[i] =
      frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase()
  }
  return frags.join(' ')
}
