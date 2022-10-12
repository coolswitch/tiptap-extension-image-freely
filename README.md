# tiptap-extension-image-freely

Image extension for tiptap

**Use this library without using `@tiptap/extension-image`**

[中文readme](./README.zh.md)

- Support picture resize and rotation
- When the image fails to load, it can be processed freely, such as displaying a default image
- Support to expand other functions 

![eg](./doc/doc.png)

## Instalation

`npm i tiptap-extension-image-freely -S`

## Usage

Add it as any extension in `useEditor()`

```ts
import Image from 'tiptap-extension-image-freely'

  extensions: {
    Image.configure({
      inline: false,
      onExtraCreated: (eleExtra: HTMLElement, imgRef: HTMLImageElement) => {
        eleExtra.innerHTML = 'something else'
      },
      onError: (eleExtra: HTMLElement) => {
        eleExtra.innerHTML = '<errorIcon />'
      }
    }),
```

### Image Configuration

```ts
export interface ImageOptions {
  // same as @tiptap/extension-image
  inline: boolean
  allowBase64?: boolean
  HTMLAttributes?: Record<string, any>
  // Is support resize, default true
  resize?: boolean
  // Resize icon, the default is a small black square
  resizeIcon?: any
  // Is support rotate, default true
  rotate?: boolean
  // Rotate icon
  rotateIcon?: any
  /**
   * expand other functions
   * @param {HTMLElement} eleExtra - HTMLDivElement
   * @param {HTMLImageElement} imgRef - Reference of image
   */
  onExtraCreated?: (eleExtra: HTMLElement, imgRef: HTMLImageElement) => void
  /**
   * Callback for image loading failure
   * @param {HTMLElement} eleExtra - HTMLDivElement
   */
  onError?: (eleExtra: HTMLElement) => void
}
```

## Commands

```js
editor.commands.setImage({ 
  src: 'https://xxxx/xx.png', 
  alt: 'alt',
  title: 'title',
  width: '400px',
  rotate: '-180'
})
```
