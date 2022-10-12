<template>
  <div ref="rotateRef" class="rotate-trigger" @click="handlerRotate">
    <template v-if="options.rotateIcon">{{ options.resizeIcon }}</template>
    <svg
      v-else
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M128 384h512a42.666667 42.666667 0 0 1 42.666667 42.666667v384a42.666667 42.666667 0 0 1-42.666667 42.666666H128a42.666667 42.666667 0 0 1-42.666667-42.666666v-384a42.666667 42.666667 0 0 1 42.666667-42.666667z m42.666667 85.333333v298.666667h426.666666v-298.666667H170.666667z"
        fill="#595959"
      ></path>
      <path
        d="M548.992 251.008V315.733333a8.533333 8.533333 0 0 1-13.653333 6.826667L387.413333 211.626667a8.533333 8.533333 0 0 1 0-13.653334l147.925334-110.933333a8.533333 8.533333 0 0 1 13.653333 6.826667v71.808a384 384 0 0 1 383.701333 384 42.666667 42.666667 0 1 1-85.333333 0 298.666667 298.666667 0 0 0-298.368-298.666667z"
        fill="#595959"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { inject, ref, computed, watch, onMounted } from 'vue'
import { throttle } from '@/utils/tools'

const tiptapProps = inject('tiptapProps')
const props = defineProps({
  imgRef: { type: Object, required: true }
})
const attrs = computed(() => tiptapProps.node.attrs)
const options = computed(() => tiptapProps.extension.options)
const rotateRef = ref(null)

// const warpW = ref('fit-content')
// const warpH = ref('fit-content')
const needSwitchWH = (r) => [-90, -270].includes(r)

function handlerRotate(e) {
  let rotate = attrs.value.rotate
  if (e) {
    rotate -= 90
    rotate = rotate <= -360 ? 0 : rotate
  }

  // 旋转后计算图片缩放比例
  const isSwitchWH = needSwitchWH(rotate)
  let imgW = props.imgRef.offsetWidth || props.imgRef.clientWidth
  const imgH = props.imgRef.offsetHeight || props.imgRef.clientHeight
  const maxW = tiptapProps.editor.view.dom.clientWidth
  // if (isSwitchWH && imgH > maxW) {
  //   props.imgRef.style.zoom = maxW / imgH
  // } else {
  //   props.imgRef.style.zoom = ''
  // }
  if (isSwitchWH && imgH > maxW) {
    imgW = (imgW * maxW) / imgH
  }
  tiptapProps.updateAttributes({
    rotate,
    width: `${imgW > maxW ? maxW : imgW}px`
  })
}

function fixWarpSize() {
  // 调整 IMG WARP 大小，确保 IMG TOOLS 位置正确
  if (attrs.value.width === 'auto') return
  const isSwitchWH = needSwitchWH(attrs.value.rotate)
  let imgW = props.imgRef.offsetWidth || props.imgRef.clientWidth
  let imgH = props.imgRef.offsetHeight || props.imgRef.clientHeight
  // if (props.imgRef.style.zoom) {
  //   imgW *= props.imgRef.style.zoom
  //   imgH *= props.imgRef.style.zoom
  // }
  const warpEle = rotateRef.value.parentElement
  warpEle.style.width = `${isSwitchWH ? imgH : imgW}px`
  warpEle.style.height = `${isSwitchWH ? imgW : imgH}px`

  setTimeout(() => {
    if (tiptapProps.selected) return
    tiptapProps.editor.commands.setNodeSelection(tiptapProps.getPos())
  }, 50)
}
watch(() => attrs.value.width, throttle(fixWarpSize, 50))
watch(() => attrs.value.rotate, fixWarpSize)

onMounted(() => {
  if (attrs.value.rotate !== 0) {
    handlerRotate()
    fixWarpSize()
  }
})
</script>

<style lang="scss">
##{$editorContainerId} {
  .rotate-trigger {
    display: none;
    position: absolute;
    box-sizing: content-box;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .ProseMirror-selectednode {
    z-index: 1;
    .rotate-trigger {
      display: block;
    }
  }
}
</style>
