import { prismicRoutes } from '@/constants/PageUIDHashes'
import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import sm from './sm.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint)

// Update the routes array to match your project's route structure
/** @type {prismic.ClientConfig['routes']} **/
/**
 * And FYI: Please hide or turn off messenger app, TopTRacker might take capture of the messAges coming.
 */
/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */

export const createClient = ({
  previewData,
  req,
  ...config
}: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes: prismicRoutes,
    ...config
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData,
    req,
  })

  return client
}