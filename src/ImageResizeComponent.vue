<template>
  <div
    ref="resizeRef"
    class="resize-trigger"
    :class="{ 'resize-default-icon': !options.resizeIcon }"
    @mousedown="handlerResize"
  >
    {{ options.resizeIcon }}
  </div>
</template>

<script setup>
import { inject, ref, computed, watch } from 'vue'

const tiptapProps = inject('tiptapProps')
const props = defineProps({
  imgRef: { type: Object, required: true }
})
const options = computed(() => tiptapProps.extension.options)
const resizeRef = ref(null)
const originX = ref(0)
const originW = ref(0)
const aspectRatio = props.imgRef.naturalWidth / props.imgRef.naturalHeight

const handlerResize = (e) => {
  if (e.button !== 0) return // 非鼠标左键
  removeEventListener()

  const rect = e.target.getBoundingClientRect()
  originX.value = rect.x
  originW.value = props.imgRef.clientWidth
  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseup', removeEventListener, { once: true })
}
function onMouseMove(e) {
  const maxW = resizeRef.value.parentElement.parentElement.clientWidth
  const newW = originW.value - (originX.value - e.pageX)
  const isSwitchWH = [-90, -270].includes(tiptapProps.node.attrs.rotate)
  if (!isSwitchWH) {
    tiptapProps.updateAttributes({ width: `${newW > maxW ? maxW : newW}px` })
  } else {
    const newH = parseInt(newW / aspectRatio)
    const maxH = parseInt(maxW * aspectRatio)
    tiptapProps.updateAttributes({ width: `${newH > maxW ? maxH : newW}px` })
  }
}
function removeEventListener() {
  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseup', removeEventListener)
}

watch(() => tiptapProps.selected, removeEventListener)
</script>

<style lang="scss">
##{$editorContainerId} {
  .resize-trigger {
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: nwse-resize;
  }
  .resize-default-icon {
    height: 8px;
    width: 8px;
    margin: 0 -4px -4px 0;
    background: #41464b;
    border: 2px solid #fff;
    box-sizing: content-box;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 30%);
  }
  .ProseMirror-selectednode {
    z-index: 1;
    .resize-trigger {
      display: block;
    }
  }
}
</style>
