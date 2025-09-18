import { type Block } from 'payload'

// image scroller block
export const ImageScrollerBlock: Block = {
  slug: 'imageScrollerBlock',
  labels: {
    singular: 'Image Scroller Block',
    plural: 'Image Scroller Blocks',
  },
  fields: [
    {
      type: 'array',
      name: 'rows',
      label: 'Images',
      minRows: 1,
      maxRows: 10,
      required: true,
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          required: true,
          relationTo: 'images',
        },
      ],
    },
  ],
}
