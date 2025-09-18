import type { CollectionConfig } from 'payload'

import {
  CategoriesBlock,
  FeedbackBlock,
  HeroBlock,
  ImageScrollerBlock,
  ListBlock,
  SectionBlock,
  TabsBlock,
} from '../features/page'
import { slugField } from '../shared/fields/slug/slug-field'
import { versionField } from '../shared/fields/version'
import { authenticated, authenticatedOrPublished } from '../shared/services'

// templates
export const Templates: CollectionConfig = {
  slug: 'templates',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', '_status', 'blocksInfo', 'seoInfo', 'createdAt'],
    useAsTitle: 'name',
    group: 'General',
  },
  labels: {
    singular: 'Template',
    plural: 'Templates',
  },
  fields: [
    ...slugField(),
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'blocks',
      name: 'blocks',
      label: 'Blocks',
      labels: {
        singular: 'Block',
        plural: 'Blocks',
      },
      minRows: 1,
      maxRows: 3,
      blocks: [HeroBlock, ImageScrollerBlock, SectionBlock, ListBlock, TabsBlock, CategoriesBlock, FeedbackBlock],
    },
  ],
  versions: versionField,
}
