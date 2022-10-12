# tiptap-extension-image-freely

tiptap 的图片扩展

**使用此库无需再使用 `@tiptap/extension-image`**

- 支持图片调整大小和旋转
- 图片加载失败时，可自由的处理，比如显示一张缺省图
- 支持拓展其它功能

![eg](./doc/doc.png)

## Instalation

`npm i tiptap-extension-image-freely -S`

## Usage

添加在 `useEditor()` 的扩展中：

```ts
import Image from 'tiptap-extension-image-freely'

  extensions: {
    Image.configure({
      inline: false,
      onExtraCreated: (eleExtra: HTMLElement, imgRef: HTMLImageElement) => {
        eleExtra.innerHTML = '自定义一些按钮或其它'
      },
      onError: (eleExtra: HTMLElement) => {
        eleExtra.innerHTML = '<errorIcon />'
      }
    }),
```

Image 配置项：

```ts
export interface ImageOptions {
  // 同 @tiptap/extension-image
  inline: boolean
  allowBase64?: boolean
  HTMLAttributes?: Record<string, any>
  // 是否支持缩放，默认为 true
  resize?: boolean
  // 缩放ICON，默认是黑色小方块
  resizeIcon?: any
  // 是否支持旋转，默认为 true
  rotate?: boolean
  // 旋转ICON，默认是同上图
  rotateIcon?: any
  /**
   * 功能扩展方法
   * @param {HTMLElement} eleExtra HTMLDivElement
   * @param {HTMLImageElement} imgRef 图片的引用
   */
  onExtraCreated?: (eleExtra: HTMLElement, imgRef: HTMLImageElement) => void
  /**
   * 图片加载失败的回调
   * @param {HTMLElement} eleExtra HTMLDivElement
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
