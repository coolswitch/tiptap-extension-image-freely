import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageWithTool from './ImageWithTool.vue'

export interface ImageOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
  resize: boolean
  resizeIcon: any
  rotate: boolean
  rotateIcon: any
  onExtraCreated: (eleExtra: HTMLElement, imgRef: HTMLImageElement) => void
  onError: (eleExtra: HTMLElement) => void
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /** Add an image */
      setImage: (options: {
        src: string
        alt?: string
        title?: string
        width?: string
        rotate?: string
      }) => ReturnType
    }
  }
}

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const ImageWithTools = Node.create<ImageOptions>({
  name: 'image',
  draggable: true,

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resize: true,
      resizeIcon: null,
      rotate: true,
      rotateIcon: null,
      onExtraCreated: () => {},
      onError: () => {}
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: 'auto',
        renderHTML: (attributes) => {
          return {
            width: attributes.width
          }
        }
      },
      rotate: {
        default: 0,
        renderHTML: (attributes) => {
          return {
            rotate: attributes.rotate
          }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      // prettier-ignore
      setImage: options => ({ commands }) => {
        return commands.insertContent([{
          type: this.name,
          attrs: options,
        }])
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageWithTool)
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, width, rotate] = match

          return { src, alt, title, width, rotate }
        }
      })
    ]
  }
})
