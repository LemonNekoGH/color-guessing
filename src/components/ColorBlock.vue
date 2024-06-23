<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Color } from '../gameplay/game'

const props = defineProps<{
  color: Color
}>()

const localColor = ref(props.color)
const cleared = ref(true)

watch(() => props.color, (newVal) => {
  if (newVal !== '#FFFFFF')
    localColor.value = newVal
  cleared.value = newVal === '#FFFFFF'
})
</script>

<template>
  <div
    class="w-16 h-16 box-border"
    :class="
      [color !== '#FFFFFF' ? `border-2 border-solid border-color` : 'border-2 border-dashed border-black']
    "
  >
    <div
      id="color-block-interact-space" class="w-full h-full active:scale-80" :class="{
        'scale-0': cleared,
        'scale-90 hover:scale-85': !cleared,
      }"
    />
  </div>
</template>

<style lang="less" scoped>
.border-color {
  border-color: v-bind(localColor) !important;
}
#color-block-interact-space {
  background-color: v-bind(localColor);
  transition: transform 250ms;
}
</style>
