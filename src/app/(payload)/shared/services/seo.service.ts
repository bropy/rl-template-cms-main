import { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { Page } from '../../payload-types'

// generate title
export const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  // @ts-expect-error - fullName is not defined in the Page type
  return `${doc.name || doc.fullName || 'Website Title'}`
}
