export const camelCaseToSentence = (str: string): string => {
  const result = str.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const humanize = (str: string): string => {
  const frags = str.split('_')
  for (let i = 0; i < frags.length; i++) {
    frags[i] =
      frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase()
  }
  return frags.join(' ')
}

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const getHumanizedName = (
  nameData: (string | null | undefined)[],
): string => nameData.filter((d) => !!d).join(' ')
