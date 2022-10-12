<template>
  <NodeViewWrapper class="image-resizer" :class="{
    'ProseMirror-selectednode': props.selected && props.editor.isEditable,
    'image-err': isImgErr,
    inline: options.inline,
  }">
    <img ref="imgRef" :src="attrs.src" :alt="attrs.alt" :title="attrs.title" :class="{ maxw100: !isLoaded }" :style="{
      width: attrs.width,
      transform: `rotate(${attrs.rotate}deg) ${translate[attrs.rotate]}`,
    }" @load="handleImgLoad" @error="handleImgError" />

    <!-- 缩放 -->
    <ImageResizeComponent v-if="isLoaded && options.resize" :imgRef="imgRef" />

    <!-- 旋转 -->
    <ImageRotateComponent v-if="isLoaded && options.rotate" :imgRef="imgRef" />

    <div style="width: 0; height: 0" ref="extRef"></div>
  </NodeViewWrapper>
</template>

<script setup>
import { computed, onMounted, provide, ref } from "vue";
import { NodeViewWrapper } from "@tiptap/vue-3";
import ImageResizeComponent from "./ImageResizeComponent.vue";
import ImageRotateComponent from "./ImageRotateComponent.vue";

const props = defineProps({
  editor: { type: Object, required: true },
  node: { type: Object, required: true },
  extension: { type: Object, required: true },
});
provide("tiptapProps", props);

const attrs = computed(() => props.node.attrs);
const options = computed(() => props.extension.options);
const imgRef = ref(null);
const translate = {
  0: "translate(0,0)",
  "-90": "translate(-100%,0)",
  "-180": "translate(-100%,-100%)",
  "-270": "translate(0,-100%)",
};

const isLoaded = ref(false);
function handleImgLoad(e) {
  isLoaded.value = true;
  // 图片最大 100%
  const maxW = props.editor.view.dom.clientWidth;
  const imgW = e.target.clientWidth;
  if (imgW > maxW) {
    props.updateAttributes({ width: `${maxW}px` });
  }
}

// #region 暴露额外内容warp
const extRef = ref(null);
onMounted(() => options.value.onExtraCreated(extRef.value, imgRef.value));
// #endregion

// #region 处理加载失败的图片
const isImgErr = ref(false);
function handleImgError() {
  isImgErr.value = true;
  options.value.onError(extRef.value);
}
// #endregion
</script>

<style lang="scss">
##{$editorContainerId} {
  .image-resizer {
    max-width: 100%;
    position: relative;
    width: fit-content;

    &.inline {
      display: inline-block;
    }

    img {
      transform-origin: left top;
    }

    .maxw100 {
      width: 100%;
    }
  }
}
</style>
