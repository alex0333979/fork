/**
 * Insert custom variables into Prismic data
 * @param prismicText String: You can convert prismic data into test by using prismicH.asText(pData),
 * which you can import by `import * as prismicH from "@prismicio/helpers"`
 * @param variables Key-value object
 * @returns string
 */
export const transformPrismic = (
  prismicText: string | null | undefined,
  variables: Record<string, any>,
): string => {
  if (!prismicText) return ''

  const pVariableStart = '{{'
  const pVariableEnd = '}}'

  let res = prismicText
  Object.entries(variables).forEach(([k, v]) => {
    res = res
      .replace(new RegExp(`${pVariableStart} `, 'g'), pVariableStart)
      .replace(new RegExp(` ${pVariableEnd}`, 'g'), pVariableEnd)
      .replace(new RegExp(`${pVariableStart}${k}${pVariableEnd}`, 'g'), v)
  })

  return res
}
