import type { GlobalConfig } from 'payload'

import { FooterBlock, HeaderBlock } from '../features/layout'
import { seoFields } from '../shared/fields/seo'
import { versionField } from '../shared/fields/version'
import { authenticated, authenticatedOrPublished } from '../shared/services'

// layout global
export const LayoutGlobal: GlobalConfig = {
  slug: 'layout',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'General',
    livePreview: {
      url: ({ locale }) => `/${locale.code}`,
    },
  },
  label: 'Layout',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'blocks',
              name: 'blocks',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
              blocks: [HeaderBlock, FooterBlock],
              maxRows: 2,
            },
          ],
        },
        {
          name: 'branding',
          label: 'Branding',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'group',
                  fields: [
                    {
                      type: 'upload',
                      name: 'logoImage',
                      label: 'Logo',
                      relationTo: 'images',
                      required: true,
                      admin: {
                        condition: (_, siblingData) => !siblingData.logoAsIconSvg,
                      },
                    },
                    {
                      type: 'text',
                      name: 'logoIconSvg',
                      label: 'Logo',
                      admin: {
                        condition: (_, siblingData) => siblingData.logoAsIconSvg,
                        description: 'Copy and paste the icon svg code',
                      },
                    },
                    {
                      type: 'checkbox',
                      name: 'logoAsIconSvg',
                      label: 'Logo as Icon SVG',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: 'upload',
                  name: 'favicon',
                  relationTo: 'images',
                  required: true,
                  label: 'Favicon',
                },
              ],
            },
            {
              type: 'array',
              name: 'socialMediaLinks',
              label: 'Social Media Links',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'socialPlatform',
                      required: true,
                      defaultValue: 'facebook',
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'X (Twitter)', value: 'x' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'Pinterest', value: 'pinterest' },
                        { label: 'Reddit', value: 'reddit' },
                        { label: 'Snapchat', value: 'snapchat' },
                        { label: 'Twitch', value: 'twitch' },
                        { label: 'Discord', value: 'discord' },
                        { label: 'Telegram', value: 'telegram' },
                        { label: 'WhatsApp', value: 'whatsapp' },
                        { label: 'Skype', value: 'skype' },
                        { label: 'Viber', value: 'viber' },
                      ],
                      dbName: 'social_platform',
                      custom: { postgres: { type: 'text' } },
                    },
                    {
                      type: 'text',
                      name: 'socialUrl',
                      required: true,
                      label: 'URL',
                    },
                  ],
                },
                {
                  type: 'text',
                  name: 'socialIconSvg',
                  label: 'Icon',
                  admin: {
                    description: 'Copy and paste the icon svg code',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: seoFields,
        },
      ],
    },
  ],
  versions: versionField,
}
