import { Field } from 'payload'

import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields'

// seo fields
export const seoFields: Field[] = [
  OverviewField({
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
    imagePath: 'meta.image',
  }),
  MetaTitleField({
    hasGenerateFn: true,
  }),
  MetaDescriptionField({}),
  MetaImageField({
    relationTo: 'images',
  }),
]
