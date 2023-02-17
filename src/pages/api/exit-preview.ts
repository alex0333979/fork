import * as prismicNext from '@prismicio/next'

export default async function handler(req: any, res: any) {
  prismicNext.exitPreview({ res, req })
}
