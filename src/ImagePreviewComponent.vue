<template>
  <NodeViewWrapper class="preview-trigger" @click="handlerPreview">
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M455.68 770.56c-169.472 0-307.2-137.728-307.2-307.2s137.728-306.688 307.2-306.688 307.2 137.728 307.2 306.688c-0.512 169.472-138.24 307.2-307.2 307.2z m0-547.328c-132.608 0-240.64 108.032-240.64 240.128 0 132.608 108.032 240.64 240.64 240.64s240.64-108.032 240.64-240.64c-0.512-132.608-108.544-240.128-240.64-240.128zM855.04 888.32c-8.704 0-16.896-3.072-23.552-9.728l-113.664-113.664c-12.8-12.8-12.8-34.304 0-47.104 12.8-12.8 34.304-12.8 47.104 0l113.664 113.664c12.8 12.8 12.8 34.304 0 47.104-6.656 6.656-14.848 9.728-23.552 9.728z"
      ></path>
    </svg>
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper } from "@tiptap/vue-3";
import ImageViewer from "@/plugins/imageViewer";

const props = defineProps({
  imgEle: { type: HTMLImageElement, required: true },
});

function handlerPreview() {
  ImageViewer(props.imgEle);
}
</script>

<style lang="scss">
##{$editorContainerId} {
  .preview-trigger {
    display: none;
    position: absolute;
    box-sizing: content-box;
    right: 0;
    top: 40px;
    cursor: pointer;
  }
  .ProseMirror-selectednode {
    z-index: 1;
    .preview-trigger {
      display: block;
    }
  }
}
</style>
